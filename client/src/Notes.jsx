import React, { useState } from 'react'
import NoteCard from './NoteCard'
import Search from './Search';

function Notes() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [expand, setExpand] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");
    const [searchText, setSearchText] = useState("");

    var [notes, setNotes] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("title: ", title);
        console.log("content: ", content);

        const newNote = {
            title: title,
            content: content
        }

        setNotes([newNote, ...notes])
        setTitle("")
        setContent("")
    }

    const deleteNote = (e, title) => {
        e.stopPropagation(); 

        const newNotes = notes.filter(
            (note) => note.title !== title
        )

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
                        placeholder='Content' />
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