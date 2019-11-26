import React from 'react';
import stringTests from '../stringTests.js'

class SignUpBlock extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            disabled: true,
            password: "",
            confirm: "",
            username:"",
            errors:[]
        }
        this.updatePassword = this.updatePassword.bind(this)
        this.updateConfirm = this.updateConfirm.bind(this)
        this.updateUsername = this.updateUsername.bind(this)
    } 

    async updatePassword(event){
        //console.log("Current password "+event.target.value)
        await this.setState({
            password: event.target.value
        })

        await this.checkInput()
    }

    async updateConfirm(event){
        //console.log("Current confirm password "+event.target.value)
        await this.setState({
            confirm: event.target.value
        })

        await this.checkInput()
    }

    async updateUsername(event){
        //console.log("Current username "+event.target.value)
        await this.setState({
            username: event.target.value
        })

        await this.checkInput()
    }

    checkInput(){
        var newErrors = []
        //console.log(stringTests.data)
        //console.log("checking "+this.state.password)
        var passwordErrors = stringTests.data.checkString(this.state.password)
        if (passwordErrors.length != 0){
            passwordErrors.map(message => {  
                //console.log("pushing an error")
                newErrors.push("Password "+message)})
            }

        var usernameErrors = stringTests.data.checkString(this.state.username)
        if (usernameErrors.length != 0){
            usernameErrors.map(message => {  
                //console.log("pushing an error")
                newErrors.push("Username "+message)})
            }

        if(this.state.password !== "" && this.state.confirm !== ""
             && this.state.password !== this.state.confirm){
            newErrors.push("Passwords must match")
        }

        this.setState({errors: newErrors})
        //console.log("in check input" + this.state.errors)
        var disabled
        if(this.state.username !== "" && this.state.password !== "" && this.state.errors.length === 0){
            disabled = false
        } else disabled = true

        this.setState({disabled:disabled})
    }


    listErrors(){
        console.log("in list errors" + this.state.errors)
       const errors =  this.state.errors.map(error =>{
            return <p>{error}</p>
        })

        if(this.state.errors.length > 0){
            return   <div>
                        <p>Errors</p>
                        {errors}
                    </div>
        }
    }

    render() {
 
        return <div>
            <form action="/signup" method="post">
                <label>Username</label>
                <input type="text" name="username" default="Username" required onChange={this.updateUsername}/>

                <label>Password</label>
                <input type="password" name="password" default="" required onChange={this.updatePassword}/>
                
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" default="" required onChange={this.updateConfirm}/>

                <input type="submit" value="Submit" disabled={this.state.disabled}/>
            </form>

            {this.listErrors()}
        </div>;
    
    }
}

export default SignUpBlock;