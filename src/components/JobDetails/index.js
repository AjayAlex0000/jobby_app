import {Component} from 'react'
import {FiExternalLink} from 'react-icons/fi'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'
import SimilarJob from '../SimilarJob'
import './index.css'
import Header from '../Header'

const jobDetailsApiStatusConstant = {
  jobDetailsInitial: 'INITIAL',
  jobDetailsLoading: 'LOADING',
  jobDetailsSuccess: 'SUCCESS',
  jobDetailsFailure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetailsApiStatus: jobDetailsApiStatusConstant.jobDetailsInitial,
    jobDetailsAndSimilarJobs: '',
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({
      jobDetailsApiStatus: jobDetailsApiStatusConstant.jobDetailsLoading,
    })
    const {match} = this.props
    const {url} = match
    const jwtToken = Cookie.get('jwt_token')
    const jobsDetailsUrl = `https://apis.ccbp.in${url}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsDetailsUrl, option)
    if (response.ok === true) {
      const data = await response.json()
      const UpdatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imgUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          skills: data.job_details.skills.map(eachItem => ({
            name: eachItem.name,
            imageUrl: eachItem.image_url,
          })),
          title: data.job_details.title,
        },
        similarJobs: data.similar_jobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        })),
      }

      this.setState({
        jobDetailsApiStatus: jobDetailsApiStatusConstant.jobDetailsSuccess,
        jobDetailsAndSimilarJobs: UpdatedData,
      })
    } else {
      this.setState({
        jobDetailsApiStatus: jobDetailsApiStatusConstant.jobDetailsFailure,
      })
    }
  }

  jobDetailsRetry = () => {
    this.getJobsDetails()
  }

  jobDetailsFailure = () => (
    <div className="job-details-failure-container">
      <img
        className="job-details-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="job-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={this.jobDetailsRetry}
        className="job-details-failure-retry-btn"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  onJobDetailsLoading = () => (
    <div className="job-details-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onJobDetailsSuccess = () => {
    const {jobDetailsAndSimilarJobs} = this.state
    const {jobDetails, similarJobs} = jobDetailsAndSimilarJobs
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails
    const {imgUrl, description} = lifeAtCompany

    return (
      <>
        <div className="job-details-card">
          <div className="job-details-content-container">
            <div className="job-details-card-top-section-container">
              <div className="job-details-logo-container">
                <img
                  className="job-details-company-logo"
                  src={companyLogoUrl}
                  alt="job details company logo"
                />
                <div className="job-details-rating-and-title-container">
                  <h1 className="job-details-title">{title}</h1>
                  <div className="job-details-rating-container">
                    <AiFillStar className="job-details-rating-star" />
                    <p className="job-details-rating-text">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="job-details-location-employment-type-and-lpa-container">
                <div className="job-details-location-and-employment-type-container">
                  <div className="job-details-location-container">
                    <MdLocationOn className="job-details-location-and-employment-type-icon" />
                    <p className="job-details-location-and-employment-type-text">
                      {location}
                    </p>
                  </div>
                  <div className="job-details-employment-type-container">
                    <MdBusinessCenter className="job-details-location-and-employment-type-icon" />
                    <p className="job-details-location-and-employment-type-text">
                      {employmentType}
                    </p>
                  </div>
                </div>
                <p className="job-details-lpa-text">{packagePerAnnum}</p>
              </div>
            </div>
            <div className="job-details-description-container">
              <h1 className="job-details-job-description-heading">
                Description
              </h1>
              <a className="visit-link-text" href={companyWebsiteUrl}>
                Visit <FiExternalLink className="link-icon" />
              </a>
            </div>

            <p className="job-details-job-description">{jobDescription}</p>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-list-container">
              {skills.map(eachItem => (
                <li key={eachItem.name} className="skills-list-item">
                  <img
                    className="skills-img"
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                  />
                  <p className="skills-text">{eachItem.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="life-at-company-heading">Life at Company</h1>
            <div className="life-at-company-container">
              <p className="life-at-company-description">{description}</p>
              <img
                className="life-at-company-img"
                src={imgUrl}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-job-list-container">
          {similarJobs.map(eachItem => (
            <SimilarJob similarJobs={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  displayApiStatus = () => {
    const {jobDetailsApiStatus} = this.state

    switch (jobDetailsApiStatus) {
      case jobDetailsApiStatusConstant.jobDetailsLoading:
        return this.onJobDetailsLoading()
      case jobDetailsApiStatusConstant.jobDetailsSuccess:
        return this.onJobDetailsSuccess()
      case jobDetailsApiStatusConstant.jobDetailsFailure:
        return this.jobDetailsFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-bg-container">
          <div className="job-details-content-container">
            {this.displayApiStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default JobDetails
