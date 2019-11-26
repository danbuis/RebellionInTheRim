import Abilities from '../commanderAbilities.js'

class CommanderAbilities extends React.Component {
    

    findItemByID(id){
        for(var i=0; i<Abilities.length; i++){
            if(Abilities[i].ID === id){
                return Abilities[i].Title
            }
        }
        return "None"
    }

    addSkill(ability){
        if (ability.Base === "Yes"){
            return(
                <form action="/addSkill" method="post">
                    <input type="hidden" name="commanderID" value={this.props.commander._id} />
                    <input type="hidden" name="abilityID" value={ability.ID} />
                    <input type="hidden" name="abilityTitle" value={ability.Title} />
                    <input type="submit" value="Add Skill" />
                </form>
            )
        }
    }

   alreadyHaveFamily(ability){
    var alreadyHaveFamily = false
    const thisFamily = ability.Family
    if(this.props.commander.abilities.length!=0){
        this.props.commander.abilities.map(abilityID => {
            for(var i=0; i<Abilities.length; i++){
                if(Abilities[i].ID === abilityID && Abilities[i].Family === thisFamily){
                    alreadyHaveFamily = true
                    break
                    }
                }
            })
        }
    return alreadyHaveFamily
   }

    populateTable(){
        if(Abilities.length===0 ){
            return (<p> Error, no abilities found!!!  Its all broken!!!</p>)
        }else{
            const rows = Abilities.map((ability, index) => {
                if(ability.Base === "Yes" && !this.alreadyHaveFamily(ability)){
                    return (
                        <tr key={index}>
                            <td>{ability.Title}</td>
                            <td>{ability.Tier}</td>
                            <td>{ability.Cost}</td>
                            <td>{this.findItemByID(ability.Next)}</td>
                            <td>{this.addSkill(ability)}</td>
                        </tr>
                        )
                    }
                })
            return(
                <table border="1">
                    <thead>
                        <tr>
                            <th>Ability Name</th>
                            <th>Tier</th>
                            <th>Cost</th>
                            <th>Upgrades to</th>
                            <th>Add Skill</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            )
        }
    }

    render () {      
        return <div>
            <h2>Commander Abilities</h2>
            {this.populateTable()}          
        </div>;
    }
}

export default CommanderAbilities;