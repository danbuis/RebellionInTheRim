import CampaignBattleForm from '../reactComponents/CampaignBattleForm'
import CampaignBattleTable from '../reactComponents/CampaignBattleTable'
import axios from 'axios';

class CampaignBattles extends React.Component {
    state = {
        playerData:[]
    }

    constructor(props){
        super(props)
        this.populateState()
    }

    async populateState(){
        const playerArray = this.props.campaign.rebels.concat(this.props.campaign.imperials)

        const getPlayerData = async player =>{
            console.log(player)
            const user = await axios.get('/user/'+player.playerID)
            const userdata = await user.data
            return await {playerID: player.playerID, playerName:userdata.username, commanderID: player.commanderID}
        }

        const players = await Promise.all(playerArray.map(player => getPlayerData(player)))

        await this.setState({
            playerData:players
        })
    }

    filterBattles(group){
        var battles = []

        for(var i=0; i<this.props.battles.length; i++){
            var battle = this.props.battles[i]
            if(group === "current" && battle.round == this.props.campaign.round){
                battles.push(battle)
            }else if(group === "previous" && battle.round != this.props.campaign.round){
                battles.push(battle)
            }
        }
        
        return battles
    }

     
    render () {
        return <div>        
            <CampaignBattleForm campaign={this.props.campaign} players={this.state.playerData}/>
            <CampaignBattleTable title="Current Battles" battles={this.filterBattles("current")} players={this.state.playerData}/>
            <CampaignBattleTable title="Previous Battles" battles ={this.filterBattles("previous")} players={this.state.playerData}/>
        </div>;
    }
}

export default CampaignBattles;