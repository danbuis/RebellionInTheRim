import CampaignMessageList from './CampaignMessageList'
import CampaignAddMessage from './CampaignAddMessage'

class CampaignMessages extends React.Component {
    render () {
        
        return <div>
            <h1>Comms</h1>
            <CampaignMessageList messages={this.props.messages}/>
            
            

        </div>;
    }
}

export default CampaignMessages;