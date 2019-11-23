import React, {Component} from 'react';
import './Profile.css';
import Header from '../../common/Header';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            userprofile: []
        }
    }
    componentWillMount() {
        let data = null;
        let baseUrl=this.props.baseUrl;
          let xhr = new XMLHttpRequest();
          let that = this;
          let access_token = sessionStorage.getItem("access-token");
          let loggedIn = false;
          let accessToken='';
          try{
          accessToken = this.props.location.state.accessToken;
          loggedIn = this.props.location.state.loggedIn;
        //  alert(this.props.location.pathname);
        //  alert(this.props.location.state.accessToken);
        //  alert(this.props.location.state.loggedIn);
          } catch(exception){
            alert(exception);
         this.props.history.push({pathname:'/'});
        }
        if(access_token===accessToken && loggedIn==='true'){
          xhr.addEventListener("readystatechange", function () {
              if (this.readyState === 4) {
                  that.setState({
                    userprofile: JSON.parse(this.responseText).data
                  });
                  //alert(that.state.userphotos);
              }
          });
  
         // xhr.open("GET", baseUrl + access_token);
         xhr.open("GET", baseUrl+access_token);
          xhr.setRequestHeader("Cache-Control", "no-cache");
          xhr.send(data);
      }  else {
        this.props.history.push({pathname:'/'});
      }
    }
    
    render(){
        return(<div>
            <div><Header heading="Image Viewer" noSearchBox="dispNone" searchDisplay="dispSearch" iconDisplay="dispBlock" /></div>
            {this.state.userprofile.map(profile=>(<span key={"grid" + profile.id}><p><img src={profile.images.low_resolution.url}></img></p></span>))}
        </div>) 

}
}
export default Profile;