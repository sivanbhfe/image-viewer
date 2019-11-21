import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/Header';


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
    return(<div>
        <div><Header heading="Image Viewer" searchDisplay="dispSearch" iconDisplay="dispBlock"/></div>
        {this.state.userphotos.map(photo=>(<span key={"grid" + photo.id}><p><img src={photo.images.low_resolution.url}></img></p></span>))}
    </div>) 
}
}
export default Home;