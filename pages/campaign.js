import Header from '../reactComponents/Header'
import CampaignHeader from '../reactComponents/CampaignHeader'
import CampaignInvites from '../reactComponents/CampaignInvites'
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
                <CampaignInvites invites = {this.props.campaign.pendingInvites}/>
            </div>
        )
    }
} 

