import React from "react";
import axios from "axios";

import bubblesImage from "./images/Bubbles.jpeg";

class Login extends React.Component {
  state = {
    loginCredentials: {
      username: "",
      password: ""
    }
  };

  handleChange = event => {
    this.setState({
      loginCredentials: {
        ...this.state.loginCredentials,
        [event.target.name]: event.target.value
      }
    });
  };

  login = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/login", this.state.loginCredentials)
      .then(response => {
        console.log("post request success", response);
        localStorage.setItem("token", response.data.payload);
      })
      .catch(error => console.log(error.response));
  };

  render() {
    return (
      <div className="container">
      {/* <img className="bubbles-image" src={bubblesImage} alt="my bubblesss (Finding Nemo voice)" /> */}
      <div className="log-in-form">
      <h2 className="bubbles-header">Welcome to our Bubbles App</h2>
      <div className="flex-login">
        <form onSubmit={this.login}>
          <div className="input">
        <h4 className="log-in-header">Sign-in</h4>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.loginCredentials.username}
            onChange={this.handleChange}
          />
          </div>
          <div className="input">
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.loginCredentials.password}
            onChange={this.handleChange}
          />
            </div>
            <div className="input">
          <button className="submit-button" type="submit">
            Submit
          </button>
          </div>
        </form>
        </div>
      </div>
      </div>
    );
  }
}

export default Login;
