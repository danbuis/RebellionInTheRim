import Skills from '../commanderAbilities.js'

class CommanderSkills extends React.Component {
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

    populateTable(){
        if(Skills.length===0 ){
            return (<p> Error, no skills found!!!  Its all broken!!!</p>)
        }else{
            const rows = Skills.map((skill, index) => {
                return (
                    <tr key={index}>
                        <td>{skill.Title}</td>
                        <td>{skill.Tier}</td>
                        <td>{skill.Cost}</td>
                    </tr>
                    )
                })
            return(
                <table border="1">
                    <tr>
                    <th>Skill</th>
                    <th>Tier</th>
                    <th>Cost</th>
                    </tr>
                    <tbody>{rows}</tbody>
                </table>
            )
        }
    }

    render () {      
        return <div>
            <h2>Rim Systems</h2>
            {this.populateTable()}          
        </div>;
    }
}

export default CommanderSkills;