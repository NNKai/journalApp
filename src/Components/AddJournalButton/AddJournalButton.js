import React from 'react'
import { Link } from 'react-router-dom'

const AddJournalButton = () => {
  return (
    <>
      <Link to='/addjournal'><button>Add Journal</button></Link>
    </>
  )
}

export default AddJournalButton
