import React from "react";
import axios from "axios";

import { axiosWithAuth } from "../utils/axiosWithAuth";

class AddColorForm extends React.Component {
  state = {
    initialColor: {
      color: "",
      code: { hex: "" }
    }
  };

  handleChange = event => {
    this.setState({
        initialColor: {
        ...this.state.initialColor,
        [event.target.name]: event.target.value
      }
    });
  };

  addColor = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/colors", this.state.initialColor)
      .then(response => {
        console.log("add color post request success", response)
      })
      .catch(error => console.log("error, sorry dood", error.response));
  };

  render() {
    return (
      <div>
        <h2>Add Color Form</h2>
        <form onSubmit={this.addColor}>
            {/* Color input  */}
            <h3>Color </h3> 
          <input
            type="text"
            name="color"
            placeholder="color name"
            value={this.state.initialColor.color}
            onChange={this.handleChange}
          />
          {/* Hex color code input  */}
          <h3>Hex Color Code</h3> 
          <input
            type="text"
            name="hexcode"
            placeholder="eg. #2e2c2e"
            // value={this.state.initialColor.code}
            value={this.state.initialColor.code.hex}
            onChange={this.handleChange}
          />
          <button className="submit-button" type="submit">
            Add Color
          </button>
        </form>
      </div>
    );
  }
}

export default AddColorForm;
