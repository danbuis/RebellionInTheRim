import axios from 'axios';
import Abilities from '../commanderAbilities.js'

class BattleCommanderInfo extends React.Component {
    state = {
        commanderName:"",
        commanderFaction: "",
        fleetSize:"",
        abilities: []
    }

    constructor(props){
        super(props)
        this.populateState()
    }

    async populateState(){
        console.log("populating state")
        const commanderData = await axios.get("/commanderData/"+this.props.commander)
        const commander = await commanderData.data

        var abilityTitles = commander.abilities.map(abilityIndex =>{
            return this.findItemByID(abilityIndex)
        })

        await this.setState({
            commanderName:commander.name,
            commanderFaction:commander.faction,
            fleetSize:commander.fleetSize,
            abilities:abilityTitles
        })
    }

    findItemByID(id){
        for(var i=0; i<Abilities.length; i++){
            if(Abilities[i].ID === id){
                return Abilities[i].Title
            }
        }
        return "None"
    }

    listAbilities(){
        if(this.state.abilities.length === 0) return <ul><li>none</li></ul>
        const list = this.state.abilities.map(title => {
            return <li>{title}</li>
        })
        return(<ul>{list}</ul>)
    }

    render () {
        

        return <div>
            <h2>{this.props.side} Commander</h2>
            <p>Name : {this.state.commanderName}</p>
            <p>Faction : {this.state.commanderFaction}</p>
            <p>Fleet Size : {this.state.fleetSize}</p>
            <p>Abilties :</p>
            {this.listAbilities()}
            
        </div>
    }

        
}
 


export default BattleCommanderInfo;