import {withRouter} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const {history} = props
  const onFindingJobs = () => {
    history.replace('/jobs')
  }
  return (
    <div className="bgHomeContainer">
      <Header />
      <h1 className="homeHeading">Find The Job That Fits Your Life</h1>
      <p className="homeParagraph">
        Millions of people are searching for jobs,salary Information,company
        reviews.Find The job that fits your abilities and potential.
      </p>
      <button type="button" className="homeButton" onClick={onFindingJobs}>
        Find Jobs
      </button>
    </div>
  )
}

export default withRouter(Home)
