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
import hearticon from '../../assets/hearticon.svg';
import moment from "moment";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';


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
            ownerInfo:{
                username: "upgrad_sde"
            },
            addComment:"dispComment"
        }
    }

    commentOnChangeChangeHandler = (e) => {
        this.setState({imagecomment: e.target.value});
    }

    addCommentOnClickHandler = (e) => {
        this.setState({addedComment :this.state.imagecomment});

    }


    componentWillMount() {
      let data = null;
        let baseUrl="https://api.instagram.com/v1/users/self/media/recent?access_token=";
        let xhr = new XMLHttpRequest();
        let that = this;
        let access_token=this.props.access;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    userphotos: JSON.parse(this.responseText).data
                });
                //alert(that.state.userphotos);
            }
        });

       // xhr.open("GET", baseUrl + access_token);
       xhr.open("GET", baseUrl + '8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784');
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

render(){
   // const { classes } = this.props;
   
    return(<div>
        <div><Header heading="Image Viewer" searchDisplay="dispSearch" iconDisplay="dispBlock" onClick/></div>
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
                            <div className="likesProp">
                               <Typography variant="h5" >
                                    <img src={hearticon} alt={"heartlogoTransparent"}   onClick={() => this.iconClickHandler} />
                                    {photo.likes.count} Likes</Typography></div>
                                <br /><br />
                                <FormControl >
                                    <FormHelperText className={this.state.addComment}><div><Typography>: {this.state.addedComment}</Typography></div></FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="comment">Add a Comment</InputLabel>
                                     <Input id="comment" type="text" onChange={this.commentOnChangeChangeHandler} />
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
