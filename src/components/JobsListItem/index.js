import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'
import './index.css'

const JobsListItem = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="jobLink">
      <li className="listContainer">
        <div className="header">
          <img
            className="companyImage"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="title_rating">
            <h3 className="companyName">{title}</h3>
            <div className="ratingContainer">
              <FaStar className="ratingIcon" />
              <p className="ratingParagraph">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middleDetails">
          <div className="location_type">
            <div className="locationContainer">
              <IoLocationSharp className="locationIcon" />
              <p className="locationParagraph">{location}</p>
            </div>
            <div className="typeContainer">
              <MdWork className="typeIcon" />
              <p className="typeparagraph">{employmentType}</p>
            </div>
          </div>
          <div className="salaryContainer">
            <p className="salaryParagraph">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="listLine" />
        <h1 className="descriptionheading">Description</h1>
        <p className="descriptionParagraph">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsListItem
