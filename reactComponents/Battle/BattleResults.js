import axios from 'axios';

class BattleResults extends React.Component {

    state={
        attackingCommanderName: "",
        defendingCommanderName: "",
        winner: "",
        defender: 0,
        attacker: 0,
        validWinner:false
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
            defenderDestroyed: event.target.value,
            validWinner:this.checkWinner()
        })
    }

    async updateAttacker(event){
        await this.setState({
            attackerDestroyed: event.target.value,
            validWinner:this.checkWinner()
        })
    }

    async updateWinner(event){
        await this.setState({
            winner: event.target.value,             
        })
        this.setState({
            validWinner:this.checkWinner()  
        })
    }

    async populateState(){
        const getName = async commanderID =>{
            const commanderData = await axios.get("/commander/data/"+commanderID)
            const commander = await commanderData.data
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
        return false
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
            <form action="/battle/resolve" method="post">
            <input type="hidden" name="campaign" value={this.props.battle.campaign}/>
            <input type="hidden" name="battle" value={this.props.battle._id} />

            <label>{this.state.attackingCommanderName} points destroyed/earned</label>
            <input type="number" name="attackerDestroyed" min="0" max="800" default="0" onChange={this.updateAttacker}/>

            <label>{this.state.defendingCommanderName} points destroyed/earned</label>
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
            <input type="submit" value="Declare Winner" disabled={!this.state.validWinner}/>
            </form>
        </div>
        }
    }

        
}
 


export default BattleResults;