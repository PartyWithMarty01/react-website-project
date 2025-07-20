import React, { useState, useEffect } from 'react';

function LessonsManager() {
    const[selectedStudent, setSelectedStudent] = useState('');
    const [students, setStudents] = useState({});
    const [showLessons, setShowLessons] = useState(false);
    const [topic, setTopic] = useState('');

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
        if (!selectedStudent){
            alert("Please select a student first!");
            return;
        }
        //Here I will be adding a lesson to a student
        try {
        const res = await fetch('http://localhost:4000/lessons', {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({student_id: selectedStudent, topic})
                });
            // const data = await res.json();

        if (!res.ok) {
            throw new Error("Failed to create lesson!");
        } 
            alert("Lesson created!");
            fetchStudents();

        } catch(err) {
            console.error(err);
            alert("ERROR, your lesson was not created!")
      }
    }

    return(
       <div> 
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
            <hr />
            <label>Choose Lesson Topic:</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option value=''>--Select Topic--</option>
                    <option>Guitar</option>
                    <option>Drums</option>
                    <option>Bass</option>
                    <option>Vocals</option>
                    <option>Piano</option>
            </select>
        
        </div>
        <hr />
        <button onClick={() => setShowLessons((prev) => !prev)}>{showLessons ? "Hide Students & Lessons" : "Show Students & Lessons"}</button>
        {showLessons && (
        <div>
            <h3>View students with registered lessons:</h3>
            {Object.entries(students).map(([id, student]) => (
                <div key={id} style={{marginBottom: "1rem"}}>
                    <strong>
                        {student.name}(Age: {student.age})
                    </strong>
                    {student.lessons.length > 0 ? (
                        <ul>
                            {student.lessons.map((lesson, index) => (
                                <li key={index}>
                                    Lesson ID: {lesson.lesson_id}, Created At: {lesson.created_at}
                                </li>
                            ))}
                        </ul>
                    ) : ( 
                    <p>No Lessons created!</p>
                    )}
                </div>
            ))}           
        </div>
        )}
        </div>
    );}

export default LessonsManager;