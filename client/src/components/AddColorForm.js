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
            onChange={this.handleChangeColor}
          />
          {/* Hex color code input  */}
          <h3>Hex Color Code</h3>
          <input
            type="text"
            name="hex code"
            placeholder="#e41032 "
            // value={this.state.initialColor.code}
            value={this.state.initialColor.code.hex}
            onChange={this.handleChangeHexCode}
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
