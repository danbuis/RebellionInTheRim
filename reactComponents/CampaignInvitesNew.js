class CampaignAddMessage extends React.Component {
    render () {
        
        return <div>
            <h3>Invite players</h3>
            <form action="/invitePlayer" method="post">
                <label>Player name</label>
                <input type="text" name="name" required/>
                <label>Faction</label>
                <select name="faction">
                            <option value="rebel">Rebel</option>
                            <option value="empire">Empire</option>
                        </select>
                <input type="submit" value="Invite" />
            </form>
            

        </div>;
    }
}

export default CampaignAddMessage;