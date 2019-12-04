import CampaignBattleForm from '../reactComponents/CampaignBattleForm'
import CampaignBattleTable from '../reactComponents/CampaignBattleTable'


class CampaignBattles extends React.Component {
    filterBattles(group){
        var battles = []

        for(var i=0; i<this.props.campaign.battles.length; i++){
            var battle = this.props.campaign.battles[i]
            if(group === "current" && battle.round == this.props.campaign.round){
                battles.push(battle)
            }else if(group === "previous"){
                battles.push(battle)
            }
        }
        
        return battles
    }
    
    render () {
        return <div>        
            <CampaignBattleForm campaign={this.props.campaign}/>
            <CampaignBattleTable title="Current Battles" battles={this.filterBattles("current")}/>
            <CampaignBattleTable title="Previous Battles" battles ={this.filterBattles("previous")}/>
        </div>;
    }
}

export default CampaignBattles;