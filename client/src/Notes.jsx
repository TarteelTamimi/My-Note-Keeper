import React, { useState, useEffect } from 'react'
import NoteCard from './NoteCard'
import Search from './Search'
import axios from 'axios'

function Notes() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [expand, setExpand] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)
    const [showDialog, setShowDialog] = useState(false)
    const [updatedTitle, setUpdatedTitle] = useState("")
    const [updatedContent, setUpdatedContent] = useState("")
    const [searchText, setSearchText] = useState("")
    const [notes, setNotes] = useState([])
    const BASE_URL = "http://localhost:5000"

    useEffect(() => {
        axios.get(`${BASE_URL}/note`)
            .then(res => {
                setNotes(res.data.notes)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const newNote = {
            title: title,
            content: content
        }

        axios.post(`${BASE_URL}/note`, newNote)
            .then(res => {
                console.log("posted");
            })
            .catch(err => console.log(err))

        setNotes([newNote, ...notes])
        setTitle("")
        setContent("")
    }

    const deleteNote = (e, title) => {
        e.stopPropagation();

        const newNotes = notes.filter(
            (note) => note.title !== title
        )

        const toDeleteNote = notes.filter(
            (note) => note.title === title
        )
        const idToDelete = toDeleteNote[0]._id


        axios.delete(`${BASE_URL}/note/${idToDelete}`)
            .then(res => {
                console.log("deleted");
            })
            .catch(err => console.log(err))


        setNotes(newNotes)
    }

    const handleNoteClick = (note) => {
        setSelectedNote(note);
        setUpdatedTitle(note.title);
        setUpdatedContent(note.content);
        setShowDialog(true);
    }

    const handleSaveNote = () => {
        const updatedNotes = notes.map((note) => {
            if (note.title === selectedNote.title && note.content === selectedNote.content) {
                return {
                    ...note,
                    title: updatedTitle,
                    content: updatedContent
                };
            }
            return note;
        });

        const idToUpdate = selectedNote._id

        axios.put(`${BASE_URL}/note/${idToUpdate}`, { title: updatedTitle, content: updatedContent })
            .then(res => {
                console.log("Updated");
            })
            .catch(err => console.log(err))

        setNotes(updatedNotes);
        setShowDialog(false);
    }

    const handleCancelUpdate = () => {
        setShowDialog(false);
    }

    const filteredNotes = searchText.trim() === "" ? notes : notes.filter((note) => {
        return note.title.toLowerCase().includes(searchText.toLowerCase()) ||
            note.content.toLowerCase().includes(searchText.toLowerCase());
    });

    return (
        <div className='notes'>
            <Search handleSearchText={setSearchText} />
            <button className='note-take-btn' onClick={() => { setExpand(!expand) }}>Take a Note ...</button>
            {expand && (
                <form
                    className="note-take-form"
                    onSubmit={(e) => {
                        handleSubmit(e)
                    }}
                >
                    <input
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        type="text"
                        placeholder='Title'
                        required />
                    <textarea
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                        type="textarea"
                        placeholder='Content'
                        required />
                    <button type="submit" className='save-btn'>Save</button>
                    <button className='close-btn' onClick={() => {
                        setExpand(!expand)
                        setTitle("")
                        setContent("")
                    }}>Close</button>
                </form>
            )}

            <div className='notes-list'>
                {filteredNotes.map((note, index) => (
                    <div key={index} onClick={() => handleNoteClick(note)}>
                        <NoteCard title={note.title} content={note.content} handleDeleteNote={deleteNote} />
                    </div>
                ))}
                {console.log(filteredNotes)}
            </div>


            {showDialog && (
                <div className="dialog">
                    <input
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                        type="text"
                        placeholder='Updated Title'
                    />
                    <textarea
                        value={updatedContent}
                        onChange={(e) => setUpdatedContent(e.target.value)}
                        type="textarea"
                        placeholder='Updated Content'
                    />
                    <div className='dialog-actions'>
                        <button onClick={handleSaveNote}>Save</button>
                        <button onClick={handleCancelUpdate}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Notes
