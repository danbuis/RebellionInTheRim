import stringTests from '../../stringTests.js'

class CommanderEdit extends React.Component {
    constructor(props){
        super(props)
        this.state={
            disabled:true,
            name: "",
            errors:[]
        }
        this.updateName = this.updateName.bind(this)
    }

    async updateName(event){
        await this.setState({
            name: event.target.value
        })

        await this.checkInput()
    }

    checkInput(){
        var newErrors = []
        var commanderErrors = stringTests.data.checkString(this.state.name, 20)
        if(commanderErrors.length != 0){
            commanderErrors.map(message => {
                newErrors.push("Commander name "+message)
            })
        }
        this.setState({errors:newErrors})
        var disabled
        if(this.state.name !== "" && this.state.errors.length ===0){
            disabled = false
        }else disabled = true

        this.setState({disabled:disabled})
    }

    listErrors(){
        const errors = this.state.errors.map(error =>{
            return <p>{error}</p>
        })

        if(this.state.errors.length > 0){
            return  <div>
                        <p>Commander name must meet the following criteria.</p>
                        <ul>
                            <li>No longer than 20 characters</li>
                            <li>No special characters other than the following : _ ' "</li>
                            <li>No leading or trailing spaces</li>
                        </ul>
                        <p>Current Errors</p>
                        {errors}
                    </div>
        }
    }

    render () {
        
        return <div>
            <h2>Edit Commander</h2>
            
            <form action="/commander/edit" method="post">
                <label>New Name</label>
                <input type="text" name="newName" defaultValue={this.props.commander.name} onChange={this.updateName}/>
            
                <label>Fleet Size</label>
                <input type="number" name="newSize" min="1" max="250" defaultValue={this.props.commander.fleetSize}/>
                
                <input type="hidden" name="commanderID" value={this.props.commander._id}/>
                <input type = "submit" value="Save Changes" disabled={this.state.disabled}/>
            </form>

            {this.listErrors()}
            
        </div>
    }

        
}
 


export default CommanderEdit;