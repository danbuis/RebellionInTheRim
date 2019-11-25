import Header from '../reactComponents/Header'
import CampaignHeader from '../reactComponents/CampaignHeader'
import CampaignInvites from '../reactComponents/CampaignInvites'
import CampaignSystems from '../reactComponents/CampaignSystems'
import CampaignPlayers from '../reactComponents/CampaignPlayers'
import CampaignMessages from '../reactComponents/CampaignMessages'
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
                <CampaignInvites invites = {this.props.campaign.pendingInvites} campaign={this.props.campaign}/>
                <CampaignSystems />
                <CampaignMessages messages = {this.props.campaign.messages}/>
                <CampaignPlayers faction = "Rebel" players = {this.props.campaign.rebels} campaignID = {this.props.campaign._id}/>
                <CampaignPlayers faction = "Imperial" players = {this.props.campaign.imperials} campaignID = {this.props.campaign._id}/>
            </div>
        )
    }
} 

