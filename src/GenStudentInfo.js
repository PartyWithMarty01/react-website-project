import React, { useState } from "react";
import "./App.css";

function GenStudentInfo() {
  const [studentData, setStudentData] = useState(null);
  const [errorData, setErrorData] = useState(null);

  const [studentIdBeingEdited, setStudentIdBeingEdited] = useState(null);
  const [nameEdit, setNameEdit] = useState(null);
  const [ageEdit, setAgeEdit] = useState(null);

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

  const handlePost = async (studentId) => {
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this student?",
    );

    if (!confirmUpdate) return;

    try {
      const response = await fetch(`http://localhost:4000/${studentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameEdit,
          age: ageEdit,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update student!");
      }

      clearEditingStudent();

      setStudentData((prevData) => {
        const updatedUsers = { ...prevData.users };
        updatedUsers[studentId] = {
          ...updatedUsers[studentId],
          name: nameEdit,
          age: ageEdit,
        };
        return { users: updatedUsers };
      });
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student");
    }
  };
  const handleDelete = async (studentId) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this student? (OK/CANCEL)",
    );

    if (!confirmDeletion) return;

    try {
      const response = await fetch(`http://localhost:4000/${studentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete student!");
      }

      console.log(`Student ID ${studentId} deleted successfully!`);

      setStudentData((prevData) => {
        const updatedUsers = { ...prevData.users };
        delete updatedUsers[studentId];
        return { users: updatedUsers };
      });
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student");
    }
  };

  function clearEditingStudent() {
    setStudentIdBeingEdited(null);
    setNameEdit(null);
    setAgeEdit(null);
  }

  function editStudent(id) {
    setStudentIdBeingEdited(id);
    const student = studentData.users[id];
    setNameEdit(student.name);
    setAgeEdit(student.age);
  }

  return (
    <div>
      <button onClick={fetchStudentData}>Fetch student data</button>

      {errorData && <div>error: {errorData.toString()}</div>}

      {studentData && (
        <div>
          <h2>Middle Earth's School of Rock - Student Information:</h2>
          {Object.entries(studentData.users).map((user) => {
            const [key, value] = user;
            if (studentIdBeingEdited == key) {
              return (
                <div key={key}>
                  <p>We are editing student number {key}</p>
                  <p>
                    Name:{" "}
                    <input
                      value={nameEdit}
                      onChange={(e) => setNameEdit(e.target.value)}
                    ></input>
                  </p>
                  <p>
                    Age:{" "}
                    <input
                      type="number"
                      value={ageEdit}
                      onChange={(e) =>
                        setAgeEdit(parseInt(e.target.value || "0"))
                      }
                    ></input>
                  </p>
                  <button onClick={() => handlePost(key)}>Submit</button>
                  <button onClick={() => clearEditingStudent()}>Cancel</button>
                </div>
              );
            }

            return (
              <div key={key}>
                <p>ID: {key}</p>
                <p>Name: {value.name}</p>
                <p>Age: {value.age}</p>
                <button onClick={() => handleDelete(key)}>Delete</button>
                <button onClick={() => editStudent(key)}>Edit</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GenStudentInfo;
