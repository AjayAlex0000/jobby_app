import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'
import './index.css'

const SimilarJob = props => {
  const {similarJobs} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobs

  return (
    <li className="similar-job-card">
      <div className="similar-job-content-container">
        <div className="similar-job-logo-container">
          <img 
            className="similar-job-company-logo"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
          <div className="similar-job-rating-and-title-container">
            <h1 className="similar-job-title">{title}</h1>
            <div className="similar-job-rating-container">
              <AiFillStar className="similar-job-rating-star" />
              <p className="similar-job-rating-text">{rating}</p>
            </div>
          </div>
        </div>

        <h1 className="similar-job-job-description-heading">Description</h1>

        <p className="similar-job-job-description">{jobDescription}</p>
        <div className="similar-job-location-and-employment-type-container">
          <div className="similar-job-location-container">
            <MdLocationOn className="similar-job-location-and-employment-type-icon" />
            <p className="similar-job-location-and-employment-type-text">
              {location}
            </p>
          </div>
          <div className="similar-job-employment-type-container">
            <MdBusinessCenter className="similar-job-location-and-employment-type-icon" />
            <p className="similar-job-location-and-employment-type-text">
              {employmentType}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob