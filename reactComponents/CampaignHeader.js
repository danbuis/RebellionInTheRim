class CampaignHeader extends React.Component {
    render () {
        
        return <div>
            
            <h1><center>{this.props.campaign.name}</center></h1>
            <h3><center>Current Round : {this.props.campaign.round}</center></h3>
            

        </div>;
    }
}

export default CampaignHeader;