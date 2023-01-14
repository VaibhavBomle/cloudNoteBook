import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{
  const notesInitial = [
    {
      "_id": "63b69f820938b8363ace507b",
      "user": "63b24acba3c661560081e598",
      "title": "My Title1",
      "description": "Please wake up early1",
      "tag": "personal1",
      "date": "2023-01-05T09:59:30.621Z",
      "__v": 0
    },
    {
      "_id": "63c24c15bb2832bb30898f37",
      "user": "63b24acba3c661560081e598",
      "title": "My Title 3",
      "description": "Please wake up early 3",
      "tag": "personal1",
      "date": "2023-01-14T06:30:45.764Z",
      "__v": 0
    }
  ];

  const [notes,setNotes] = useState(notesInitial);
  return(
    <NoteContext.Provider value = {{notes,setNotes}}>
         {props.children}
    </NoteContext.Provider>
  )
}

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