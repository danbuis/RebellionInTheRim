import React from 'react';
import axios from 'axios';

class CampaignInviteRespond extends React.Component {
    
    
    render () {
        
        return <div>
            
            <form action={"/acceptInvite"} method="post">
                <input type="hidden" name="campaign" value={this.props.campaign} />
                <input type="hidden" name="user" value={this.props.user} />
                <input type="hidden" name="faction" value={this.props.faction} />
                <input type="submit" value="Accept" />
            </form>       

        </div>;
    }
}

export default CampaignInviteRespond;