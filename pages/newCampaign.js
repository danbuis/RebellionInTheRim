import Header from '../reactComponents/Header'

export default () => 

<div>
    <Header />

    <form action="/initCampaign" method="post">
                <label>Campaign Name</label>
                <input type="text" name="name" required/>

                <label>Number of Players</label>
                <select name="players">
                    <option value="4">4</option>
                    <option value="6">6</option>
                </select>

                <label>Your Faction</label>
                <select name="faction">
                    <option value="rebel">Rebel</option>
                    <option value="empire">Empire</option>
                </select>


                <input type="submit" value="Submit" />
            </form>

</div>