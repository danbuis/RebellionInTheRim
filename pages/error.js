import Header from '../reactComponents/Header'

import React, {Component} from 'react'

export default class extends React.Component{
    static async getInitialProps(errorMessage){
        return errorMessage.query;
    }

    render(){
        
        return(
            <div>
                <Header />
                <h1>Error!</h1>
                <h2>{this.props.errorMessage}</h2>
                <p>Oops!  Looks like you accidentally tried to do something that
                    isn't super kosher.  Please use the "back" button and try things
                    differently.
                </p>
            </div>
        )
    }
} 

