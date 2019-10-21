import Header from '../reactComponents/Header'
import CampaignHeader from '../reactComponents/CampaignHeader'
import CampaignInvites from '../reactComponents/CampaignInvites'
import CampaignSystems from '../reactComponents/CampaignSystems'
import CampaignPlayers from '../reactComponents/CampaignPlayers'
import React, {Component} from 'react'

export default class extends React.Component{
    static async getInitialProps(campaign){
        return campaign.query;
    }

    render(){
        
        return(
            <div>
                <Header />
                <CampaignHeader campaignName = {this.props.campaign.name}/>
                <CampaignInvites invites = {this.props.campaign.pendingInvites} _id={this.props.campaign._id}/>
                <CampaignSystems />
                <CampaignPlayers faction = "Rebel" players = {this.props.campaign.rebels} />
                <CampaignPlayers faction = "Imperial" players = {this.props.campaign.imperials} />
            </div>
        )
    }
} 

