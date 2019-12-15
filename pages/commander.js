import Header from '../reactComponents/Header'
import CommanderAbilities from '../reactComponents/CommanderAbilities'
import CommanderCurrentAbilities from '../reactComponents/CommanderCurrentAbilities'
import CommanderEdit from '../reactComponents/CommanderEdit'
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
                <p>Playing for the {this.props.commander.faction}s</p>
                <p>Campaign : <Link href={"/campaign/"+this.props.campaign.name}><a>{this.props.campaign.name}</a></Link></p>
                
                <CommanderEdit commander={this.props.commander}/>

                <h3>Current available ability points</h3>
                <p>{this.props.commander.currentPoints}</p>

                <CommanderCurrentAbilities commander={this.props.commander}/>

                <CommanderAbilities commander={this.props.commander}/>

            </div>
        )
    }
}