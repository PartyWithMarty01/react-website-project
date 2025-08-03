import React, { useState, useEffect } from 'react';

const TeacherManager = () => {
  const [teachers, setTeachers] = useState([]);
  const [topics, setTopics] = useState([]);
  const [name, setName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);

  useEffect(() => {
    fetch('/teachers')
      .then(res => res.json())
      .then(data => setTeachers(data));
    
    fetch('/topics')
      .then(res => res.json())
      .then(data => setTopics(data));
  }, []);

  const handleAddTeacher = () => {
    const newTeacher = {
      name,
      topic_ids: selectedTopics
    };

    fetch('/teachers', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTeacher)
    })
    .then(res => res.json())
    .then(added => {
      setTeachers(prev => [...prev, added]);
      setName('');
      setSelectedTopics([]);
    });
  };

  const handleDeleteTeacher = (id) => {
    fetch(`http://localhost:4000/teachers/${id}`, { method: 'DELETE' })
    .then(() => {
      setTeachers(prev => prev.filter(t => t.id !== id));
    });
};

  const handleTopicSelect = (e) => {
    const options = Array.from(e.target.selectedOptions);
    setSelectedTopics(options.map(opt => parseInt(opt.value)));
  };

  return (
    <div>
      <h2>Teacher Manager</h2>
      
      <div>
        <h4>Add New Teacher</h4>
        <input 
          type="text" 
          placeholder="Teacher Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />

        <select multiple onChange={handleTopicSelect}>
          {topics.map(topic => (
            <option key={topic.id} value={topic.id}>{topic.name}</option>
          ))}
        </select>

        <button onClick={handleAddTeacher}>Add Teacher</button>
      </div>

      <h3>Current Teachers</h3>
      <ul>
        {teachers.map(teacher => (
          <li key={teacher.id}>
            {teacher.name}
            <button onClick={() => handleDeleteTeacher(teacher.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherManager;