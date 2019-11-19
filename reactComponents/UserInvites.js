import React from 'react';
import CampaignInviteRespond from './CampaignInviteRespond'


class UserInvites extends React.Component {
    findMyInvite(campaign){
        const invites = campaign.pendingInvites
        for (var i=0; i<invites.length; i++){
            if(invites[i].userID === this.props.user._id){
                return invites[i].faction
            }
        }
    }

    populateTable(){

        if(this.props.invites.length===0 ){
            return (<p> No pending invites</p>)
        }else{
            const rows = this.props.invites.map((invite, index) => {
                var faction=this.findMyInvite(invite)

                return (
                    <tr key={index}>
                        <td>{invite.name}</td>
                        <td>{faction}</td>
                        <td><CampaignInviteRespond 
                            user={this.props.user._id}
                            faction = {faction}
                            campaign={invite.name}/>
                        </td>
                    </tr>
                    )
                })
            return(
                <table border="1">
                    <tr>
                    <th>Campaign</th>
                    <th>Faction</th>
                    <th>Response</th>
                    </tr>
                    <tbody>{rows}</tbody>
                </table>
            )
        }
    }

    render() {
        
        
        return <div>
            <h2>Campaign Invites</h2>
            {this.populateTable()}

        </div>;
    
    }
}

export default UserInvites;