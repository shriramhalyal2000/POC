const express = require("express");
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


var fetchuser = require('../middleware/fetchuser');

// get all notes end point
router.get('/fetchnotes', fetchuser, async (req, res) => {       //using fetch user as login is required, notes are specific to users.
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured,Please try again after some time");
    }
})


// ADD notes end point
router.post('/addnote', fetchuser,
    body('title', 'Enter a valid Title').isLength({ min: 3 }), [
    body('description', 'Description must be atleast 10 charaters').isLength({ min: 10 })],
    async (req, res) => {
        try {

            //using fecth user as login is required, notes are specific to users
            const { title, description, tag } = req.body
            const errors = validationResult(req);         // If there are errors, return Bad request and the errors
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({ title, description, tag, user: req.user.id })
            const savednote = await note.save()
            res.json(savednote)
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured,Please try again after some time");
        }
    })

// update note endpoint 
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send("Note not found") }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not an authorised User Note");
            }
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json(note);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured,Please try again after some time");
        }

    })


//delete note endpoint 
router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {
        try {

            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send("Note not found") }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not an authorised User Note");
            }
            note = await Note.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Note has been successfully deleted" });
        } catch (error){
            console.error(error.message);
            res.status(500).send("Some Error occured,Please try again after some time");
        }
    })

    router.delete('/deleteallnotes',fetchuser,async(req,res)=>{
        try{
            let note = await Note.deleteMany({user:req.user.id});
            res.json({"Success":"All Notes have been successfully deleted"});
        }catch(error){
            console.error(error.message);
            res.status(500).send("Some Error occured,Please try again after some time");
        }
    })





module.exports = router