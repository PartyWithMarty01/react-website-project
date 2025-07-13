import React, { useState, useEffect } from 'react';

function LessonsManager() {
    const[selectedStudent, setSelectedStudent] = useState('');
    const [students, setStudents] = useState({});

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        //This fecthes the students
        try {
            const res = await fetch('http://localhost:4000/');
            const data = await res.json();
            setStudents(data.users || {});
        } catch (err) {
            console.error("Error fetching students:", err);
        }
    };

    const addLessons = async() => {
        //Here I will be adding a lesson to a student
        try {
        const res = await fetch('http://localhost:4000/lessons', {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({student_id: selectedStudent})
                });
            // const data = await res.json();

        if (!res.ok) {
            throw new Error("Failed to create lesson!");
      } }
            catch(err) {
                console.error(err);
                alert("ERROR, your lesson was not created!")
      }
    }

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
            <button onClick={addLessons}>Create Lesson</button>
        </div>
    )
}

export default LessonsManager;