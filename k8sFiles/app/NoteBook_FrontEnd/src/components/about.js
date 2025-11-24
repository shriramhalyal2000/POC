import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const About = () => {
    return (
        <>
            <Navbar />
            <div className='h-screen  flex justify-between flex-col '>
            <div className="px-4 py-8">
                <h1 className="text-4xl font-bold mb-6">About Notebook</h1>
                <p className="mb-6">Notebook is a powerful and user-friendly note-taking application designed to help you organize your thoughts, ideas, and information efficiently.</p>
                
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="mb-6">Our mission is to provide a seamless and intuitive platform for users to capture, store, and manage their notes across all devices.</p>
                
                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <ul className="list-disc list-inside mb-6">
                    <li>Secure user authentication</li>
                    <li>Create, edit, and delete notes</li>
                    <li>Cloud synchronization for access anywhere</li>
                    <li>More amazing feature will be added so stay tuned!</li>
                </ul>
                         
                <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back to Home</Link>
            </div>
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    <p>© {new Date().getFullYear()} Notebook. All rights reserved.</p>
                    <a href="https://github.com/SrinidhiPs11/NoteBook_FrontEnd" target="_blank" rel="noopener noreferrer" className="inline-block  mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>

                </div>
            </footer>
            </div>
        </>
    )
}

export default About