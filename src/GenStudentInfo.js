import React, { useState } from 'react';
import './App.css';

function GenStudentInfo() {
    const [studentData, setStudentData] = useState(null);
    const [errorData, setErrorData] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [updatedName, setUpdatedName] = useState(null);
    const [updatedAge, setUpdatedAge] = useState(null);

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

    const handleSelectStudent = (id, name, age) => {
        setSelectedStudent(id);
        setUpdatedName(name);
        setUpdatedAge(age);
    };

    const handlePut = async (studentId) =>{
        if (!selectedStudent) {
                alert ("No student was selected for update!");
                return;
        }

        const confirmUpdate = window.confirm('Are you sure you want to update this student?')

        if (!confirmUpdate) return;

        try {
            const response = await fetch(`http://localhost:4000/${studentId}`, {
                method: "PUT",headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: updatedName,
                    age: updatedAge
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update student!")
            }

            alert(`Student ID ${studentId} updated successfully!`)

            setStudentData(prevData => {
                const updatedUsers = {...prevData.users};
                updatedUsers[studentId] = { ...updatedUsers[studentId], name: updatedName, age: updatedAge};
                return {users: updatedUsers};
            });
            
            setSelectedStudent(null);
            setUpdatedName('');
            setUpdatedAge('');

        }  catch (error) {
            console.error("Error updating student:", error);
            alert("Failed to update student");
        }
    };
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

            console.log(`Student ID ${studentId} deleted successfully!`);

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
                            <button onClick={() => handlePut(key)}>Update</button>
                        </div>
})}
                </div>
            )}
        
            {selectedStudent && (
                <div>
                    <h3>Update Student Information: {selectedStudent}</h3>
                    <label>Name: </label>
                    <input type="text" placeholder='Enter new name: ' value={updatedName} onChange={(e) => setUpdatedName(e.target.value)}/>
                    <label>Age: </label>
                    <input type="text" value={setUpdatedAge} placeholder='Enter new age: ' onChange={(e) => setUpdatedAge(e.target.value)}/>
                    <button onClick={handlePut}>Update Student Information</button>
                </div>
            )
            }
        </div>
    );
}

export default GenStudentInfo;
