import React, { useState, useEffect } from 'react';

function LessonsManager() {
    const[selectedStudent, setSelectedStudent] = useState('');

    return(
        <div className="App">
            <h2>Lesson's Manager</h2>
            
            <label>Select Student:</label>
            <select onChange={(e) => setSelectedStudent(e.target.value)} value={selectedStudent}>
                <option value=''>--Select Student--</option>
            </select>

            <button>Create Lesson</button>
        </div>
    )
}

export default LessonsManager;