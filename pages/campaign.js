import Header from '../reactComponents/Header'
import CampaignHeader from '../reactComponents/CampaignHeader'
import CampaignInvites from '../reactComponents/CampaignInvites'
import CampaignSystems from '../reactComponents/CampaignSystems'
import CampaignPlayers from '../reactComponents/CampaignPlayers'
import CampaignMessages from '../reactComponents/CampaignMessages'
import CampaignBattles from '../reactComponents/CampaignBattles'
import CampaignScore from '../reactComponents/CampaignScore'
import React, {Component} from 'react'

export default class extends React.Component{
    static async getInitialProps(campaignData){
        const campaign = campaignData.query.campaign
        const battles = campaignData.query.battles

        return{campaign, battles}

    }

    switchComponents(){
        if(this.props.campaign.round == 0){
            return(
                <CampaignInvites invites = {this.props.campaign.pendingInvites} campaign={this.props.campaign}/>
            )
        } else {
            return(
            <div>
                <CampaignScore score = {this.props.campaign.scoreRebel} faction = {"Rebel"} />
                <CampaignScore score = {this.props.campaign.scoreImperial} faction = {"Imperial"} />
                <CampaignBattles campaign = {this.props.campaign} battles={this.props.battles}/>
            </div>
                )
        }
    }

    render(){
        
        return(
            <div>
                <Header />
                <CampaignHeader campaign = {this.props.campaign}/>
                {this.switchComponents()}
                <CampaignMessages messages = {this.props.campaign.messages}/>
                <CampaignPlayers faction = "Rebel" players = {this.props.campaign.rebels} campaignID = {this.props.campaign._id}/>
                <CampaignPlayers faction = "Imperial" players = {this.props.campaign.imperials} campaignID = {this.props.campaign._id}/>
                <CampaignSystems campaign = {this.props.campaign}/>
            </div>
        )
    }
} 

