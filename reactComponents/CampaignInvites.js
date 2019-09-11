import CampaignInvitesNew from '../reactComponents/CampaignInvitesnew'

class CampaignInvites extends React.Component {
    render () {
        
        
        return <div>
            <h2>Pending Invites</h2>

            <table border="1">
                <tr>
                    <th>Player</th>
                    <th>Faction</th>
                </tr>
                
            </table>

            <CampaignInvitesNew />
            

        </div>;
    }
}

export default CampaignInvites;