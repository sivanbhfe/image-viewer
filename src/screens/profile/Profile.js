import React, {Component} from 'react';
import './Profile.css';
import Header from '../../common/Header';

class Profile extends Component {
constructor() {
    super();
    this.state = {
        userprofile: [],
        access_token: sessionStorage.getItem("access-token")
    }
    this.singleUserUrl = "https://api.instagram.com/v1/users/self/?access_token=";
}
componentWillMount() {
    let data = null;
    let baseUrl=this.props.baseUrl;
      let xhr = new XMLHttpRequest();
      let that = this;
      let access_token = sessionStorage.getItem("access-token");
      let loggedIn = '';
      let accessToken='';
// Redirecting to login page if not logged in        
      try{
     accessToken = this.props.location.state.accessToken;
  loggedIn = this.props.location.state.loggedIn; 
   } catch(exception){
   this.props.history.push({pathname:'/'});
 }
// Getting data from API if logged in
   if(access_token===accessToken && loggedIn==='true'){
      xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
              that.setState({
                userprofile: JSON.parse(this.responseText).data
              });
          }
      });
      xhr.open("GET", baseUrl+access_token);
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.send(data);
  }  else {
   this.props.history.push({pathname:'/'});
  }
}

render(){
    return(<div>
        <div><Header heading="Image Viewer" loggedIn={this.state.loggedIn} accc={this.state.access_token} prof={this.singleUserUrl} noSearchBox="dispNone" searchDisplay="dispSearch" iconDisplay="dispBlock" /></div>
        {this.state.userprofile.map(profile=>(<span key={"grid" + profile.id}><p><img src={profile.images.low_resolution.url}></img></p></span>))}
    </div>) 

}
}
export default Profile;