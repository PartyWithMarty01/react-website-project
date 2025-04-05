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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Data:", formData);

    const studentInfo = {
      name: `${formData.firstName} ${formData.lastName}`,
      age: formData.age,
    };

    const response = fetch("http://localhost:4000/", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(studentInfo),
    });
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
              type="age"
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

