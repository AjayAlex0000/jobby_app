import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const profileApiConstant = {
  profileInitial: 'INITIAL',
  profileLoading: 'LOADING',
  profileSuccess: 'SUCCESS',
  profileFailure: 'FAILURE',
}

class Profile extends Component {
  state = {
    profileDetails: '',
    profileApiStatus: profileApiConstant.profileInitial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: profileApiConstant.profileLoading})
    const jwtToken = Cookie.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, option)

    if (response.ok === true) {
      const profileData = await response.json()
      const updatedProfileData = profileData.profile_details
      const updatedProfileDetails = {
        profileImageUrl: updatedProfileData.profile_image_url,
        name: updatedProfileData.name,
        shortBio: updatedProfileData.short_bio,
      }
      this.setState({
        profileDetails: updatedProfileDetails,
        profileApiStatus: profileApiConstant.profileSuccess,
      })
    } else {
      this.setState({profileApiStatus: profileApiConstant.profileFailure})
    }
  }

  onProfileLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onDisplayProfile = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="profile-bg-container">
        <div className="profile-content-container">
          <img className="profile-img" src={profileImageUrl} alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-bio">{shortBio}</p>
        </div>
      </div>
    )
  }

  onClickProfileRetry = () => {
    this.getProfileDetails()
  }

  onFailureProfile = () => (
    <button
      onClick={this.onClickProfileRetry}
      className="profile-retry-btn"
      type="button"
    >
      Retry
    </button>
  )

  displayProfile = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case profileApiConstant.profileLoading:
        return this.onProfileLoading()
      case profileApiConstant.profileSuccess:
        return this.onDisplayProfile()
      case profileApiConstant.profileFailure:
        return this.onFailureProfile()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-section-container">{this.displayProfile()}</div>
    )
  }
}

export default Profile
