import React, {Component} from 'react';
import './Header.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { classes } from 'istanbul-lib-coverage';

const styles = theme => (
      {
grow: {
flexGrow: 1,
},
title: {
color: 'initial',
},
bigAvatar: {
margin: 10,
width: 60,
height: 60,
},
search: {
position: 'relative',
borderRadius: '4px',
backgroundColor: '#c0c0c0',
marginLeft: '70%',
width: '300px',
verticalAlign: 'center',
},
searchIcon: {
height: '100%',
color: 'black',
position: 'absolute',
pointerEvents: 'none',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
},
inputRoot: {
color: 'inherit',
},
inputInput: {
transition: theme.transitions.create('width'),
width: '100%',
[theme.breakpoints.up('md')]: {
width: 200,
},
},

});

class Header extends Component {

constructor() {
super();
this.state = {
menuIsOpen: false,
ownerInfo: [],
loggedIn: sessionStorage.getItem("access-token") == null ? false : true
}
this.searchData='';
}
serachInputHandler = (e) => {
      this.searchData= e.target.value;
}

componentWillMount() {
      

// Get owner info after authenticating the  accessToken generated 
let ownerData = null;
let xhr = new XMLHttpRequest();
let that = this;
xhr.addEventListener("readystatechange", function () {
if (this.readyState === 4) {
that.setState({
ownerInfo: JSON.parse(this.responseText).data

});

}
})
xhr.open("GET", this.props.prof+this.props.accc);
xhr.send(ownerData);
}

render(){
return (<div className='header'>

<span className="header-text">{this.props.heading}</span>

<div className={this.props.searchDisplay}>
<span className={this.props.noSearchBox}>
<span className="searchcIcon">
<IconButton className="iconButton" >
            <SearchIcon />
          </IconButton>
</span>
<InputBase id="testing" placeholder="Search…"  onChange={this.serachInputHandler} />
</span>
      </div>
<div className={this.props.iconDisplay}>
<div className="image">

<Link to={{pathname: '/profile/',state:{accessToken:this.props.accc,loggedIn:this.props.loggedIn}}}>
<Avatar className="avatar">
<img src={this.state.ownerInfo.profile_picture} alt="profile-icon"/>
</Avatar>
</Link>
</div>
</div>

</div>);  
}

}

export default Header;