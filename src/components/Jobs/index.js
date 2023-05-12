import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import Filter from '../Filter'
import JobItems from '../JobItems'
import './index.css'

const jobApiStatusConstant = {
  jobInitial: 'INITIAL',
  jobLoading: 'LOADING',
  jobSuccess: 'SUCCESS',
  jobFailure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    checkBoxList: [],
    activeSalaryRange: '',
    searchInput: '',
    searchText: '',
    jobApiStatus: jobApiStatusConstant.jobInitial,
    jobsList: [],
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({jobApiStatus: jobApiStatusConstant.jobLoading})
    const {checkBoxList, activeSalaryRange, searchText} = this.state
    const checkBoxData = checkBoxList.join(',')
    const jwtToken = Cookie.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxData}&minimum_package=${activeSalaryRange}&search=${searchText}`

    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsUrl, option)
    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data
      const updatedJobsDetails = jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobApiStatus: jobApiStatusConstant.jobSuccess,
        jobsList: updatedJobsDetails,
      })
    } else {
      this.setState({jobApiStatus: jobApiStatusConstant.jobFailure})
    }
  }

  onSelectCheckBox = (activeCheckBoxValue, isCheckBoxSelected) => {
    if (isCheckBoxSelected) {
      this.setState(
        prevState => ({
          checkBoxList: [...prevState.checkBoxList, activeCheckBoxValue],
        }),
        this.getJobsList,
      )
    } else {
      this.setState(
        prevState => ({
          checkBoxList: prevState.checkBoxList.filter(
            eachItem => eachItem !== activeCheckBoxValue,
          ),
        }),
        this.getJobsList,
      )
    }
  }

  onSelectSalaryRange = activeSalaryRange => {
    this.setState({activeSalaryRange}, this.getJobsList)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBtn = () => {
    const {searchInput} = this.state
    this.setState({searchText: searchInput}, this.getJobsList)
  }

  onClickJobFailureRetryBtn = () => {
    this.getJobsList()
  }

  onJobLoading = () => (
    <div className="job-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  noJobView = () => (
    <div className="no-job-container">
      <img
        className="no-job-img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-job-heading">No Jobs Found</h1>
      <p className="no-job-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  displayJobList = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.noJobView()
    }
    return (
      <ul className="job-list-container">
        {jobsList.map(eachItem => (
          <JobItems key={eachItem.id} jobsList={eachItem} />
        ))}
      </ul>
    )
  }

  onJobFailure = () => (
    <div className="job-failure-container">
      <img
        className="job-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="job-failure-heading">Oops! Something Went Wrong</h1>
      <p className="job-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={this.onClickJobFailureRetryBtn}
        className="job-retry-btn"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  displayApiStatus = () => {
    const {jobApiStatus} = this.state
    switch (jobApiStatus) {
      case jobApiStatusConstant.jobLoading:
        return this.onJobLoading()
      case jobApiStatusConstant.jobSuccess:
        return this.displayJobList()
      case jobApiStatusConstant.jobFailure:
        return this.onJobFailure()
      default:
        return null
    }
  }

  render() {
    const {activeSalaryRange, searchInput} = this.state

    return (
      <>
        <Header />
        <div className="job-bg-container">
          <div className="job-content-container">
            <div className="search-input-container">
              <input
                placeholder="Search"
                className="search-input"
                type="search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
              <button
                onClick={this.onClickSearchBtn}
                type="button"
                className="search-icon-btn"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="first-section">
              <Profile />
              <Filter
                onSelectCheckBox={this.onSelectCheckBox}
                onSelectSalaryRange={this.onSelectSalaryRange}
                activeSalaryRange={activeSalaryRange}
              />
            </div>
            <div className="second-section">
              <div className="search-input-container-sm">
                <input
                  placeholder="Search"
                  className="search-input"
                  type="search"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
                <button
                  data-testid="searchButton"
                  onClick={this.onClickSearchBtn}
                  type="button"
                  className="search-icon-btn"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.displayApiStatus()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs