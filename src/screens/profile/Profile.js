import React, {Component} from 'react';
import './Profile.css';
import Header from '../../common/header/Header';

//Material-UI Components
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Create from "@material-ui/icons/Create";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import { classes } from 'istanbul-lib-coverage';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import logo from '../../assets/logo.png';
import moment from "moment";


const styles = theme => ({
  bigAvatar: {
    margin: 10,
    width: 50,
    height: 50
  },
  card: {
      maxWidth: 145
    },
  avatar: {
        backgroundColor: red[500],
      },
  fab: {
    margin: 8
  },
  
  paper: {
    position: "absolute",
    width: 250,
    backgroundColor: "white",
    padding: 16,
    outline: "none",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  },
  
  paper_big: {
    position: "absolute",
    width: 600,
    backgroundColor: "white",
    padding: 16,
    outline: "none",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  }
  
  
});

class Profile extends Component {
constructor(props) {
    super(props);
    this.state = {
        userprofile: [],
        access_token: sessionStorage.getItem("access-token"),
        profile_picture: "",
        username: "",
        media: 0,
        follows: 0,
        followed_by: 0,
        full_name: "",
        userPosts: [],
        editNameOpen: false,
        fullnameRequired: "dispNone",
        selectedPost: null,
        selectedIndex: -1,
        newComment: "",
        updateFullName: "",
        postOpen: false,
         matchingsearch:null,
            searched:"NO",
            username:"",
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
   // this.access_token=sessionStorage.getItem("access-token")
}
componentWillMount() {
        let data_UserProfile = null;
        let baseUrl=this.props.baseUrl;
        let xhr_UserProfile = new XMLHttpRequest();
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
      xhr_UserProfile.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
                const data = JSON.parse(this.responseText).data;
                that.setState({
                    // userprofile: JSON.parse(this.responseText).data
                    profile_picture: data.profile_picture,
                    username: data.username,
                    media: data.counts.media,
                    follows: data.counts.follows,
                    followed_by: data.counts.followed_by,
                    full_name: data.full_name
                });
                
          }
      });
      xhr_UserProfile.open("GET", this.singleUserUrl + access_token);
      xhr_UserProfile.setRequestHeader("Cache-Control", "no-cache");
      xhr_UserProfile.send(data_UserProfile);

      //Gets User Posts
      let data_UserPosts = null;
      let xhr_UserPosts = new XMLHttpRequest();
      xhr_UserPosts.addEventListener("readystatechange", function() {

      if (this.readyState === 4) {
        that.setState({ 
          userPosts:JSON.parse(this.responseText).data
         });
         
      }
      });
    xhr_UserPosts.open("GET",this.props.baseUrl+access_token);
    //xhrUserPosts.setRequestHeader("Cache-Control", "no-cache");
    xhr_UserPosts.send(data_UserPosts);
  }  
  else {
   this.props.history.push({pathname:'/'});
  }
}


EditFullNameModalOpenHandler = () => {
    this.setState({
      updateFullName: this.state.full_name,
      editNameOpen: true
    });
  };

EditFullNameModalCloseHandler = () => {
    this.setState({
      editNameOpen: false,
      fullnameRequired: "dispNone"
    });
  };

  
  
  
  ClickUpdateNameHandler = () => {
    this.state.updateFullName === ""
      ? this.setState({ fullnameRequired: "dispBlock" })
      : this.setState({ fullnameRequired: "dispNone" });
    if (this.state.updateFullName === "") {
      return;
    } else {
      this.setState({ full_name: this.state.updateFullName });
    }
    this.setState({
      editNameOpen: false
    });
  };

  
  ChangeFullNameHandler = e => {
    this.setState({ updateFullName: e.target.value });
  };

  
  ClickPostImageHandler = (_id, _index) => {
    let _userPostItems = this.state.userPosts;
    this.setState({
      selectedPost: _userPostItems[_index],
      selectedIndex: _index,
      postOpen: true,
      newComment: ""
    });
  };

  
  ClickPostImageCloseHandler = () => {
    this.setState({
      selectedPost: null,
      postOpen: false,
      selectedIndex: -1
    });
  };

  
  ClickLikesHandler = () => {
    let _selectedPostItem = this.state.selectedPost;
    let _userPosts = this.state.userPosts;
    const _selectedIndex = this.state.selectedIndex;
    if (_selectedPostItem.user_has_liked) {
      _selectedPostItem.user_has_liked = false;
      _selectedPostItem.likes.count = _selectedPostItem.likes.count + 1;
    } else {
      _selectedPostItem.user_has_liked = true;
      _selectedPostItem.likes.count = _selectedPostItem.likes.count - 1;
    }

    _userPosts[_selectedIndex] = _selectedPostItem;

    this.setState({
      selectedPost: _selectedPostItem,
      userPosts: _userPosts
    });
  };

  
  inputAddCommentHandler = e => {
    this.setState({ newComment: e.target.value });
  };

  
  AddCommentHandler = () => {
    if (this.state.newComment === "") {
      return;
    } else {
      let _selectedPostItem = this.state.selectedPost;
      _selectedPostItem.comments["data"] =
        _selectedPostItem.comments["data"] || [];
      _selectedPostItem.comments["data"].push({
        id: _selectedPostItem.comments["data"].length + 1,
        comment_by: this.state.username,
        comment_value: this.state.newComment
      });

      let _userPosts = this.state.userPosts;
      const _selectedIndex = this.state.selectedIndex;
      _userPosts[_selectedIndex] = _selectedPostItem;

      this.setState({
        selectedPost: _selectedPostItem,
        userPosts: _userPosts,
        newComment: "",
       
      });
    }
  };

 heartClickHandler = (photoId, photoLikeIndex) => {


    let photolistlike = this.state.userphotos;
    let matchingsearchlike = this.state.matchingsearch;
    if(photolistlike !== null && photolistlike.length > 0){

        // Updating main array
        let postWithLike =  photolistlike.map((photoPostlike,photoIndex) => {
            if(photoPostlike.id === photoId){
                if (photoPostlike.user_has_liked) {
                    photoPostlike.user_has_liked = false;
                    photoPostlike.likes.count = (photoPostlike.likes.count) + 1;
                } else {
                    photoPostlike.user_has_liked = true;
                    photoPostlike.likes.count = (photoPostlike.likes.count) - 1;
                }
            } else {}
            return photoPostlike;
        });
        
         //  Search key matching array
        if(matchingsearchlike !== null && matchingsearchlike.length > 0) {
//Logic to be reversed if search function is triggered. Otherwise it overwrites it's own values
if(this.state.searched==="NO"){
            if(matchingsearchlike[photoLikeIndex].user_has_liked ) {
                
                matchingsearchlike[photoLikeIndex].user_has_liked = false;
                matchingsearchlike[photoLikeIndex].likes.count = (matchingsearchlike[photoLikeIndex].likes.count) + 1;
            } else {
                matchingsearchlike[photoLikeIndex].user_has_liked = true;
                matchingsearchlike[photoLikeIndex].likes.count = (matchingsearchlike[photoLikeIndex].likes.count) - 1;
            }
        } else {
            if(matchingsearchlike[photoLikeIndex].user_has_liked===false) {
                
                matchingsearchlike[photoLikeIndex].user_has_liked = false;
                matchingsearchlike[photoLikeIndex].likes.count = (matchingsearchlike[photoLikeIndex].likes.count);
            } else {
                matchingsearchlike[photoLikeIndex].user_has_liked = true;
                matchingsearchlike[photoLikeIndex].likes.count = (matchingsearchlike[photoLikeIndex].likes.count);
            }
        }
        }
        this.setState({
            userphotos: postWithLike,
            matchingsearch:matchingsearchlike
        });
   }
}

addCommentOnClickHandler = (photoId, photoIndex) => {
  //  alert((this.title).childNodes[0].value);
    const inputcomment = document.getElementById('comment'+photoId).value;
    
    if (inputcomment === '') {
        return;
    } else {
        let photolist = this.state.userphotos;
        if(photolist !== null && photolist.length > 0){
        
    //    alert(photolist);
    //  Main array update
        let postsWithComment =  photolist.map((photoPost,index) => {
            if(photoPost.id === photoId){
                photoPost.comments['data'] = photoPost.comments['data'] || [];
                photoPost.comments['data'].push({
                    id: (photoPost.comments['data'].length + 1),
                    commentUser: this.state.username,
                    commentInput: inputcomment
                });
            }
            return photoPost;
        });

    //  Search key matching array
        let matchingsearch = this.state.matchingsearch;
//No need to run this if search function is triggered. Otherwise it creates duplicate entries
if(this.state.searched==="NO"){
if(matchingsearch!==null && matchingsearch.length>0){
            matchingsearch[photoIndex].comments['data'] = matchingsearch[photoIndex].comments['data'] || [];
            matchingsearch[photoIndex].comments['data'].push({
                    id: (matchingsearch[photoIndex].comments['data'].length + 1) ,
                    commentUser: this.state.username,
                    commentInput: inputcomment
            });
    } }else {
       
    }

                    this.setState({
                        userphotos: postsWithComment,
                        matchingsearch:matchingsearch
                    });
 //   alert(this.state.userphotos);
//    innerspan.innerText= innerspan.innerText + "\n"+ "\n"+ username+": "+inputcomment.value;
    document.getElementById('comment'+photoId).value="";
    }
}
}

render(){
    const { classes } = this.props;
    return(
    <div>
        <div>
            <Header heading="Image Viewer" 
            loggedIn={this.state.loggedIn} 
            accc={this.state.access_token} 
            prof={this.singleUserUrl} 
            noSearchBox="dispNone" 
            searchDisplay="dispSearch" 
            iconDisplay="dispBlock" />
        </div>
        {this.state.userprofile.map(profile=>
            (<span key={"grid" + profile.id}>
                <p><img src={profile.images.low_resolution.url}></img></p></span>))}
        
        <Container fixed>
          <Grid container spacing={3} alignItems="center" style={{ justifyContent: "center" }} >
            <Grid item>
                <Avatar className={classes.bigAvatar} alt={this.state.username} src={this.state.profile_picture} className={classes.bigAvatar} />
            </Grid>

          <Grid item><Typography variant="h6" component="h6"> {this.state.username} </Typography>
           <Grid container spacing={3} alignItems="center" justify="space-between"  >
           <Grid item><Typography variant="subtitle2">Posts: {this.state.media}</Typography></Grid> 
           <Grid item><Typography variant="subtitle2">Follows: {this.state.follows}</Typography></Grid> 
           <Grid item><Typography variant="subtitle2">Followed By: {this.state.followed_by}</Typography></Grid>
           </Grid>       
           <Grid container spacing={2}  alignItems="center" justify="flex-start" >
           <Grid item><Typography variant="h6">{this.state.full_name}</Typography></Grid>
           <Grid item><Fab color="secondary"  aria-label="Edit"  className={classes.fab}  onClick={this.EditFullNameModalOpenHandler}>      
           <Create /> </Fab>
           <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.state.editNameOpen} onClose={this.EditFullNameModalCloseHandler} >
           <div className={classes.paper}><Typography variant="h6" id="modal-title" className="modal-heading"> Edit  </Typography> 
           <FormControl required className="formControl">
                <InputLabel htmlFor="username">Full Name </InputLabel>
                    <Input id="userfullname" type="text" onChange={this.ChangeFullNameHandler} value={this.state.updateFullName}  /> 
                    <FormHelperText className={this.state.fullnameRequired}> <span className="red">Required</span> </FormHelperText>
            </FormControl>             
            <br />
            <br />
            <Button  variant="contained" color="primary" style={{ width: 10 }} onClick={this.ClickUpdateNameHandler} > UPDATE </Button> 
            </div>  
            </Modal>        
            </Grid>          
            </Grid>    
            </Grid>
          </Grid>
           

          <GridList cellHeight={320} cols={3}>
            {this.state.userPosts.map((post, index) => (
              <GridListTile key={post.id} className="grid-content"
               onClick={() => this.ClickPostImageHandler(post.id, index)}
              >
                <img src={post.images.low_resolution.url} alt={post.caption.text} />
                </GridListTile>    
            ))}      
          </GridList>
          {this.state.selectedPost !== null ? (
            <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.state.postOpen} onClose={this.ClickPostImageCloseHandler}>
              <div className={classes.paper_big}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <img width="100%" src={ this.state.selectedPost.images.standard_resolution.url} alt={this.state.selectedPost.caption.text.split("\n")[0]}/>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={3} alignItems="center" justify="flex-start"  >
                    <Grid item>  
                     <Avatar src={this.state.selectedPost.user.profile_picture} alt={this.state.selectedPost.user.username} />
                     </Grid>
                      <Grid item><Typography variant="subtitle2">{this.state.selectedPost.user.username}</Typography>
                      </Grid>
                    </Grid>
                    <Divider light />
                    <Grid container spacing={3} alignItems="center" justify="flex-start"  >
                    <Grid item><Typography variant="caption"> {this.state.selectedPost.caption.text.split("\n")[0]}</Typography>
                     </Grid>
                    </Grid>
                    <Grid container spacing={3} alignItems="center" justify="flex-start"  >
                      <Grid item>
                        {(this.state.selectedPost.tags || []).map((tag, i) => {
                          return (<Typography key={tag} variant="caption" color="primary">{" "}
                              #{tag} 
                             </Typography>
                          );
                        })}
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center" justify="flex-start"  >
                    <Grid item className="min-height-comments-box">
                        {(this.state.selectedPost.comments.data || []).map((comment, i) => {
                            return (
                              <Typography key={comment.id} variant="caption" display="block">
                              <strong>{comment.comment_by} :</strong>{" "}
                                {comment.comment_value}
                              </Typography>
                            );
                          }
                        )}
                      </Grid>
                    </Grid>
                {/*<Grid container spacing={1} alignItems="center" justify="flex-start"  >
                    <Grid item>
                        {this.state.selectedPost.user_has_liked ? 
                          <FavoriteBorder className={'greyLike'} 
                                    onClick={this.ClickLikesHandler} 
                         />
                         :
                          <Favorite className={'redLike'} 
                           onClick={this.ClickLikesHandler} 
                          />                                                                                                       
                         }   
                           {/*  <Favorite
                          className={
                            this.state.selectedPost.user_has_liked ? "greyLike": "redLike"
                          }
                          onClick={this.ClickLikesHandler}
                        />*/}
                      </Grid>
                      <Grid item>
                        <Typography variant="caption">{this.state.selectedPost.likes.count} likes </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} alignItems="center" justify="flex-start"  >
                    <Grid item>
                        <FormControl className="formControl">
                          <InputLabel htmlFor="addcomment">Add a comment{" "}</InputLabel>
                          <Input id="addcomment" type="text" onChange={this.inputAddCommentHandler} value={this.state.newComment}/>
                          </FormControl>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="primary" onClick={this.AddCommentHandler}>ADD</Button>
                         </Grid>
                    </Grid>
                  </Grid>
                </Grid>*/}
                </Grid>
                </Grid>
                <GridList cellHeight={"auto"}  cols={3}>
        {(this.state.matchingsearch || []).map((photo,index)=>(
            <GridListTile key={"grid" + photo.id} cols={photo.cols|| 1}>
                <Grid container className={classes.root} spacing={10}>
                    <Grid item>
                    <Card className={classes.card}>
                    <CardHeader 
                             avatar={
                                 <Avatar className={classes.bigAvatar}>
                                    <img src={logo}/>
                                    </Avatar>
                              }
                             //   title={photo.caption.from.username}
                             //   subheader={ moment(photo.caption.created_time,"x").format("DD MMM YYYY hh:mm a")}
                             //subheader={moment.unix(photo.caption.created_time).format("DD/MM/YYYY HH:mm:ss")}
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
                                {photo.user_has_liked ? 
                                                    <FavoriteBorder className="noLike" 
                                                                    onClick={this.heartClickHandler.bind(this, photo.id, index)} 
                                                    />
                                                    :
                                                    <Favorite className="Liked" 
                                                              onClick={this.heartClickHandler.bind(this, photo.id, index)} 
                                                    />                                                                                                       
                                                }</Typography>
                                                <div className="likeCount">
                                                   <span >{(photo.likes.count)} likes</span>
                                                    </div>
                                            </div>
                                           <div>
                                           <Grid >
	                                        <Grid >
		                                        {(photo.comments.data || []).map((comment) => {
			                                    return <Typography key={comment.id}>
				                                            <span className="userNameSpan"><b>{comment.commentUser} :</b></span><span className="commenttext"> {comment.commentInput}</span>
                                                        </Typography>
                                                })}
                                            </Grid>
                                        </Grid> 
                                <FormControl >
                                    <FormHelperText id={'formhelper'+photo.id}className={this.state.addComment}><span id={"innerspan"+photo.id} ></span></FormHelperText>
                                </FormControl> <br></br>  <br></br>
                                <FormControl>   
                                    <InputLabel htmlFor="comment">Add a Comment</InputLabel>
                                     <Input id={"comment"+photo.id} type="text"  />
                                </FormControl>
                                    <Button id={"addcomment"+photo.id} variant="contained" color="primary" onClick={this.addCommentOnClickHandler.bind(this,photo.id,index)}>ADD</Button>
                                </div>
                    </CardContent>
                    </Card>
                    </Grid>
                </Grid>         
                
            )</GridListTile> ))}
            </GridList>
              </div>
            </Modal>
          ) : (
            ""
          )}
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);

