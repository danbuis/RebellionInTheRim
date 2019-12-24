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

    getBaseButtons(systemName){
        var system
        
        const buildRebelBase = <div>
            <form action="/campaign/newBase" method="post">
                <input type="hidden" name="faction" value="Rebel" />
                <input type="hidden" name="campaign" value={this.props.campaign._id} />
                <input type="hidden" name="systen" value={systemName} />
                <input type="submit" value="Build Rebel Base" />
            </form>
        </div>

        const buildImperialBase = <div>
            <form action="/campaign/newBase" method="post">
                <input type="hidden" name="faction" value="Imperial" />
                <input type="hidden" name="campaign" value={this.props.campaign._id} />
                <input type="hidden" name="system" value={systemName} />
                <input type="submit" value="Build Imperial Base" />
            </form>
        </div>

        const removeBase = <div>
            <form action="/campaign/removeBase" method="post">
                <input type="hidden" name="campaign" value={this.props.campaign._id} />
                <input type="hidden" name="system" value={systemName} />
                <input type="submit" value="Remove Base" />
            </form>
        </div>

        var index = -1
        for(var i = 0;i < this.props.campaign.systems.length; i++){
            if(this.props.campaign.systems[i].name == systemName){
                index = i
            }
        }

        if(index != -1){
            system = this.props.campaign.systems[index]
        }

        //if still round 0
        if(this.props.campaign.round == 0){
            if(system.faction ==""){
                return<div>
                    {buildRebelBase}
                    {buildImperialBase}
                </div>
            }else return {removeBase}
        }else{
            if(system.facility == "Presence"){
                if(system.faction == "rebel"){
                    return {buildRebelBase}
                }else return {buildImperialBase}
            }
        }
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
                        <td>{this.getBaseButtons(system.SystemName)}</td>
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
                            <th></th>
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