import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function NoteCard({ title, content, date = new Date(), handleDeleteNote }) {
  return (
    <div className='note-card'>
      <h2>{title}</h2>
      <p className='content'>{content}</p>
      <p className='create-date'>{date.toLocaleDateString()}</p>
      <button onClick={(e) => { handleDeleteNote(e, title) }}><FontAwesomeIcon icon={faTrash} /></button>
    </div>
  )
}

export default NoteCard
