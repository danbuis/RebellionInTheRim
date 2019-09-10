class CampaignAddMessage extends React.Component {
    render () {
        
        return <div>
            
            <form action="/addMessage" method="post">
                <label>Message</label>
                <input type="text" name="message" required/>
                <input type="submit" value="Submit" />
            </form>
            

        </div>;
    }
}

export default CampaignAddMessage;