import React, { useState, useEffect } from 'react';

function LessonsManager() {
    const[selectedStudent, setSelectedStudent] = useState('');
    onst [students, setStudents] = useState({});

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await fetch('http://localhost:4000/');
            const data = await res.json();
            setStudents(data.users || {});
        } catch (err) {
            console.error("Error fetching students:", err);
        }
    };

    return(
        <div className="App">
            <h2>Lesson's Manager</h2>
            
            <label>Select Student:</label>
            <select onChange={(e) => setSelectedStudent(e.target.value)} value={selectedStudent}>
                <option value=''>--Select Student--</option>
                {Object.entries(students).map(([id, student]) => (
                    <option key={id} value={id}>
                        {student.name} (Age: {student.age})
                    </option>
                ))}
            </select>

            <button>Create Lesson</button>
        </div>
    )
}

export default LessonsManager;