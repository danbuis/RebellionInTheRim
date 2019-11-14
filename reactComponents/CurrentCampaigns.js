import Link from 'next/link';
class CurrentCampaigns extends React.Component {
    render () {
        if(this.props.campaigns.length===0) {
            return(<p>No Available Campaigns</p>)
        }else{
        const rows = this.props.campaigns.map((campaign, index) => {
            return (
                <tr key={index}>
                    <td><Link href={"/campaign/"+campaign.name}><a>{campaign.name}</a></Link></td>
                    <td>no commander data</td>
                </tr>
            )
        })

        return <div>
            <h2>Current Campaigns</h2>
            
            <table border="1">
                <tr>
                    <th>Campaign Name</th>
                    <th>Commander</th>
                </tr>
                <tbody>{rows}</tbody>
            </table>
        </div>
        }

        
    }
 
}

export default CurrentCampaigns;