import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/Header';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    card: {
        maxWidth: '100%',
        margin: '8px',
        shadow: '20px',
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer',
        
        },          
});

class Home extends Component {

constructor() {
super();
this.state = {
userphotos: [],
access_token:sessionStorage.getItem("access-token"),
loggedIn:'false',
hasError:false,
accessToken:'',

}
this.singleUserUrl = "https://api.instagram.com/v1/users/self/?access_token=";

}

componentWillMount() {
let data = null;
let baseUrl=this.props.baseUrl;
let xhr = new XMLHttpRequest();
let that = this;
let access_token = this.state.access_token;
let accessToken = this.state.accessToken;
let loggedIn = false;


// Redirecting to login page if not logged in    
try{
this.state.accessToken = this.props.history.location.state.accessToken;
loggedIn = this.props.history.location.state.loggedIn;
} catch(exception){
this.props.history.push({pathname:'/'});
}

// Getting data from API if logged in
if(access_token===this.state.accessToken && loggedIn===true){
that.state.loggedIn='true';
xhr.addEventListener("readystatechange", function () {
if (this.readyState === 4) {
    
that.setState({
userphotos: JSON.parse(this.responseText).data,
});

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
<div><Header heading="Image Viewer" prof={this.singleUserUrl} accc={this.state.access_token} loggedIn={this.state.loggedIn} noSearchBox="box" searchDisplay="dispSearch" iconDisplay="dispBlock"/></div>
{this.state.userphotos.map(profile=>(<span key={"grid" + profile.id}><p><img src={profile.images.low_resolution.url}></img></p></span>))}
</div>) 
}
}
export default Home;