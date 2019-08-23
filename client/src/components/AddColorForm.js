import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class AddColorForm extends React.Component {
  constructor() {
    super();
    this.state = {
      initialColor: {
        color: "",
        code: { hex: "" }
      }
    };
  }

  handleChangeColor = event => {
    this.setState({
        initialColor: {
        ...this.state.initialColor,
        [event.target.name]: event.target.value
      }
    });
  };

  handleChangeHexCode = event => {
    this.setState({
        initialColor: {
        ...this.state.initialColor,
        code: { hex: event.target.value }
      }
    });
  };

  addColor = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/colors", this.state.initialColor)
      .then(response => {
        console.log("add color post request success", response);
      })
      .catch(error => console.log("error, sorry dood", error.response));
  };

  render() {
    console.log("initialColor state", this.state.initialColor);
    console.log("initialColor state", this.state.initialColor.color);
    // console.log("initialColor state", this.state.initialColor.code);
    console.log("initialColor state", this.state.initialColor.code.hex);

    return (
      <div className="add-color-container">

        <form onSubmit={this.addColor}>
<div className="add-color-form">
          {/* Color input  */}
          <h1>Add Color Form</h1>
          <h3>Color</h3>
          <div className="add-input">
          <input
            type="text"
            name="color"
            placeholder="color name"
            value={this.state.initialColor.color}
            onChange={this.handleChangeColor}
          />
           </div>
          {/* Hex color code input  */}
          <h3>Hex Color Code</h3>
          <div className="add-input">
          <input
            type="text"
            name="hex code"
            placeholder="#e41032 "
            // value={this.state.initialColor.code}
            value={this.state.initialColor.code.hex}
            onChange={this.handleChangeHexCode}
          />
          </div>
          <button className="add-button" type="submit">
            Add Color
          </button>
        </div>
        </form>
      </div>
    );
  }
}

export default AddColorForm;
