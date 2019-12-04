import Header from '../reactComponents/Header'
import BattleCommanders from '../reactComponents/BattleCommanders'
import BattleSystem from '../reactComponents/BattleSystem'
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
                <BattleCommanders 
                        attacker = {this.props.battle.attackingCommander} 
                        defender = {this.props.battle.defendingCommander}/>
                <BattleSystem />
                <BattleResults />

            </div>
        )
    }
} 

