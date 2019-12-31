import Header from '../reactComponents/Header'
import BattleCommanders from '../reactComponents/Battle/BattleCommanders'
import BattleSystem from '../reactComponents/Battle/BattleSystem'
import BattleResults from '../reactComponents/Battle/BattleResults'
import Link from 'next/link';
import React, {Component} from 'react'

export default class extends React.Component{
    static async getInitialProps(battle){
        console.log(battle.query)
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
                <BattleResults battle = {this.props.battle}/>
                <p><Link href={"/campaign/"+this.props.battle.campaign}><a>Back to Campaign</a></Link></p>


            </div>
        )
    }
} 

