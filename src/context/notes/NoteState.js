import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:3001";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const fetchAllNotes = async () => {
    console.log("fetchAllNotes");
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMjRhY2JhM2M2NjE1NjAwODFlNTk4In0sImlhdCI6MTY3MzA2ODUyMn0.KbAkHUXS9R6qLleCH7bJwo56g5iMgOir_nuiw9hXWXk",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add Note
  const addNote = async (title, description, tag) => {
    console.log("Add Notes....", title,tag);
    // TODO API call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMjRhY2JhM2M2NjE1NjAwODFlNTk4In0sImlhdCI6MTY3MzA2ODUyMn0.KbAkHUXS9R6qLleCH7bJwo56g5iMgOir_nuiw9hXWXk",
      },
      body: JSON.stringify({
        title,
        description,
        tag
      }),
    });
    const json = await response.json();
    console.log("Json : ",json);
  };

  // Delete Note
  const deleteNote = async (id) => {
    // TODO: Add Delete API
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMjRhY2JhM2M2NjE1NjAwODFlNTk4In0sImlhdCI6MTY3MzA2ODUyMn0.KbAkHUXS9R6qLleCH7bJwo56g5iMgOir_nuiw9hXWXk",
      },
    });
    const json = response.json();
    console.log("Json : " + json);

    console.log("Delete Note  id : ", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMjRhY2JhM2M2NjE1NjAwODFlNTk4In0sImlhdCI6MTY3MzA2ODUyMn0.KbAkHUXS9R6qLleCH7bJwo56g5iMgOir_nuiw9hXWXk",
      },
      body: JSON.stringify({
        id,
        title,
        description,
        tag
      }),
    });
    const json = await response.json();
    console.log("Updated Response :"+ json);

    let newNotes = JSON.parse(JSON.stringify(notes))
    // TODO : EDIT DATA
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
     
    }
    setNotes(newNotes)
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

// const s1 = {
//   "name" : "Kevin",
//   "class" : "8b"
// }

// const [state,setState] = useState(s1);
// const update = () =>{
// setTimeout(()=>{
//   setState({
//       "name" : "Hobert",
//       "class" : "10b"
//     })
// },1000);
// }
