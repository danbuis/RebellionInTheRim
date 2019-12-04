import axios from 'axios';

class CampaignBattleTable extends React.Component {
    state={
        battles:[]
    }

    constructor(props){
        super(props)
        this.populateState()
    }

    async populateState(){
    
        const getBattleData = async battleID =>{
            const battleData = await axios.get('/battleData/'+battleID)
            return await battleData.data
        }

        const battles = await Promise.all(this.props.battles.map(battleID => getBattleData(battleID)))
        
        await this.setState({
            battles:battles
        })
    }

    render () {
        
        const rows = this.state.battles.map((battle, index) => {
            return (
                <tr key={index}>
                    <td>{battle.attackingCommander}</td>
                    <td>{battle.defendingCommander}</td>
                    <td>{battle.System}</td>
                    <td>Placeholder</td>
                </tr>
            )
        })

        return <div>
            <h2>{this.props.title}</h2>
            
            <table border="1">
                <thead>
                    <tr>
                        <th>Attacker</th>
                        <th>Defender</th>
                        <th>System</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
                     

        </div>;
    }
}

export default CampaignBattleTable;