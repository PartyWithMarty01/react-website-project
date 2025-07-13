import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchStudents, deleteStudent, updateStudent } from "./api/studentApi.js";

function GenStudentInfo() {
  // initializing state variables
  const [studentData, setStudentData] = useState(null);
  const [errorData, setErrorData] = useState(null);

  const [studentIdBeingEdited, setStudentIdBeingEdited] = useState(null);
  const [nameEdit, setNameEdit] = useState(null);
  const [ageEdit, setAgeEdit] = useState(null);

  // this useeffect runs when the component is loaded
  useEffect(() => {
    const loadStudents = async () => { 
      const [data, error] = await fetchStudents(); 
      setStudentData(data);
      setErrorData(error);
    }
    loadStudents();
  }, []);

  const onEditStudentClick = async(studentIdBeingEdited) => {
    // calling api
    await updateStudent(studentIdBeingEdited, nameEdit, ageEdit);

    // setting component state
    setStudentData((prevData) => {
      const updatedUsers = { ...prevData.users };

      updatedUsers[studentIdBeingEdited] = {
        ...updatedUsers[studentIdBeingEdited],
        name: nameEdit,
        age: ageEdit,
      };
      return { users: updatedUsers };
    });
    clearEditingStudent();
  }

  const onDeleteStudentClick = async (studentId) => {
      await deleteStudent(studentId);// api
      setStudentData((prevData) => { // component state
        const updatedUsers = { ...prevData.users };
        delete updatedUsers[studentId];
        return { users: updatedUsers };
      });
  }

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

  // render (pure view)
  return (
    <div>
      {errorData && <div>error: {errorData.toString()}</div>}

      {studentData && (
        <div>
          <h2>Middle Earth's School of Rock - Student Information:</h2>
          {Object.entries(studentData.users).map((user) => {
            const [key, value] = user;
            if (studentIdBeingEdited === key) {
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
                  <button onClick={() => onEditStudentClick(key)}>Submit</button>
                  <button onClick={() => clearEditingStudent()}>Cancel</button>
                </div>
              );
            }

            return (
              <div key={key}>
                <p>ID: {key}</p>
                <p>Name: {value.name}</p>
                <p>Age: {value.age}</p>
                <button onClick={() => onDeleteStudentClick(key)}>Delete</button>
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