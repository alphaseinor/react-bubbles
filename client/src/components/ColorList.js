import React, { useState } from "react";
import axiosWithAuth from './AxiosWithAuth'

const initialColor = {
  color: "black",
  code: { hex: "#" }
};

const ColorList = ({ colors, updateColors, colorUpdated, setColorUpdated }) => {
  //console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e, id) => {
    e.preventDefault();
    console.log("e and id",e,id)
    axiosWithAuth(localStorage.getItem('token'))
      .put(`http://localhost:5000/api/colors/${id}`, colorToEdit)
      .then(result => {
        console.log(result.data);
        setColorToEdit(result.data);
      })
      .catch(err => {
        console.log(err);
      })
    setEditing(false);
    setColorUpdated(!colorUpdated)
  };

  const deleteColor = color => {
    axiosWithAuth(localStorage.getItem('token')).delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
    setColorUpdated(!colorUpdated)
  };

  const addColor = color => { 
    console.log(color)
    axiosWithAuth(localStorage.getItem('token')).post('http://localhost:5000/api/colors', color)
      .then(result => {
        console.log(result.data);
      })
      .catch(err => {
        console.log(err);
      })
      setColorUpdated(!colorUpdated)
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
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
        <form onSubmit={(event) => saveEdit(event, colorToEdit.id)}>
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
      <div className="addColorForm">
        <h3>Add a Color</h3>
        <form
          onSubmit={(e)=>{
            e.preventDefault()
            addColor(colorToAdd)
          }}
        >
          <input 
            onChange={e => 
              setColorToAdd({
                ...colorToAdd, 
                color:e.target.value
              })
            }
            value={colorToAdd.color}
          />
          <input 
            onChange={e => 
              setColorToAdd({
                ...colorToAdd, 
                code:{ hex: e.target.value}
              })
            }
            value={colorToAdd.code.hex}
          />
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
