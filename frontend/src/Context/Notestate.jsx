import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const Notestate = (props)=>{
  

    const host ="http://localhost:3000"
    const notesInitializer = []  
    const [notes, setNotes] = useState(notesInitializer)

    //Get notes

    const getNotes =  async() =>{
      //API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method: 'GET',
        headers: {
          'Content-type': "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        
      });
      const json = await response.json(); 
      setNotes(json)
      
    }
    

    //Add notes

    const addNote =  async(title, description, tag) =>{
    //API call
    const response = await fetch(`${host}/api/notes/addnote`,{
      method: 'POST',
      headers: {
        'Content-type': "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json();
    setNotes(notes.concat(note)); 
    
    }

    

    // Delete note
    const deleteNote = async(id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-type': "application/json",
          "auth-token": localStorage.getItem('token')
        },
        
      });
      const json = await response.json();
      
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
      
      

    }
    // Edit note
    const editNote = async(id, title, description, tag)=>{
      //API call
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`,{
        method: 'PUT',
        headers: {
          'Content-type': "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const json =  await response.json();
      
      

      let editTheNotes = JSON.parse(JSON.stringify(notes))
      //logic to edit in client
      for (let index = 0; index < editTheNotes.length; index++) {
        const element = notes[index];
        if(element._id=== id){
          editTheNotes[index].title = title;
          editTheNotes[index].description = description;
          editTheNotes[index].tag = tag;
          break
          
        }
        setNotes(editTheNotes)
        
        
      }
      

    } 

  

    return(
    <noteContext.Provider value={{notes, getNotes, addNote, deleteNote, editNote}}>
        {props.children}

    </noteContext.Provider>
    )

    
}

export default Notestate;