import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'
import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="similarList">
      <div className="forMargin">
        <div className="header">
          <img
            className="companyImage"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
          <div className="title_rating">
            <h3 className="companyName">{title}</h3>
            <div className="ratingContainer">
              <FaStar className="ratingIcon" />
              <p className="ratingParagraph">{rating}</p>
            </div>
          </div>
        </div>
        <p className="descriptionheading">Description</p>
        <p className="descriptionParagraph">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobs
