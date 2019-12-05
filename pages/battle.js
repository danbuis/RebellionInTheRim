import Header from '../reactComponents/Header'
import BattleCommanders from '../reactComponents/BattleCommanders'
import BattleSystem from '../reactComponents/BattleSystem'
import BattleResults from '../reactComponents/BattleResults'
import Link from 'next/link';
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
                <BattleSystem system = {this.props.battle.System}/>
                <BattleResults />
                <p><Link href={"/campaign/"+this.props.battle.campaign}><a>Back to Campaign</a></Link></p>


            </div>
        )
    }
} 

