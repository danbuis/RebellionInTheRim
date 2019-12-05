import Header from '../reactComponents/Header'
import CampaignHeader from '../reactComponents/CampaignHeader'
import CampaignInvites from '../reactComponents/CampaignInvites'
import CampaignSystems from '../reactComponents/CampaignSystems'
import CampaignPlayers from '../reactComponents/CampaignPlayers'
import CampaignMessages from '../reactComponents/CampaignMessages'
import CampaignBattles from '../reactComponents/CampaignBattles'
import React, {Component} from 'react'

export default class extends React.Component{
    static async getInitialProps(campaignData){
        const campaign = campaignData.query.campaign
        const battles = campaignData.query.battles

        return{campaign, battles}

    }

    render(){
        
        return(
            <div>
                <Header />
                <CampaignHeader campaign = {this.props.campaign}/>
                <CampaignInvites invites = {this.props.campaign.pendingInvites} campaign={this.props.campaign}/>
                <CampaignBattles campaign = {this.props.campaign} battles={this.props.battles}/>
                <CampaignSystems />
                <CampaignMessages messages = {this.props.campaign.messages}/>
                <CampaignPlayers faction = "Rebel" players = {this.props.campaign.rebels} campaignID = {this.props.campaign._id}/>
                <CampaignPlayers faction = "Imperial" players = {this.props.campaign.imperials} campaignID = {this.props.campaign._id}/>
            </div>
        )
    }
} 

