import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createJournalEntry } from '../../Redux/Reducer'; // Import the new action
import { auth } from '../../firebase';
import './AddJournal.scss';
import { useNavigate } from 'react-router-dom';

function Addjournal() {
  const [formData, setFormData] = useState({
    email: auth.currentUser.email,
    title: '',
    morning: '',
    afternoon: '',
    night: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch the new action to create a journal entry
      await dispatch(createJournalEntry(formData));
      // You can perform any additional actions here if needed
        navigate('/')
      // Reset the form or navigate to a different page
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="signup-form">
      <h2>Write a Journal Below</h2>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} disabled />
        </div>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Morning</label>
          <br />
          <textarea
            type="text"
            name="morning"
            value={formData.morning}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Afternoon</label>
          <br />
          <textarea
            type="text"
            name="afternoon"
            value={formData.afternoon}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Night</label>
          <br />
          <textarea
            type="text"
            name="night"
            value={formData.night}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit Journal</button>
      </form>
    </div>
  );
}

export default Addjournal;
