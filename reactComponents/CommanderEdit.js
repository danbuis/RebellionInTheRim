class CommanderEdit extends React.Component {
    

    render () {
        
        return <div>
            <form action="/commander/edit" method="post">
                    <input type="text" name="newName" default="New Name" />
                
                    <label>Fleet Size</label>
                    <input type="number" name="newSize" min="1" max="250" default={this.props.commander.fleetSize}/>
                    
                    <input type="hidden" name="commanderID" value={this.props.commander._id}/>
                    <input type = "submit" value="Save Changes"/>
                </form>
            
        </div>
    }

        
}
 


export default CommanderEdit;