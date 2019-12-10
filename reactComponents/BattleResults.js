import axios from 'axios';

class BattleResults extends React.Component {

    state={
        attackingCommanderName: "",
        defendingCommanderName:""
    }
    
    constructor(props){
        super(props)
        this.populateState()
    }

    async populateState(){
        const getName = async commanderID =>{
            const commanderData = await axios.get("/commanderData/"+commanderID)
            const commander = await commanderData.data
            console.log(commander)
            return await commander.name
        }

        const attackingCommander = await getName(this.props.battle.attackingCommander)
        const defendingCommander = await getName(this.props.battle.defendingCommander)

        await this.setState({
            attackingCommanderName: attackingCommander,
            defendingCommanderName: defendingCommander
        })
    }  

    declareWinner(){
        if(this.props.battle.attackingCommander === this.props.battle.winner){
            return this.state.attackingCommanderName
        } else return this.state.defendingCommanderName
    }

    render () {
        if(this.props.battle.winner !== "none"){
            return <div>
                        <h2>Winner</h2>
                        <p>{this.declareWinner()}</p>
                    </div>
            
        }else{
            return <div>
            <h2>Who won?</h2>
            <form action="/battleResolve" method="post">
            <input type="hidden" name="campaign" value={this.props.battle.campaign}/>
            <input type="hidden" name="battle" value={this.props.battle._id} />
            <label>
                <input type="radio" name="winner" value={this.props.battle.attackingCommander} />
                {this.state.attackingCommanderName}
            </label>
            <label>
                <input type="radio" name="winner" value={this.props.battle.defendingCommander} />
                {this.state.defendingCommanderName}
            </label>
            <input type="submit" value="Declare Winner" />
            </form>
        </div>
        }
    }

        
}
 


export default BattleResults;