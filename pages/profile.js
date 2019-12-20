import Header from '../reactComponents/Header'
import Welcome from '../reactComponents/Welcome'
import CurrentCampaigns from '../reactComponents/User/CurrentCampaigns'
import NewCampaign from '../reactComponents/Campaign/CampaignNew'
import React, {Component} from 'react';
import EditProfile from '../reactComponents/User/EditProfile';
import UserInvites from '../reactComponents/User/UserInvites'

export default class extends React.Component{
    static async getInitialProps(userData){
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





