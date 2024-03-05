// ProfileContext.js
import React, { useState, createContext } from 'react';

export const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [birthPlace, setBirthPlace] = useState('');
  const [mbti, setMbti] = useState('');
  const [job, setJob] = useState('');
  const [relationshipStatus, setRelationshipStatus] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [userName, setuserName] = useState('');

  const contextValue = {
    selectedDate,
    setSelectedDate,
    birthPlace,
    setBirthPlace,
    mbti,
    setMbti,
    job,
    setJob,
    relationshipStatus,
    setRelationshipStatus,
    hobbies,
    setHobbies,
    userName,
    setuserName
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};
