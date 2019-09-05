import Header from '../reactComponents/Header'

export default () => 

<div>
    <Header />

    <form action="/signup" method="post">
                <label>Username</label>
                <input type="text" name="username" default="Username" required/>

                <label>Password</label>
                <input type="text" name="password" default="" required/>

                <input type="submit" value="Submit" />
            </form>

</div>