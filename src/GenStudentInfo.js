import React, { useState } from 'react';
import './App.css';

function GenStudentInfo() {
    const [studentData, setStudentData] = useState(null);
    const [errorData, setErrorData] = useState(null);

    const fetchStudentData = async () => {
        try {
            const response = await fetch("http://localhost:4000");
            const data = await response.json();
            setStudentData(data);
            setErrorData(null);  
        } catch (error) {
            console.error("Error fetching student data:", error);
            setErrorData(error);
        }
    };

    console.log({studentData})

    const handleDelete = async (studentId) => {
        const confirmDeletion = window.confirm('Are you sure you want to delete this student? (OK/CANCEL)')

        if (!confirmDeletion) return;

        try {
            const response = await fetch(`http://localhost:4000/${studentId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete student!");
            }

            alert(`Student ID ${studentId} deleted successfully!`);

            setStudentData(prevData => {
                const updatedUsers = { ...prevData.users };
                delete updatedUsers[studentId];
                return { users: updatedUsers };
            });
        } catch (error) {
            console.error("Error deleting student:", error);
            alert("Failed to delete student");
    }
};
    return (
        <div>
            <button onClick={fetchStudentData}>
                Click to generate student information
            </button>

            {errorData && (<div>
                error: {errorData.toString()}
            </div>)}
           
            {studentData && (
                <div>
                    <h2>Middle Earth's School of Rock - Student Information:</h2>
                    {Object.entries(studentData.users).map(user => {
                        const [key, value] = user
                        return <div key={key}>
                            <p>ID: {key}</p>
                            <p>Name: {value.name}</p>
                            <p>Age: {value.age}</p>
                            <button onClick={() => handleDelete(key)}>Delete</button>
                        </div>
})}
                </div>
            )}
        </div>
    );
}

export default GenStudentInfo;
