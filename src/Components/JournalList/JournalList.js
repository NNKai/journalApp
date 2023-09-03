import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsers,
  selectAllUsers,
  selectUsersStatus,
  selectUsersError,
} from '../../Redux/Reducer';
import { deleteUser } from '../../Redux/Reducer'; // Import the deleteUser action
import { auth } from '../../firebase';

import './JournalList.scss'; // Import your CSS file
import AddJournalButton from '../AddJournalButton/AddJournalButton';

function JournalList() {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const usersStatus = useSelector(selectUsersStatus);
  const usersError = useSelector(selectUsersError);

  const userAuth = auth.currentUser.email;


  useEffect(() => {
    console.log('Effect ran', users);
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch, userAuth, users]);

  const handleDeleteUser = (email) => {
    dispatch(deleteUser(email)).then(() => {
      // Fetch users again after deletion to update the list
      dispatch(fetchUsers());
    });
  };

  return (
    <div className="journal-list">
      <h2>My Journal List</h2>
      <AddJournalButton />
      {usersStatus === 'loading' ? (
        <div className="loading">Loading...</div>
      ) : usersStatus === 'failed' ? (
        <div className="error">Error: {usersError}</div>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <div className="user-card">
                <div className="user-info">
                  <div className="user-username">Title: {user.title}</div>
                  <div className="user-title">Date: {user.date}</div>
                  <div className="user-age">Info: {user.morning}</div>
                </div>
                <div className="delete-button">
                  <button onClick={() => handleDeleteUser(user.email)}>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JournalList;
