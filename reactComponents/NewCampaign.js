import PropTypes from 'prop-types';
import React, {Component} from 'react';
import stringTests from '../stringTests.js'

class NewCampaign extends React.Component{
    static async getInitialProps(user){
        return user.query;
    }

    constructor(props){
        super(props)
        this.state={
            disabled : true,
            newCampaign: "",
            errors:[]
        }

        this.updateCampaignName = this.updateCampaignName.bind(this)
    }

    async updateCampaignName(event){
        await this.setState({
            newCampaign: event.target.value
        })

        await this.checkInput()
    }

    checkInput(){

        var campaignErrors = stringTests.data.checkString(this.state.newCampaign, 40)
        this.setState({errors: campaignErrors})

        var disabled

        if(this.state.username !== "" && this.state.password !== "" && this.state.errors.length === 0){
            disabled = false
        } else disabled = true

        this.setState({disabled:disabled})
    }

    listErrors(){
        console.log("in list errors" + this.state.errors)
       const errors =  this.state.errors.map(error =>{
            return <p>Campaign name {error}</p>
        })

        if(this.state.errors.length > 0){
            return   <div>
                        <p>Errors</p>
                        {errors}
                    </div>
        }
    }

    render(){
        if(!this.props.show) {
            return null;
          }

        return(
            <div>
                <p>Campaign name must meet the following criteria.</p>
            <ul>
                <li>No longer than 40 characters</li>
                <li>No special characters other than the following : _ ' "</li>
                <li>No leading or trailing spaces</li>
            </ul> 

            <form action="/initCampaign" method="post">
                <label>Campaign Name</label>
                <input type="text" name="name" required onChange={this.updateCampaignName}/>

                <label>Number of Players</label>
                <select name="players">
                    <option value="4">4</option>
                    <option value="6">6</option>
                </select>

                <label>Your Faction</label>
                <select name="faction">
                    <option value="rebel">Rebel</option>
                    <option value="empire">Empire</option>
                </select>
                <input type="hidden" name="user" value={this.props.user._id}/>

                <input type="submit" value="Submit" disabled={this.state.disabled}/>
            </form>
            <button onClick={this.props.onClose}>
                Cancel
            </button>

            {this.listErrors()}
        
        </div>
        )
    }
}

NewCampaign.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
  };

  export default NewCampaign;