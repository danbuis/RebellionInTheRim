import CampaignBattleForm from '../reactComponents/CampaignBattleForm'
import CampaignBattleTable from '../reactComponents/CampaignBattleTable'


class CampaignBattles extends React.Component {
    render () {
        
        
        return <div>
            
            
            <CampaignBattleForm campaign={this.props.campaign}/>
            <CampaignBattleTable />
            <CampaignBattleTable />
            
            

        </div>;
    }
}

export default CampaignBattles;