import Header from '../reactComponents/Header'
import Welcome from '../reactComponents/Welcome'
import CurrentCampaigns from '../reactComponents/CurrentCampaigns'
import NewCampaign from '../reactComponents/NewCampaign'
import Link from 'next/link';
import React, {Component} from 'react';


export default class extends React.Component{
    static async getInitialProps(user){
        return user.query;
    }

    constructor(props){
        super(props);
        this.state= {isOpen: false};
    }

    toggleWindow = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    render(){
        console.log(this.props.user)
        return(
        <div>
        <Header />
        <div>
        <Welcome username={this.props.user.username}/>
        </div>
        <CurrentCampaigns />
        <button onClick={this.toggleWindow}>Start a new Campaign</button>
        <NewCampaign show={this.state.isOpen}
        onClose = {this.toggleWindow} 
        user={this.props.user}/>
        
        </div>
        )
    }
}

