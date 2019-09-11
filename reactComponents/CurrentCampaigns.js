class CurrentCampaigns extends React.Component {


    render () {
        const rows = this.props.campaigns.map((campaign, index) => {
            return (
                <tr key={index}>
                    <td>{campaign.name}</td>
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

export default CurrentCampaigns;