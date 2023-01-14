import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{
  return(
    <NoteContext.Provider value = {{state:"state",update : "update"}}>
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