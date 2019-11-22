import Link from 'next/link';
import axios from 'axios';

class CampaignPlayers extends React.Component {
    state = {
        players:[],
        commanders:[]
    }

    constructor(props){
        super(props)

        this.populateState(this.props.players)
    }

    async populateState(playerArray){

        const getUsername = async player =>{
          const user = await axios.get('/user/'+player.playerID);
          const username = await user.data.username
          return await username
        }

        const getCommanderName = async player =>{
            if(player.commanderID === "none") return "none"
            const commander = await axios.get('/commanderData/'+player.commanderID)
            const commanderName = await commander.data.name
            return await commanderName
        }

        const names = await Promise.all(playerArray.map(player => getUsername(player)))
        const commanders = await Promise.all(playerArray.map(player => getCommanderName(player)))
        this.setState({
          players: names,
          commanders: commanders
        })
      }

    commanderLabel(label, player, index){
        if (label ==="none") return (
            //+this.props.campaignID+"/"+player
            <Link href={"/newCommander/"+player +"/"+this.props.campaignID}><a>Create Commander</a></Link>
        )
        else {
            console.log("error?")
            
            return <Link href={"/commander/"+label}><a>{this.state.commanders[index]}</a></Link>
        }
    }

    getCommanderName(commanderID){
        return "test"
    }
    
    populateTable(){
        if(this.props.players.length===0 || this.state.players.length===0){
            return (<p> No current players</p>)
        }else{
            const rows = this.props.players.map((player, index) => {
                return (
                    <tr key={index}>
                        <td>{this.state.players[index]}</td>
                        <td>{this.commanderLabel(player.commanderID, player.playerID, index)}</td>
                    </tr>
                    )
                })
            return(
                <table border="1">
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Commander</th>
                        </tr>
                    </thead>
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