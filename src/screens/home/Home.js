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
            userphotos: [] }
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
                <Grid container className={classes.root} spacing={14}>
                    <Grid item>
                    <Card className={classes.card}>
                    <img src={photo.images.low_resolution.url} alt={photo.text} className="imageProp" />

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