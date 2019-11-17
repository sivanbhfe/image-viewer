import React, {Component} from 'react';
import './Login.css';
import Header from '../../common/Header';

//Materal UI components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';


class Login extends Component {
	constructor() {
        super();
        this.state = {
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
	}
	loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });

        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                that.setState({
                    loggedIn: true
                });

                that.closeModalHandler();
            }
        });

        xhrLogin.open("POST", this.props.baseUrl + "auth/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);
    }
render(){
return(

<div >
	<div>
	<Header heading="Image Viewer"/><br />
	</div>
	<div className="card-container">
<Card className="cardStyle">
	<CardContent>
<		Typography variant="headline" component="h2">
		LOGIN
		</Typography>
		<FormControl required>
			<InputLabel htmlFor="username">Username</InputLabel>
			<Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
			<FormHelperText className={this.state.usernameRequired}>
				<span className="red">required</span>
			</FormHelperText>
		</FormControl>
		<br /><br />
		<FormControl required>
			<InputLabel htmlFor="loginPassword">Password</InputLabel>
			<Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
			<FormHelperText className={this.state.loginPasswordRequired}>
				<span className="red">required</span>
			</FormHelperText>
		</FormControl>
		<br /><br />
		{this.state.loggedIn === true &&
			<FormControl>
				<span className="successText">
					Login Successful!
				</span>
			</FormControl>
		}
		<br /><br />
		<Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
	</CardContent>
</Card>
</div>
</div>)
}
}
export default Login;

