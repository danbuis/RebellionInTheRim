class CampaignInvitesNew extends React.Component {
    rebelValid(){
        var rebelFull = false

        if(this.sumRebel() >= this.props.campaign.numberPlayers/2){
          rebelFull = true
        }

        if(!rebelFull) return <option value="rebel">Rebel</option>
        else return
    }

    empireValid(){
        var empireFull = false

        if(empireInvites+this.props.campaign.imperials.length >= this.props.campaign.numberPlayers/2){
          empireFull = true
        }

        if(!empireFull) return <option value="empire">Empire</option>
        else return
    }

    sumRebel(){
      var rebelInvites = 0

      this.props.campaign.pendingInvites.map(invite => { 
        if(invite.faction == "rebel"){
          rebelInvites++
        }
      })

      return rebelInvites + this.props.campaign.rebels.length
    }

    sumEmpire(){
      var empireInvites = 0

      this.props.campaign.pendingInvites.map(invite => { 
        if(invite.faction != "rebel"){
          empireInvites++
        }
      })

      return empireInvites + this.props.campaign.imperials.length
    }

    render () {
      if(this.sumRebel() == this.props.campaign.numberPlayers/2 && this.sumEmpire() == this.props.campaign.numberPlayers/2){
        return <h3>Campaign full</h3>
      }else{
              return <div>
            <h3>Invite players</h3>
            <form action="/invitePlayer" method="post">
                <label>Player name</label>
                <input type="text" name="user" required/>
                <label>Faction</label>
                <select name="faction">
                    {this.rebelValid()}
                    {this.empireValid()}
                </select>
                <input type="hidden" name="campaign" value={this.props.campaign._id}/>
                <input type="submit" value="Invite" />
            </form>
            

        </div>;
    }
  }
}

export default CampaignInvitesNew;