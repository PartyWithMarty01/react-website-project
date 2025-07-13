export const fetchStudents = async () => {
  try {
    const response = await fetch("http://localhost:4000");
    const data = await response.json();
    return [data, null]; // [result, error]
  } catch (error) {
    console.error("Error fetching student data:", error);
    return [null, error]; // [result, error]
  }
};

export const updateStudent = async (studentId, name, age) => {
  const confirmUpdate = window.confirm(
    "Are you sure you want to update this student?"
  );

  if (!confirmUpdate) return;

  try {
    const response = await fetch(`http://localhost:4000/${studentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        age: age,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update student!");
    }
  } catch (error) {
    console.error("Error updating student:", error);
    alert("Failed to update student");
  }
};

export const deleteStudent = async (studentId) => {
  const confirmDeletion = window.confirm(
    "Are you sure you want to delete this student? (OK/CANCEL)"
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
  } catch (error) {
    console.error("Error deleting student:", error);
    alert("Failed to delete student");
  }
};
