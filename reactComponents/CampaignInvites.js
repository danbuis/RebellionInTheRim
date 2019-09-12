import CampaignInvitesNew from '../reactComponents/CampaignInvitesnew'

class CampaignInvites extends React.Component {
    populateTable(){
        if(this.props.invites.length===0 ){
            return (<p> No pending invites</p>)
        }else{
            const rows = this.props.invites.map((invite) => {
                return (
                    <tr>
                        <td>{invite.user}</td>
                        <td>{invite.faction}</td>
                    </tr>
                    )
                })
            return(
                <table border="1">
                    <tr>
                    <th>Player</th>
                    <th>Faction</th>
                    </tr>
                    <tbody>{rows}</tbody>
                </table>
            )
        }
    }

    render () {      
        return <div>
            <h2>Pending Invites</h2>

            {this.populateTable()}

            <CampaignInvitesNew />
            

        </div>;
    }
}

export default CampaignInvites;