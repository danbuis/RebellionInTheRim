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
        console.log(event.target.value)
        this.setState({
            assaultingFaction:event.target.value
        })
    }

    populatePlayers(assaulting){
        
        var players = []
        if(assaulting == "assault" && this.state.assaultingFaction == "Rebel"){
            players = this.props.campaign.rebels.map(player => {
                return <option>{player.playerID}</option>
            })
        }else if (assaulting == "defend" && this.state.assaultingFaction == "Rebel"){
            players = this.props.campaign.imperials.map(player =>{
                return <option>{player.playerID}</option>
            })
        }else if (assaulting == "assault" && this.state.assaultingFaction == "Empire"){
            players = this.props.campaign.imperials.map(player =>{
                return <option>{player.playerID}</option>
            })
        }else{
            players = this.props.campaign.rebels.map(player => {
                return <option>{player.playerID}</option>
            })
        }

        return players
    
    }

    populateSystems(){
        const systemsOptions = Systems.map(system => {
            return <option>{system.SystemName}</option>
        })

        return systemsOptions
    }

    render () {
        
        return <div>
            <h3>Create New Battle</h3>
            
            <form action="/addBattle" method="post">

                <input type="hidden" name="campaign" value={this.props.campaign._id}/>
                
                <label>Assaulting Faction</label>
                <select name="assaultingFaction" onChange={this.updateAssaulting}>
                    <option value="Rebel">Rebel</option>
                    <option value="Empire">Empire</option>
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