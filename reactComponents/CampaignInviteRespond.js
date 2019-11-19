import React from 'react';
import axios from 'axios';

class CampaignInviteRespond extends React.Component {
    acceptInvite(){
        console.log("posting")
        axios.post("http://localhost:3000/acceptInvite/"+this.props.campaign+"/"+this.props.user+"/"+this.props.faction)
    }
    
    render () {
        
        return <div>
            
            <button onClick={this.acceptInvite()}>Accept</button>       

        </div>;
    }
}

export default CampaignInviteRespond;