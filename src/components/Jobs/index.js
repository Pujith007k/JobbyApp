import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobsListItem from '../JobsListItem'

import './index.css'

const apiJobStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  emptyList: 'EMPTY',
  inProgress: 'IN_PROGRESS',
}

const apiProfileStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

class Jobs extends Component {
  state = {
    profile: {},
    jobsList: [],
    checkBox: [],
    salary: '',
    searchInput: '',
    apiStatus: apiJobStatusConstants.initial,
    profileStatus: apiProfileStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobsList()
  }

  getProfile = async () => {
    this.setState({
      profileStatus: apiProfileStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const profileResponse = await fetch(url, options)
    if (profileResponse.ok === true) {
      const profileData = await profileResponse.json()
      const profileUpdatedData = {
        name: profileData.profile_details.name,
        profileImageUrl: profileData.profile_details.profile_image_url,
        shortBio: profileData.profile_details.short_bio,
      }
      this.setState({
        profile: profileUpdatedData,
        profileStatus: apiProfileStatusConstants.success,
      })
    } else {
      this.setState({profileStatus: apiProfileStatusConstants.failure})
    }
  }

  getJobsList = async () => {
    this.setState({
      apiStatus: apiJobStatusConstants.inProgress,
    })
    const {checkBox, salary, searchInput} = this.state
    console.log(checkBox)
    const jwtToken = Cookies.get('jwt_token')
    const str = checkBox.join(',')
    const urlJobs = `https://apis.ccbp.in/jobs?employment_type=${str}&minimum_package=${salary}&search=${searchInput}`
    console.log(urlJobs)
    const optionsJobs = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobsResponse = await fetch(urlJobs, optionsJobs)
    if (jobsResponse.ok === true) {
      const jobsData = await jobsResponse.json()
      if (jobsData.total === 0) {
        this.setState({
          apiStatus: apiJobStatusConstants.emptyList,
        })
      } else {
        console.log(jobsData)
        const updatedJobsList = jobsData.jobs.map(eachItem => ({
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
          jobsList: updatedJobsList,
          apiStatus: apiJobStatusConstants.success,
        })
      }
    } else {
      this.setState({apiStatus: apiJobStatusConstants.failure})
    }
  }

  oncheckBoxChange = event => {
    const {checkBox} = this.state
    const updatedCheckBox = [...checkBox, event.target.value]
    this.setState(
      {
        checkBox: updatedCheckBox,
      },
      this.getJobsList,
    )
  }

  onSalaryChange = event => {
    this.setState({salary: event.target.value}, this.getJobsList)
  }

  onSearchChange = event => {
    this.setState({searchInput: event.target.value}, this.getJobsList)
  }

  renderFailureView = () => (
    <div className="faliureView">
      <img
        className="failImage"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
      />
      <h1 className="failHeading">No Jobs Found</h1>
      <p className="failParagraph">
        We could not find any jobs.Try other filters.
      </p>
    </div>
  )

  renderProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    return (
      <div>
        <ul>
          {jobsList.map(eachItem => (
            <JobsListItem jobDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderProfileSuccessView = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile
    return (
      <div className="profileBg">
        <img className="profileImage" src={profileImageUrl} alt="profile" />
        <h1 className="profileHeading">{name}</h1>
        <p className="profileBio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div>
      <button type="button" className="profileRetryButt">
        Retry
      </button>
    </div>
  )

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
      <button type="button" className="profileRetryButt">
        Retry
      </button>
    </div>
  )

  onSwitchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiJobStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiJobStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiJobStatusConstants.inProgress:
        return this.renderProgressView()
      case apiJobStatusConstants.emptyList:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderingProfileView = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case apiProfileStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiProfileStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiProfileStatusConstants.inProgress:
        return this.renderProgressView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    console.log(searchInput)
    return (
      <div className="jobsBgcontainer">
        <Header />
        <div className="container">
          <div className="profileListContainer">
            {this.renderingProfileView()}
            <hr className="line" />
            <h1 className="employmentTypeHeading">Type of Employment</h1>
            <ul className="unorderedList">
              {employmentTypesList.map(eachItem => (
                <li className="listEmployment" key={eachItem.employmentTypeId}>
                  <input
                    type="checkbox"
                    id="employmentType"
                    value={eachItem.employmentTypeId}
                    onChange={this.oncheckBoxChange}
                    key={eachItem.employmentTypeId}
                  />
                  <label htmlFor="employmentType" className="label">
                    {eachItem.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="line" />
            <h1 className="employmentTypeHeading">Salary Range</h1>
            <ul className="unorderedList">
              {salaryRangesList.map(eachItem => (
                <li className="listEmployment" key={eachItem.salaryRangeId}>
                  <input
                    type="radio"
                    id="salaryType"
                    name="salary"
                    value={eachItem.salaryRangeId}
                    onChange={this.onSalaryChange}
                    key={eachItem.salaryRangeId}
                  />
                  <label htmlFor="salaryType" className="label">
                    {eachItem.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobsContainer">
            <div className="searchInput">
              <input
                type="search"
                className="searchbar"
                placeholder="Search"
                value={searchInput}
                onChange={this.onSearchChange}
              />
              <button
                type="button"
                className="iconButton"
                data-testid="searchButton"
                label="icon"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.onSwitchCase()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
