import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-bg-container">
      <div className="home-content-container">
        <div className="home-description-container">
          <h1 className="home-job-heading">Find The Job That Fits Your Life</h1>
          <p className="home-job-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the jobs that fit your abilities and
            potentials
          </p>
          <Link to="/jobs">
            <button className="find-job-btn" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  </>
)

export default Home
