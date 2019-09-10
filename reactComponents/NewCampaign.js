import PropTypes from 'prop-types';
import React, {Component} from 'react';

class NewCampaign extends React.Component{
    static async getInitialProps(user){
        return user.query;
    }

    render(){
        if(!this.props.show) {
            return null;
          }

        return(
            <div>        
            <form action="/initCampaign" method="post">
                        <label>Campaign Name</label>
                        <input type="text" name="name" required/>
        
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
                        <input type="hidden" name="user" value={this.props.user}/>
        
                        <input type="submit" value="Submit" />
                    </form>
                    <button onClick={this.props.onClose}>
                        Cancel
                    </button>
        
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