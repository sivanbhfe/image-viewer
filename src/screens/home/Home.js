import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/Header';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { red } from '@material-ui/core/colors';
import { classes } from 'istanbul-lib-coverage';
//import moment from "moment";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const styles = theme => ({
    root: {
        width: '100%',
    },
    card: {
      maxWidth: 145
    },
    profileAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer',

    },
    avatar: {
        backgroundColor: red[500],
      }
});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            userphotos: [],
            access_token:sessionStorage.getItem("access-token"),
            ownerInfo:{
                username: "upgrad_sde"
            },
            comment:"",
            addComment:"dispComment",
            loggedIn:'false',
hasError:false,
accessToken:'',
        }
        this.singleUserUrl = "https://api.instagram.com/v1/users/self/?access_token=";
    }

    iconClickHandler = (e) => {
        this.setState({
            backgroundColor: 'red'
        })
    }

    commentOnChangeHandler = (e) => {
        this.setState({comment: e.target.value});
    }

    addCommentOnClickHandler = (e) => {
        this.setState({addedComment :this.state.comment});

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
   // const { classes } = this.props;
   
    return(<div>
               <div><Header heading="Image Viewer" noSearchBox="box" baseUrl={this.props.baseUrl}
                loggedIn={this.state.loggedIn} accc={this.state.access_token} prof={this.singleUserUrl}
                searchDisplay="dispSearch" iconDisplay="dispBlock" onClick/></div>
        <div className= "homeBody">
        <GridList cellHeight={"auto"}  cols={2}>
        {this.state.userphotos.map(photo=>(
            <GridListTile key={"grid" + photo.id} cols={photo.cols|| 1}>
                <Grid container className={classes.root} spacing={10}>
                    <Grid item>
                    <Card className={classes.card}>
                    <CardHeader 
                             avatar={
                                 <Avatar className={classes.profileAvatar}>
                                    <img src={logo}/>
                                    </Avatar>
                              }
                                title={this.state.ownerInfo.username}
                                subheader={photo.created_time}
                    />
                    <CardContent>
                            <img src={photo.images.low_resolution.url} alt={photo.caption.text} className="imageProp" />
                            <hr/>
                            <Typography variant="h6">{(photo.caption.text).split(/\#/)[0]}</Typography>
                            {photo.tags.map(tag=><span className="hash-tags">#{tag} </span>)}
                            <br></br>
                            <br></br>
                            <div className="likesProp">
                               <Typography variant="h5" >
                                    <FavoriteBorderIcon onClick={() => this.iconClickHandler} />
                                     {photo.likes.count} Likes</Typography></div>
                                    <br /><br />
                                <FormControl >
                                    <FormHelperText className={this.state.addComment}><Typography> {this.state.addedComment}</Typography></FormHelperText>
                                </FormControl> <br></br>
                                <FormControl>
                                    <InputLabel htmlFor="comment">Add a Comment</InputLabel>
                                     <Input id="comment" type="text" onChange={this.commentOnChangeHandler} />
                                </FormControl>
                                    <Button id="addedcomment" variant="contained" color="primary" onClick={this.addCommentOnClickHandler}>ADD</Button>
                                

                    </CardContent>


                    </Card>

                    </Grid>
                </Grid>         
                
            )</GridListTile> ))}
            </GridList>

        </div>              
    </div>) 
}
}
export default Home;
