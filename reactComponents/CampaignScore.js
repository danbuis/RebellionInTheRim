class CampaignScore extends React.Component {
    displayScore(){
        const scores = this.props.score.map((score, index) => {
            return(
                <div>
                    <h4>Act {index+1}</h4>
                    <p>{score}</p>
                </div>
            )
        })

        return scores
    }
     
    render () {
        return <div>
            <h3>{this.props.faction} Score</h3>        
           {this.displayScore()}
        </div>;
    }
}

export default CampaignScore;