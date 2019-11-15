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
                return Abilities[i]
            }
        }
        return "none"
    }

    upgrade(ability){
        if(ability.Next === -1){
            return "None"
        }
        else{
            return(
                <form action={"/upgradeSkill"} method="post">
                    <input type="hidden" name="commanderID" value = {this.props.commander._id} />
                    <input type="hidden" name="currentSkillID" value = {ability.ID} />
                    <input type="hidden" name="newSkillID" value = {ability.Next} />
                    <input type="submit" value="Upgrade Skill" />
                </form>
            )
        }
    }

    populateTable(){
        if(this.props.commander.abilities.length===0 ){
            return (<p>No current commander abilities</p>)
        }else{
            const rows = this.props.commander.abilities.map((id, index) => {
                var ability = this.findItemByID(id)
                console.log(ability)
                return (
                    <tr key={index}>
                        <td>{ability.Title}</td>
                        <td>{ability.Tier}</td>
                        <td>{ability.Cost}</td>
                        <td>{this.upgrade(ability)}</td>
                    </tr>
                    )
                })
            return(
                <table border="1">
                    <thead>
                        <tr>
                            <th>Ability Name</th>
                            <th>Tier</th>
                            <th>Cost</th>
                            <th>Upgrade?</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            )
        }
    }

    render () {      
        return <div>
            <h2>Current Commander Abilities</h2>
            {this.populateTable()}          
        </div>;
    }
}

export default CommanderAbilities;