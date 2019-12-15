import axios from 'axios';

class BattleResults extends React.Component {

    state={
        attackingCommanderName: "",
        defendingCommanderName: "",
        winner: "",
        defender: 0,
        attacker: 0
    }
    
    constructor(props){
        super(props)
        this.populateState()

        this.updateAttacker = this.updateAttacker.bind(this)
        this.updateDefender = this.updateDefender.bind(this)
        this.updateWinner = this.updateWinner.bind(this)
    }

    async updateDefender(event){
        await this.setState({
            defenderDestroyed: event.target.value
        })
    }

    async updateAttacker(event){
        await this.setState({
            attackerDestroyed: event.target.value
        })
    }

    async updateWinner(event){
        await this.setState({
            winner: event.target.value
        })
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

    checkWinner(){
        if(this.state.winner == this.props.battle.attackingCommander){
            if(this.state.attackerDestroyed > this.state.defenderDestroyed){
                return false
            }else return true
        }else if(this.state.winner == this.props.battle.defendingCommander){
            if(this.state.defenderDestroyed >= this.state.attackerDestroyed){
                return false
            }else return true
        }

        //I don't see any way that this return statement would be executed, but just in case...
        return true
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

            <label>{this.state.attackingCommander} points destroyed/earned</label>
            <input type="number" name="attackerDestroyed" min="0" max="800" default="0" onChange={this.updateAttacker}/>

            <label>{this.state.defendingCommander} points destroyed/earned</label>
            <input type="number" name="defenderDestroyed" min="0" max="800" default="0" onChange={this.updateDefender}/>

            <label>Winner</label>
            <label>
                <input type="radio" name="winner" value={this.props.battle.attackingCommander} onChange={this.updateWinner}/>
                {this.state.attackingCommanderName}
            </label>

            <label>
                <input type="radio" name="winner" value={this.props.battle.defendingCommander} onChange={this.updateWinner}/>
                {this.state.defendingCommanderName}
            </label>
            <input type="submit" value="Declare Winner" disabled={this.checkWinner()}/>
            </form>
        </div>
        }
    }

        
}
 


export default BattleResults;