import Header from '../reactComponents/Header'
import BattleCommanders from '../reactComponents/BattleCommanders'
import BattleSystem from '../reactComponents/CampaignInvites'
import BattleResults from '../reactComponents/BattleResults'
import React, {Component} from 'react'

export default class extends React.Component{
    static async getInitialProps(battle){
        return battle.query;
    }

    render(){
        
        return(
            <div>
                <Header />
                <BattleCommanders />
                <BattleSystem />
                <BattleResults />

            </div>
        )
    }
} 

