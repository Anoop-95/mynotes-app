import React, {useContext} from 'react'
import noteContext from '../Context/noteContext';
import { toast } from 'react-hot-toast';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context
    const {note, updateNote} = props;
  return (
    <div className='col-md-3'>

        
      
        <div className="card my-3" draggable="true" style={{width: "18rem", height: "15rem", overflow: "auto"}}>
             
            <div className="card-body">
                <div className="d-flex">
                    <h5 className="card-title">{note.title}</h5>
                     <div className="ms-auto d-flex">

                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)
                        toast.success("Deleted note successfully!");
                    }}></i>
                    <i className="fa-regular fa-pen-to-square mx-1 justify-content-end" onClick={()=>{updateNote(note)}}></i>
                     </div>

                </div>
                <hr />
                <p className="card-text"  >{note.description} </p>
                
            
            </div>
        </div>
    </div>
  )
}

export default Noteitem
