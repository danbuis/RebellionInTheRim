import React from 'react';


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
                return (
                    <tr key={index}>
                        <td>{invite.name}</td>
                        <td>{this.findMyInvite(invite)}</td>
                    </tr>
                    )
                })
            return(
                <table border="1">
                    <tr>
                    <th>Campaign</th>
                    <th>Faction</th>
                    </tr>
                    <tbody>{rows}</tbody>
                </table>
            )
        }
    }

    render() {
        
        
        return <div>
            {this.populateTable()}

        </div>;
    
    }
}

export default UserInvites;