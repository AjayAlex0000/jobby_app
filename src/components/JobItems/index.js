import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'

const JobItems = props => {
  const {jobsList} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobsList

  return (
    <Link className="job-link" to={`jobs/${id}`}>
      <li className="job-items">
        <div className="job-items-content-container">
          <div className="card-top-section-container">
            <div className="logo-container">
              <img
                className="company-logo"
                src={companyLogoUrl}
                alt="job details company logo"
              />
              <div className="rating-and-title-container">
                <h1 className="job-title">{title}</h1>
                <div className="rating-container">
                  <AiFillStar className="rating-star" />
                  <p className="rating-text">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-employment-type-and-lpa-container">
              <div className="location-and-employment-type-container">
                <div className="location-container">
                  <MdLocationOn className="location-and-employment-type-icon" />
                  <p className="location-and-employment-type-text">
                    {location}
                  </p>
                </div>
                <div className="employment-type-container">
                  <MdBusinessCenter className="location-and-employment-type-icon" />
                  <p className="location-and-employment-type-text">
                    {employmentType}
                  </p>
                </div>
              </div>
              <p className="lpa-text">{packagePerAnnum}</p>
            </div>
          </div>
          <h1 className="job-description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItems
