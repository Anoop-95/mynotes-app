import React, {useContext, useEffect, useRef, useState} from 'react'
import noteContext from "../Context/noteContext";
import Noteitem from './Noteitem';
import AddtheNote from './AddtheNote';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const Notes = (props) => {
    const context = useContext(noteContext);
    const Navigate = useNavigate();
    const {notes, getNotes, editNote} = context;
    useEffect(()=>{
      if(localStorage.getItem('token')) {
        getNotes();
      }
      else {
        Navigate("/login");
      }
    }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id:"", etitle: "", edescription:"", etag:""});  

  const updateNote=(currentNote)=>{
    ref.current.click();
    setNote({id: currentNote._id, etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag,})
  }

  const handleClick =(e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    toast.success("Updated successfully!");
  }

  const onChange=(e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  
  return (
    <>
      <div className='my-3'>
        <AddtheNote/>
        <div className='container'>
          {notes.length === 0 ? (
            <>
              <div className="d-flex justify-content-start align-items-end" style={{height: "50vh"}}>
                <img src="./Designer.jpeg" alt="empty-box" style={{width: "18rem", height: "18.5rem"}}/>
              </div>
              <h2 className='mx-5'>No notes to display</h2>
              <p className='mx-5'>Click on the plus icon to add a new note.</p>
            </>
          ) : (
            <>
              <h2 className='mx-5'>Your Notes</h2>
              <div className="d-flex flex-wrap justify-content-center align-items-center my-3" style={{gap: "0.75rem"}}>
                {notes.map((note)=>{
                  return <Noteitem note={note} updateNote={updateNote}  key={note._id}/>
                })}
              </div>
            </>
          )}
        </div>    
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required/>
                  <label htmlFor="etitle">Title</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                  <label htmlFor="edescription">Description</label>
                </div>
                <div className="form-floating">
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required/>
                  <label htmlFor="etag">Tag</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5 || note.etag.length<5} className="btn btn-primary" onClick={handleClick}>Update changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end my-3" style={{position: "fixed", bottom: "20px", right: "5px"}}>
        <button type="button" className="btn btn-primary mx-3 rounded-4" data-bs-toggle="modal" data-bs-target="#addNoteModal" style={{height:"50px", width:"50px"}}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </>
  )
}

export default Notes
