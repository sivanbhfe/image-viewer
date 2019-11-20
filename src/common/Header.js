import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';


import { Link } from 'react-router-dom';

const Header = function(props){
   // const headerStyle={textAlign: 'center',padding: 20,background: '#000',color: '#fff',textTransform: 'uppercase'};
    return (<div className='header'>
        <div className="header-text">{props.heading}</div>
       <div className="search-and-icon">
       <span className="search-box">{props.search}</span>
       <span className="profile-icon">
       <Link to="/profile/">
        <img src={logo}/>{props.logo}
        </Link>
        </span> 
        </div>
      </div>);   
}

export default Header;