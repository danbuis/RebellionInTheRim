import CampaignInvitesNew from '../reactComponents/CampaignInvitesNew'
import axios from 'axios';

class CampaignInvites extends React.Component {
    state = {
        users:[]
    }

    constructor(props){
        super(props)
        this.populateState()
    }

    async populateState(){
        const getUserData = async invite =>{
            const user = await axios.get('/user/data/'+invite.userID);
            const userdata = await user.data
            return await userdata
          }
        
        const users = await Promise.all(this.props.invites.map(invite => getUserData(invite)))
        
        await this.setState({
            users: users
        })
    }

    /*including a method to clean up strings just in case something weird happens
    in the backend*/
    displayFaction(string){
        const lowercase = string.toLowerCase()

        if(lowercase == "rebel") return "Rebel"
        if(lowercase == "empire") return "Empire"

        return "Error"
    }

    populateTable(){
        if(this.props.invites.length===0 || this.state.users.length === 0){
            return (<p> No pending invites</p>)
        }else{
            const rows = this.props.invites.map((invite, index) => {
                return (
                    <tr key={index}>
                        <td>{this.state.users[index].username}</td>
                        <td>{this.displayFaction(invite.faction)}</td>
                    </tr>
                    )
                })
            return(
                <table border="1">
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Faction</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            )
        }
    }

    render () {      
        return <div>
            <h2>Pending Invites</h2>

            {this.populateTable()}

            <CampaignInvitesNew campaign={this.props.campaign}/>
        </div>;
    }
}

export default CampaignInvites;