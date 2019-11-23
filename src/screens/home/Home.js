import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/Header';


class Home extends Component {

    constructor() {
        super();
        this.state = {
            userphotos: [],
            access_token:sessionStorage.getItem("access-token"),
            loggedIn:'false',
            hasError:false,
            accessToken:''
         }
    }

    componentWillMount() {
      let data = null;
        let baseUrl=this.props.baseUrl;
        let xhr = new XMLHttpRequest();
        let that = this;
        let access_token = this.state.access_token;
        let accessToken = this.state.accessToken;
        let loggedIn = false;
        
      
       
        this.state.accessToken = this.props.history.location.state.accessToken;
        loggedIn = this.props.history.location.state.loggedIn;

       alert(this.state.access_token);
       alert(this.props.history.location.state.loggedIn);
        
                
        if(access_token===this.state.accessToken && loggedIn===true){
            that.state.loggedIn='true';
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    userphotos: JSON.parse(this.responseText).data
                });
                //alert(that.state.userphotos);
            }
        });


       xhr.open("GET", baseUrl+access_token);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
       
    } else {
        this.props.history.push({pathname:'/'});
    }
        
    }

render(){
    return(<div>
        <div><Header heading="Image Viewer" accc={this.state.access_token} loggedIn={this.state.loggedIn} searchDisplay="dispSearch" iconDisplay="dispBlock"/></div>
        {this.state.userphotos.map(photo=>(<span key={"grid" + photo.id}><p><img src={photo.images.low_resolution.url}></img></p></span>))}
    </div>) 
}
}
export default Home;