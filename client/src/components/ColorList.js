import React, { useState } from "react";
import axios from "axios";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log("colors data", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
console.log("colorToEdit", colorToEdit);
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = event => {
    event.preventDefault();
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(response => {
      console.log("saveEdit put request success from response.data", response.data)
      setColorToEdit(response.data);
      // props.history.push("/");
    })
    .catch(error => console.log(error.response));
};

  

const deleteColor = (color) => {
  axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(response => {
      console.log("deleteColor delete request success", response.data)
      updateColors(colors.filter(color => color.id !== color.id))
      // props.history.push("/")
    })
    .catch(error => console.log(error.response));
};
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
               Remove
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {/* * **[POST]** to `/api/colors`: creates a new color object. Pass the color as the `body` of the request (the second argument passed to `axios.post`). */}
    </div>
  );
};

export default ColorList;
