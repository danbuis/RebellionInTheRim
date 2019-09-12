class CampaignInvitesNew extends React.Component {
    render () {
        
        return <div>
            <h3>Invite players</h3>
            <form action="/invitePlayer" method="post">
                <label>Player name</label>
                <input type="text" name="user" required/>
                <label>Faction</label>
                <select name="faction">
                    <option value="rebel">Rebel</option>
                    <option value="empire">Empire</option>
                </select>
                <input type="hidden" name="campaign" value={this.props.campaign}/>
                <input type="submit" value="Invite" />
            </form>
            

        </div>;
    }
}

export default CampaignInvitesNew;