class CampaignMessageList extends React.Component {

    displayMessages(){
        if(this.props.messages.length===0){
            return (<li>No messages at this time</li>)
        }

        const messageDisplay = this.props.messages.map((message) =>{
            return (
                <li>{message.text}</li>
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