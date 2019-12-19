import axios from 'axios';
import Link from 'next/link';

class CampaignBattleTable extends React.Component {
    state={
        battles:[]
    }

    constructor(props){
        super(props)
        //this.populateState()
    }

    async populateState(){
    
        const getBattleData = async battleID =>{
            const battleData = await axios.get('/battle/data/'+battleID)
            return await battleData.data
        }

        const battles = await Promise.all(this.props.battles.map(battleID => getBattleData(battleID)))
        
        await this.setState({
            battles:battles
        })
    }

    getPlayerName(commanderID){
        var name = ""

        this.props.players.map(player => {
            if(player.commanderID === commanderID){
                name = player.playerName
            }
        })

        return name
    }

    getWinner(battle){
        if(battle.winner === "none") return "Pending"
        else{
            return this.getPlayerName(battle.winner)
        }
    }

    render () {
        
        const rows = this.props.battles.map((battle, index) => {
            return (
                <tr key={index}>
                    <td>{this.getPlayerName(battle.attackingCommander)}</td>
                    <td>{this.getPlayerName(battle.defendingCommander)}</td>
                    <td>{battle.System}</td>
                    <td><Link href={"/battle/"+battle._id}><a>Details</a></Link></td>
                    <td>{battle.round}</td>
                    <td>{this.getWinner(battle)}</td>
                </tr>
            )
        })

        const header =  <h2>{this.props.title}</h2>

        if(this.props.battles.length == 0){
            
            return <div>
                {header}
                <p>No battles to show</p>
            </div> 
            
        }else{
            return <div>
                {header}
                
                <table border="1">
                    <thead>
                        <tr>
                            <th>Attacker</th>
                            <th>Defender</th>
                            <th>System</th>
                            <th>Details</th>
                            <th>Round</th>
                            <th>Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>;
        }
    }
}

export default CampaignBattleTable;