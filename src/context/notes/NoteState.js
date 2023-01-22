import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "63b69f8209f38b8363ace507b",
      user: "63b24acba3c661560081e598",
      title: "My Title1",
      description: "Please wake up early1",
      tag: "personal1",
      date: "2023-01-05T09:59:30.621Z",
      __v: 0,
    },
    {
      _id: "63c24c15bfb2832bb30898f37",
      user: "63b24acba3c661560081e598",
      title: "My Title 3",
      description: "Please wake up early 3",
      tag: "personal1",
      date: "2023-01-14T06:30:45.764Z",
      __v: 0,
    },
    {
      _id: "63c24c15bfb2832bb30898f371",
      user: "63b24acba3c661560081e598",
      title: "My Title 3",
      description: "Please wake up early 3",
      tag: "personal1",
      date: "2023-01-14T06:30:45.764Z",
      __v: 0,
    },
    {
      _id: "63c24c15bb2832fbb30898f371",
      user: "63b24acba3c661560081e598",
      title: "My Title 3",
      description: "Please wake up early 3",
      tag: "personal1",
      date: "2023-01-14T06:30:45.764Z",
      __v: 0,
    },
    {
      _id: "63c24c15bb2832bfb30898f371",
      user: "63b24acba3c661560081e598",
      title: "My Title 3",
      description: "Please wake up early 3",
      tag: "personal1",
      date: "2023-01-14T06:30:45.764Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  
  // Add Note
    const addNote = (title,description,tag) =>{
      console.log("Add Notes....")
      // TODO API call
      const note = {
        _id: "63c24c235bb2832bfb30898f371",
        user: "63b24acba3c661560081e598",
        title: title,
        description: description,
        tag: tag,
        date: "2023-01-14T06:30:45.764Z",
        __v: 0,
      };

       setNotes(notes.concat(note))
    }
  // Delete Note

  const deletNote = () =>{

  }

  // Edit Note
  const editNote = () =>{

  }
  return (
    <NoteContext.Provider value={{notes, addNote, deletNote,editNote}}>
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
