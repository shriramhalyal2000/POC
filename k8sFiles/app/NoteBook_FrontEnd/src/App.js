import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/home';
import About from './components/about';
import NoteState from "./context/NotesState";
import AlertProvider from "./context/AlertContext";
import Signup from "./components/Signup";
import Login from "./components/login";
import Alert from "./components/Alert";
import NotFound from "./components/NotFound";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
function App() {

  return (
    <>
      <Router>
        <AlertProvider>
        <NoteState>
          <Alert/>
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/about" Component={About} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/signup" Component={Signup} />
            <Route exact path="/forgot-password" Component={ForgotPassword} />
            <Route exact path="/reset-password/:id/:token" Component={ResetPassword} />
            <Route path="*" Component={NotFound} /> 
            </Routes>
        </NoteState>
        </AlertProvider>
      </Router >

    </>
  );
}

export default App;
