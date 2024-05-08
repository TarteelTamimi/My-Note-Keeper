const express = require('express');
const Note = require('../models/note');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const newNote = new Note(req.body);
    await newNote.save()
        .then((savedNote) => {
            res.status(201).json({ message: "Note saved successfully!!", id: savedNote.id });
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
})

router.get('/', async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Note.countDocuments();
    const totalPages = Math.ceil(total / pageSize);

    Note.find().skip(skip).limit(pageSize)
        .then((notes) => {
            res.status(200).json({ notes, total, totalPages });
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
})

router.get('/:id', async (req, res, next) => {

    const id = req.params.id;
    Note.findById(id)
        .then((note) => {
            res.status(200).json({ note: note });
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
})

// router.get('/search', async (req, res, next) => {
//         const searchTerm = req.query.searchTerm;
//         const searchRegex = new RegExp(searchTerm, "i");

//         await Note.find({
//             $or: [
//                 { title: searchRegex },
//                 { content: searchRegex }
//             ]
//         })
//         .then((notes) => {
//             res.status(200).json({notes: notes});
//         })
//         .catch((error) => {
//             console.log(error);
//             next(error);
//         })
// })

router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const updatedNote = req.body;
    await Note.findOneAndUpdate({ _id: id }, updatedNote, { new: true })
        .then((updatedNote) => {
            res.status(200).json({ message: "Note updated successfully!!", note: updatedNote });
        })
        .catch((error => {
            console.log(error);
            next(error);
        }))
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    await Note.findByIdAndDelete(id)
        .then((deletedNote) => {
            res.status(200).json({ message: "Note deleted successfully!!" });
        })
        .catch((error => {
            console.log(error);
            next(error);
        }))
})

module.exports = router;
