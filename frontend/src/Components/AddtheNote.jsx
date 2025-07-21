import React, {useContext, useState, useRef} from 'react'
import noteContext from '../Context/noteContext';
import toast from 'react-hot-toast';

const Addnote = (props) => {

  const context = useContext(noteContext);
  const {addNote} = context;
  const refClose = useRef(null)
  const [note, setNote]=useState({ title: "", description:"", tag:""})

  const handleClick =(e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    refClose.current.click(); 
    setNote({ title: "", description: "", tag: "" }); 
    toast.success("Note added successfully!");

  }

  const onChange=(e)=>{
    setNote({...note, [e.target.name]: e.target.value})
    

  }



  return (
  <div>
    



<div className="modal fade" id="addNoteModal" tabIndex="-1" aria-labelledby="addNoteLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="addNoteLabel">Add your Notes</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       
        <div className="container">
          
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required/>
            <label htmlFor="title">Title...</label>
          </div>
          <div className="form-floating mb-3">
            <textarea type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required  style={{height: "200px"}}></textarea>
            <label htmlFor="description">Description...</label>
          </div>
          <div className="form-floating">
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required/>
            <label htmlFor="tag">Tag...</label>
          </div>
          
        </div>




      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
        <button disabled={note.title.length<5 || note.description.length<5 || note.tag.length<5} className="btn btn-primary my-3" type="submit" onClick={handleClick}>Add note</button>
      </div>
    </div>
  </div>
</div>
  </div>
  )
}

export default Addnote
