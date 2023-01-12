import React,{useContext, useEffect} from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
  const a = useContext(noteContext);  // We can use context by importing noteContext
  // useEffect(()=>{   // This also work
  //   a.update();
  // },[])
  a.update();
  return (
    <div>
      His name is {a.state.name} and he is in class {a.state.class}
    </div>
  )
}

export default About
