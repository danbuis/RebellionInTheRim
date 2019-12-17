import Systems from '../systems.js'

class CampaignBattleForm extends React.Component {
    constructor(props){
        super(props)
        this.state={
            assaultingFaction: "Rebel"
        }
        this.updateAssaulting = this.updateAssaulting.bind(this)
    }

    updateAssaulting(event){
        this.setState({
            assaultingFaction:event.target.value
        })
    }

    getPlayerName(playerID){
        var name = ""

        this.props.players.map(player => {
            if(player.playerID === playerID){
                name = player.playerName
            }
        })
        return name
    }

    populatePlayers(assaulting){
        var unAssignedPlayers = this.props.campaign.rebels.concat(this.props.campaign.imperials)
        for(var i=0; i<this.props.currentBattles.length; i++){
            var index=-1
            for(var j=0; j<unAssignedPlayers.length; j++){
                if(unAssignedPlayers[j].commanderID == this.props.currentBattles[i].attackingCommander
                || unAssignedPlayers[j].commanderID == this.props.currentBattles[i].defendingCommander){
                    index = j
                }
            unAssignedPlayers.splice(index,1)
            }
        }
        
        var players = []
        if(assaulting == "assault" && this.state.assaultingFaction == "Rebel"){
            players = this.props.campaign.rebels.slice()
        }else if (assaulting == "defend" && this.state.assaultingFaction == "Rebel"){
            players = this.props.campaign.imperials.slice()
        }else if (assaulting == "assault" && this.state.assaultingFaction == "Empire"){
            players = this.props.campaign.imperials.slice()
        }else{
            players = this.props.campaign.rebels.slice()
        }
      
        var found = true
        while (found){
            found = false
            for(var i=0; i<this.props.currentBattles.length; i++){
                for(var j=0; j<players.length; j++){
                    if(this.props.currentBattles[i].attackingCommander == players[j].commanderID){
                        players.splice(j,1)
                        found=true
                    }else if(this.props.currentBattles[i].defendingCommander == players[j].commanderID){
                        players.splice(j,1)
                        found=true
                    }
                }
            }
        }
        
        const playerList = players.map((player, index) => {
            return <option key={index}>{this.getPlayerName(player.playerID)}</option>
        })

        return playerList 
    }

    populateSystems(){
        var systemsAvailable = Systems.slice()

        var found = true
        while (found){
            found = false
            for(var i=0; i<this.props.currentBattles.length; i++){
                for(var j=0; j<systemsAvailable.length; j++){
                    if(this.props.currentBattles[i].System == systemsAvailable[j].SystemName){
                        systemsAvailable.splice(j,1)
                        found=true
                    }
                }
            }
        }
        const systemsOptions = systemsAvailable.map((system, index) => {
            return <option key={index}>{system.SystemName}</option>
        })

        return systemsOptions
    }

    render () {
        
        return <div>
            <h3>Create New Battle</h3>
            
            <form action="/battle/addBattle" method="post">

                <input type="hidden" name="campaign" value={this.props.campaign._id}/>
                
                <label>Assaulting Faction</label>
                <select name="assaultingFaction" onChange={this.updateAssaulting}>
                    <option value="Rebel" key="Rebel">Rebel</option>
                    <option value="Empire" key="Empire">Empire</option>
                </select>

                <label>Assaulting Player</label>
                <select name="assaultingPlayer">
                    {this.populatePlayers("assault")}
                </select>

                <label>Defending Player</label>
                <select name="defendingPlayer">
                    {this.populatePlayers("defend")}
                </select>

                <label>Contested System</label>
                <select name="system">
                    {this.populateSystems()}
                </select>

                <input type="submit" value="Submit" />
            </form>
            
            

        </div>;
    }
}

export default CampaignBattleForm;