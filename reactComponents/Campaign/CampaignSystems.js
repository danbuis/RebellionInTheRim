import Systems from '../../systems.js'

class CampaignSystems extends React.Component {
    listItems(items){
        const list = items.map((item, index) => {
            return<li key={index}>{item}</li>
        })

        return(
            <ul>
                {list}
            </ul>
        )
    }

    getOwnership(systemName){
        var index = -1
        for(var i = 0;i < this.props.campaign.systems.length; i++){
            if(this.props.campaign.systems[i].name == systemName){
                index = i
            }
        }

        if(index != -1){
            const system = this.props.campaign.systems[index]
            return system.faction + " "+system.facility
        } else return "None"
    }

    populateTable(){
        if(Systems.length===0 ){
            return (<p> Error, no systems found!!!  Its all broken!!!</p>)
        }else{
            const rows = Systems.map((system, index) => {
                return (
                    <tr key={index}>
                        <td>{system.SystemName}</td>
                        <td>{this.listItems(system.Area)}</td>
                        <td>{this.listItems(system.StrategicEffect)}</td>
                        <td>{this.getOwnership(system.SystemName)}</td>
                        <td>{system.Points}</td>
                    </tr>
                    )
                })
            return(
                <table border="1">
                    <thead>
                        <tr>
                            <th>System Name</th>
                            <th>Area</th>
                            <th>Strategic Effect</th>
                            <th>Ownership</th>
                            <th>Bonus Points</th>
                        </tr>
                    </thead>
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

export default CampaignSystems;