import React, { useContext, useState } from 'react'
import {NoteContext} from '../context/CreateContext'
import { AlertContext } from '../context/CreateContext';

const AddNote = () => {
    const context1 = useContext(AlertContext);
    const { showAlert } = context1;
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag:""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        showAlert("Note Added Successfullly", "success")
        setNote({title: "", description: "", tag:""})
       

    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    
    return (

        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-6 mt-10 text-blue-600'>Write a Note</h1>
            <form className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm" id="title" name="title" value={note.title} onChange={onChange} placeholder='Should be atleast 3 characters' />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50" id="description" name="description" value={note.description} rows="3" onChange={onChange} placeholder='Should be atleast 10 characters'></textarea>                </div>
                <div>
                    <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Tag</label>
                    <input className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length<3 || note.description.length<10} type="submit" className="disabled:bg-gray-500 w-full sm:w-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
