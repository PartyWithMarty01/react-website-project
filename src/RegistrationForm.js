import React, { useState } from "react";

const RegistrationForm = () => {
  //Define state on the react component that will hold data of the form.
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted Data:", formData);

    const studentInfo = {
      name: `${formData.firstName} ${formData.lastName}`,
      age: formData.age,
    };

    const responseUser = await fetch("http://localhost:4000/users", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(studentInfo),
    });

     if (!responseUser.ok) {
      alert("Failed to create student");
      return;
    }

    const userData = await responseUser.json();
    const studentId = userData.id; 
    console.log("Created student:", userData);

    const responseLesson = await fetch("http://localhost:4000/lessons", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({student_id: studentId}),
    });

    if (!responseLesson.ok) {
      alert("Failed to create lesson");
      return;
    }

    const lessonData = await responseLesson.json();
    console.log("Created lesson:", lessonData);

    window.location.replace("http://localhost:3000/student-information");

  };

  return (
    <div>
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default RegistrationForm;
