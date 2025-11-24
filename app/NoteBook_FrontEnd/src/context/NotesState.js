import { useState } from "react";
import {NoteContext} from "./CreateContext";

const NoteState = (props) => {
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const host = process.env.REACT_APP_HOST_URI;



  //function to fetch notes
  const getNotes = async (order) => {
    //api call for fetching notes
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        "token": localStorage.getItem('token')
      }
    });
    const json1 = await response.json()
    if(order === 'Oldest'){
      setNotes(json1)
    }else{
      setNotes(json1.reverse())
    }
  }

  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json()
    setNotes(notes.concat(note))
  }
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
        "token": localStorage.getItem('token')
      }
    });
    
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);

  }
  
  const deleteAllNotes = async (id) => {
    await fetch(`${host}/api/notes/deleteallnotes`, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
        "token": localStorage.getItem('token')
      }
    });
    
    setNotes([]);

  }
  const editNote = async (id, title, description, tag) => {
    // API Call 
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
        "token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
   
   

    // Logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes,deleteAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

