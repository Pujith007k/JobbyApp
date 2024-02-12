import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'
import SkillsItems from '../Skills'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'

import './index.css'

class JobItemDetails extends Component {
  state = {jobData: [], similarJobs: [], skills: [], failView: false}

  componentDidMount() {
    this.getJobItemData()
  }

  getJobItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)

    if (response.ok) {
      const data = await response.json()
      const updatedJobData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,

        lifeAtCompanydescription: data.job_details.life_at_company.description,
        lifeAtCompanyImageUrl: data.job_details.life_at_company.image_url,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(eachItem => ({
          name: eachItem.name,
          imageUrl: eachItem.image_url,
        })),
        title: data.job_details.title,
      }
      const updatedSimilarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobData: updatedJobData,
        similarJobs: updatedSimilarJobs,
        skills: updatedJobData.skills,
      })
    } else {
      this.setState({failView: true})
    }
  }

  renderJobsFailureView = () => (
    <div className="jobsFailureview">
      <img
        className="jobsfailImage"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobsfailHeading">Oops! Something Went Wrong</h1>
      <p className="jobsFailParagraph">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="profileRetryButt"
        onClick={this.getJobItemData}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {jobData, similarJobs, skills, failView} = this.state
    const {
      companyLogoUrl,
      employmentType,
      companyWebsiteUrl,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,

      lifeAtCompanydescription,
      lifeAtCompanyImageUrl,
    } = jobData
    console.log(skills)
    return (
      <>
        {failView ? (
          this.renderJobsFailureView()
        ) : (
          <div className="jobDetailsContainer">
            <Header />
            <div className="jobDetailItems">
              <div className="header">
                <img
                  className="companyImage"
                  src={companyLogoUrl}
                  alt="job details company logo"
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
              <div className="anchorclass">
                <h1 className="descriptionheading">Description</h1>
                <a href={companyWebsiteUrl} className="anchorLink">
                  Visit
                </a>
              </div>
              <p className="descriptionParagraph">{jobDescription}</p>
              <h3 className="skillheading">Skills</h3>
              <ul className="skillUnorderedList">
                {skills.map(eachItem => (
                  <SkillsItems skillDetails={eachItem} key={eachItem.name} />
                ))}
              </ul>
              <h1 className="skillheading">Life at Company</h1>
              <div className="lifeatComapny">
                <p className="companydescription">{lifeAtCompanydescription}</p>
                <img
                  className="lifeImage"
                  src={lifeAtCompanyImageUrl}
                  alt="jobImage"
                />
              </div>
            </div>
            <h1 className="similarheading">Similar Jobs</h1>
            <ul className="similarUnorderedList">
              {similarJobs.map(eachItem => (
                <SimilarJobs similarJobDetails={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}
export default JobItemDetails
