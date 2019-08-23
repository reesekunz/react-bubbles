import React from "react";
import axios from "axios";

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
      <div>
        <h2>Log in</h2>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.loginCredentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.loginCredentials.password}
            onChange={this.handleChange}
          />
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
