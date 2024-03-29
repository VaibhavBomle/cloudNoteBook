import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, fetchAllNotes, editNote } = context;
  useEffect(() => {
    console.log("User Effect..........")
    fetchAllNotes();   // Need to fix this bug -> When we added note, newely added note data not populated
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });
  const updateNote = (currentNote) => {
    console.log("updateNote..........", note)
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    props.showAlert("Updated successfully","success")
  }

  const handleClick = (e) => {
    console.log("Updating the note : ", note)
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary-d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5} 
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    name="edescription"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    value={note.etag}
                    name="etag"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>
                  Edit Note
                </button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>You Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && `No notes to display`}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert = {props.showAlert} />;
        })}
      </div>
    </>
  );
};

export default Notes;
