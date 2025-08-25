import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CircleOfFifths from './CircleOfFifths';
import GenStudentInfo from './GenStudentInfo';
import RegistrationForm from './RegistrationForm';
import LessonManager from "./LessonsManager.js";
import TeachersManager from './TeachersManager.js';
import Hooks from './Hooks.js';

const chromaticScale = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'];

const tunings = {
  "Standard E": ['E', 'A', 'D', 'G', 'B', 'E'],
  "Drop D": ['D', 'A', 'D', 'G', 'B', 'E'],
  "Drop C": ['C', 'G', 'C', 'F', 'A', 'D'],
  "DADGAD": ['D', 'A', 'D', 'G', 'A', 'D'],
  "Open E": ['E', 'B', 'E', 'G#', 'B', 'E'],
  "Open G": ['D', 'G', 'D', 'G', 'B', 'D'],
  "1/2 Step Down": ['D#', 'G#', 'C#', 'F#', 'A#', 'D#'],
  "Whole Step Down": ['D', 'G', 'C', 'F', 'A', 'D']
};

function App() {
  const [selectedOption, setSelectedOption] = useState("Standard E");
  const [backEndData, setbackEndData] = useState({});

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getFretboardNotes = (openNote) => {
    const startIndex = chromaticScale.indexOf(openNote);
    const notes = [];
  
    for (let i = 0; i <= 12; i++) {
      notes.push(chromaticScale[(startIndex + i) % chromaticScale.length]);
    }
  
    return notes;
  };
  
  const tuning = tunings[selectedOption];

  // async function fetchAndLogData (){
  //   const response = await fetch("http://localhost:4000");
  //   setbackEndData(await response.json());
  // }
   
  // useEffect(() => {fetchAndLogData()}, [])
  // console.log(backEndData)


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>PartyWithMarty's Tuning Selector</h1>
          <p>A dynamic tuning selection application for Guitar Tunings.</p>

          {backEndData.users?.map((user) => {
            return <div key={user.name}>
              <div>name {user.name}</div>
              <div>age {user.age}</div>
            </div>
          })}

          <nav>
            <Link to="/" style={{ margin: '10px' }}>Tuning Selector</Link>
            <Link to="/circle-of-fifths" style={{ margin: '10px' }}>Circle of Fifths</Link>
            <Link to="/student-information" style={{ margin: '10px' }}>Student Info</Link>
            <Link to="/registration-form" style={{ margin: '10px' }}>Registration Form</Link>
            <Link to="/lessons-manager" style={{ margin: '10px' }}>Lessons Manager</Link>
            <Link to="/teachers" style={{ margin: '10px' }}>Teachers</Link>
          </nav>

          <Routes>
            <Route path="/" element={
              <>
                <select value={selectedOption} onChange={handleSelectChange}>
                  <option value="Standard E">Standard Tuning (EADGBe)</option>
                  <option value="Drop D">Drop D</option>
                  <option value="Drop C">Drop C</option>
                  <option value="DADGAD">DADGAD</option>
                  <option value="Open E">Open E</option>
                  <option value="Open G">Open G</option>
                  <option value="1/2 Step Down">1/2 Step Down</option>
                  <option value="Whole Step Down">Whole Step Down</option>
                </select>

                <table>
                  <thead>
                    <tr>
                      <th>Frets</th>
                      {Array.from({ length: 13 }, (_, fret) => (
                        <th key={fret}>{fret}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tuning && tuning.map((stringNote, stringIndex) => (
                      <tr key={stringIndex}>
                        <th>{stringNote}-String</th>
                        {getFretboardNotes(stringNote).slice(0, 13).map((note, fretIndex) => (
                          <td key={fretIndex}>{note}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                {selectedOption && <h2>The tuning you selected is: {selectedOption}</h2>}
              </>
            } />
            <Route path='/circle-of-fifths' element={<CircleOfFifths />} />
            <Route path='/student-information' element={<GenStudentInfo />} />
            <Route path="/registration-form" element={<RegistrationForm />} />
            <Route path="/lessons-manager" element={<LessonManager/>}/>
            <Route path="/teachers" element={<TeachersManager/>}/>
            <Route path="/hooks" element={<Hooks/>}/>
            
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
