import Header from '../reactComponents/Header'
import Welcome from '../reactComponents/Welcome'
import CurrentCampaigns from '../reactComponents/CurrentCampaigns'
import NewCampaign from '../reactComponents/NewCampaign'
import Link from 'next/link';
import React, {Component} from 'react';
import axios from 'axios';
import EditProfile from '../reactComponents/EditProfile';
import UserCampaigns from '../reactComponents/UserCampaigns'
import UserInvites from '../reactComponents/UserInvites'

export default class extends React.Component{
    static async getInitialProps(userData){
        console.log(userData)
        const user = userData.query.user;
        const campaigns = userData.query.campaigns;
        const invites = userData.query.invites
      
        return {user, campaigns, invites};
    }

    constructor(props){
        super(props);
        this.state= {isOpen: false};
    }

    toggleWindow = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    render(){
        //console.log(this.props.user)
        return(
        <div>
        <Header user={this.props.user}/>
        <div>
        <Welcome username={this.props.user.username}/>
        </div>
        <CurrentCampaigns campaigns={this.props.campaigns}/>
        <button onClick={this.toggleWindow}>Start a new Campaign</button>
        <NewCampaign show={this.state.isOpen}
        onClose = {this.toggleWindow} 
        user={this.props.user}/>
        <UserInvites  invites={this.props.invites} user={this.props.user}/>

        </div>
     
        
        
        )
        
    }
}





