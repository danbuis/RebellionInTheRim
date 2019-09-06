import Header from '../reactComponents/Header'
import Welcome from '../reactComponents/Welcome'
import CurrentCampaigns from '../reactComponents/CurrentCampaigns'
import Link from 'next/link';

export default () =>


<div>
    <Header />
    <div>
    <Welcome />
    </div>
    <CurrentCampaigns />
    <Link href="/newCampaign"><a>Start a new Campaign</a></Link>
</div>

