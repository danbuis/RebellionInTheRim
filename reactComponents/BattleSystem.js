import Systems from '../systems.js'

class BattleSystem extends React.Component {
    state = {
        strategicEffect:this.populateState()
    }

    populateState(){
        for(var i=0; i<Systems.length; i++){
            if(Systems[i].SystemName === this.props.system){
                return Systems[i].StrategicEffect
            }
        }
    }

    listEffects(){
        const effects = this.state.strategicEffect.map(effect => {
            return <li>{effect}</li>
        })
        return effects
    }

    render () {    
        return <div>
            <h2>Contested System</h2>
            <h3>{this.props.system}</h3>
            <ul>
                {this.listEffects()}
            </ul>
            
            
        </div>
    }    
}
 
export default BattleSystem;