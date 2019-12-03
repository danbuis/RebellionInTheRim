import axios from 'axios';

class CampaignMessageList extends React.Component {
    state = {
        IDs:[],
        source:[]
    }

    constructor(props){
        super(props)
        this.populateState()
    }

    async populateState(){
        var idList =[]

        const getSource = async message => {
            idList.push(message.source)
            if (message.messageType == "commander" && message.source != "auto"){
                const commander = await axios.get('/commanderData/'+message.source)
                const commanderData = await commander.data
                
                return await commanderData.name
            } else return ""
            
        }

        const sources = await Promise.all(this.props.messages.map(message => getSource(message)))
        await this.setState({
            IDs:idList,
            source:sources
        })
    }

    displayMessages(){
        if(this.props.messages.length===0){
            return (<li>No messages at this time</li>)
        }

        const messageDisplay =  this.props.messages.map((message, index) => {
            const prefix = this.state.source[index]

            return (
                <li key={index}>{prefix}{message.text}</li>
            )
        })

        return messageDisplay
    }

    render () {
        
        return <div>    
            <ul>
                {this.displayMessages()}
            </ul>
        </div>;
    }
}

export default CampaignMessageList;