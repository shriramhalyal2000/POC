import React from 'react'

const Noteitem = (props) => {
    const { note, updateNote,deletecurnote } = props;
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div className="col">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 mt-1 border-1 border-gray-300  m-2">
                <div className="p-4">
                    <h5 className="text-xl font-semibold mb-2">Title : {capitalize(note.title)}</h5>
                    <p className="text-gray-700 mb-2">Description : {capitalize(note.description)}</p>
                    <p className="text-gray-600 mb-4">Tag : {note.tag === "" ? "General" : note.tag}</p>
                    <p className="text-gray-600 mb-4"></p>
                    <div className="flex items-center">
                        <i className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer hover:text-blue-600" onClick={() => { updateNote(note) }}></i>
                        <i className="far fa-trash-alt mx-4 text-red-500 cursor-pointer hover:text-red-600" onClick={()=>{ deletecurnote(note) }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem