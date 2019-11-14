import Abilities from '../commanderAbilities.js'

class CommanderAbilities extends React.Component {
    listItems(items){
        const list = items.map((item, index) => {
            return<li>{item}</li>
        })

        return(
            <ul>
                {list}
            </ul>
        )
    }

    findItemByID(id){
        for(var i=0; i<Abilities.length; i++){
            if(Abilities[i].ID === id){
                return Abilities[i].Title
            }
        }
        return "none"
    }

    addSkill(ability){
        if (ability.Base === "Yes"){
            return(
                <form action={"/addSkill/"+this.props.commander._id +"/"+ability.ID} method="post">
                    <input type="submit" value="Add Skill" />
                </form>
            )
        }
    }

    populateTable(){
        if(Abilities.length===0 ){
            return (<p> Error, no abilities found!!!  Its all broken!!!</p>)
        }else{
            const rows = Abilities.map((ability, index) => {
                return (
                    <tr key={index}>
                        <td>{ability.Title}</td>
                        <td>{ability.Tier}</td>
                        <td>{ability.Cost}</td>
                        <td>{this.findItemByID(ability.Next)}</td>
                        <td>{this.addSkill(ability)}</td>
                    </tr>
                    )
                })
            return(
                <table border="1">
                    <tr>
                    <th>Ability Name</th>
                    <th>Tier</th>
                    <th>Cost</th>
                    <th>Upgrades to</th>
                    <th>Add Skill</th>
                    </tr>
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