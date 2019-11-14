import Link from 'next/link';

class CampaignPlayers extends React.Component {
    commanderLabel(label, player){
        if (label ==="none") return (
            //+this.props.campaignID+"/"+player
            <td><Link href={"/newCommander/"+player +"/"+this.props.campaignID}><a>Create Commander</a></Link></td>
        )
        else return label
    }
    
    populateTable(){
        if(this.props.players.length===0 ){
            return (<p> No current players</p>)
        }else{
            const rows = this.props.players.map((player, index) => {
                return (
                    <tr key={index}>
                        <td>{player.playerID}</td>
                        <td>{this.commanderLabel(player.commanderID, player.playerID)}</td>
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