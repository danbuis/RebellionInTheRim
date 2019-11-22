import Header from '../reactComponents/Header'
import CommanderAbilities from '../reactComponents/CommanderAbilities'
import CommanderCurrentAbilities from '../reactComponents/CommanderCurrentAbilities'
import Axios from 'axios';
import Link from 'next/link';

export default class extends React.Component{
    static async getInitialProps(commanderData){
        const commander = await commanderData.query.commander
        const campaign = await commanderData.query.campaign
        console.log(campaign)
        return {commander, campaign};
    }

    render(){
        return(
            <div>
                <Header />
                <h2>{this.props.commander.name}</h2>
                <p>Campaign : <Link href={"/campaign/"+this.props.campaign.name}><a>{this.props.campaign.name}</a></Link></p>
                <form action="/changeCommanderName" method="post">
                    <input type="text" name="newName" default="New Name" />
                    <input type="hidden" name="commanderID" value={this.props.commander._id}/>
                    <input type = "submit" value="Change Name"/>
                </form>

                <h3>Current available ability points</h3>
                <p>{this.props.commander.currentPoints}</p>

                <h3>Current commander abilities</h3>
                <CommanderCurrentAbilities commander={this.props.commander}/>

                <CommanderAbilities commander={this.props.commander}/>

            </div>
        )
    }
}