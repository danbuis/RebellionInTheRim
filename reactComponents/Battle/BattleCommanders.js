import BattleCommanderInfo from './BattleCommanderInfo'

class BattleCommanders extends React.Component {
    render () {

        return <div>
                    <h1>Battle Participants</h1>
                    <BattleCommanderInfo side="Attacking" commander = {this.props.attacker}/>
                    <BattleCommanderInfo side="Defending" commander = {this.props.defender}/>            
                </div>
    }

        
}
 


export default BattleCommanders;