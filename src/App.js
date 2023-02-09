import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <NoteState>
      <Router>
        <NavBar/>
        <Alert message = "React is very easy to learn"/>
        <div className="container">
        <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;