class CampaignPlayers extends React.Component {
    populateTable(){
        if(this.props.players.length===0 ){
            return (<p> No current players</p>)
        }else{
            const rows = this.props.players.map((player, index) => {
                return (
                    <tr key={index}>
                        <td>{player.playerID}</td>
                        <td>{player.commanderID}</td>
                    </tr>
                    )
                })
            return(
                <table border="1">
                    <tr>
                    <th>Player</th>
                    <th>Commander</th>
                    </tr>
                    <tbody>{rows}</tbody>
                </table>
            )
        }
    }

    render () {      
        return <div>
            <h2>{this.props.faction} Players</h2>
            {this.populateTable()}          
        </div>;
    }
}

export default CampaignPlayers;