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
        await this.setState({
            password: event.target.value
        })

        await this.checkInput()
    }

    async updateConfirm(event){
        await this.setState({
            confirm: event.target.value
        })

        await this.checkInput()
    }

    async updateUsername(event){
        await this.setState({
            username: event.target.value
        })

        await this.checkInput()
    }

    checkInput(){
        var newErrors = []
        var passwordErrors = stringTests.data.checkString(this.state.password, 20)
        if (passwordErrors.length != 0){
            passwordErrors.map(message => {  
                newErrors.push("Password "+message)})
            }

        var usernameErrors = stringTests.data.checkString(this.state.username, 20)
        if (usernameErrors.length != 0){
            usernameErrors.map(message => {  
                newErrors.push("Username "+message)})
            }

        if(this.state.password !== "" && this.state.confirm !== ""
             && this.state.password !== this.state.confirm){
            newErrors.push("Passwords must match")
        }

        this.setState({errors: newErrors})

        var disabled
        if(this.state.username !== "" && this.state.password !== "" && this.state.errors.length === 0){
            disabled = false
        } else disabled = true

        this.setState({disabled:disabled})
    }


    listErrors(){
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
            <h1>Signup</h1>
            <p>Username and password must meet the following criteria.</p>
            <ul>
                <li>No longer than 20 characters</li>
                <li>No special characters other than the following : _ ' "</li>
                <li>No leading or trailing spaces</li>
            </ul>
            <p>Usernames are not case sensitive, but passwords are case sensitive</p>
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