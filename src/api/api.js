// Classes

export const getClassesApi = () => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/getClasses`);
    return res;
}

export const addClassApi = (newClass) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/addClass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "name": newClass })
    });
    return res;
}

export const editClassApi = (name, editClass) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/${name}/updateClass`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name: editClass})
    });
    return res;
}

export const deleteClassApi = (id, name) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/${id}/${name}/deleteClass`, {
        method: "DELETE"
    });
    return res;
}


// Students

export const getStudentsApi = () => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/getStudents`);
    return res;
}

export const getStudentsClassApi = (attClass) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/${attClass}/students/getClassStudents`);
    return res;
}

export const getStudentApi = (id) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/${id}/getStudent`);
    return res;
}

export const addStudentApi = (newStudent) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/addStudent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent)
    });
    return res;
}

export const editStudentApi = (id, editStudent) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/${id}/updateStudent`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editStudent)
    });
    return res;
}

export const deleteStudentApi = (id) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/${id}/deleteStudent`, {
            method: "DELETE",
    });
    return res;
}

// Attendance

export const addAttendanceApi = (attClass, newAttValues) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/${attClass}/students/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAttValues)
    });
    return res;
}

export const editAttendanceApi = (attObj) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/${attObj.studentId}/attendance/${attObj.attId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attObj)
    });
    return res;
}

export const deleteAttendanceClassDayApi = (name, attDate) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/${name}/students/attendance/${attDate}/option1`, {
        method: "DELETE"
    });
    return res;
}

export const deleteAttendanceClassApi = (name) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/${name}/students/attendance/option2`, {
        method: "DELETE"
    });
    return res;
}

export const clearAttendanceApi = () => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/attendance/option3`, {
        method: "DELETE"
    });
    return res;
}

// Behaviour

export const addBehaviourApi = (id, newBehaviour) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/${id}/behaviour`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "behaviour" : newBehaviour})
    });
    return res;
}

export const editBehaviourApi = (id, editBehaviour) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/${id}/behaviour`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "behaviour" : editBehaviour})
    });
    return res;
}

export const deleteBehaviourApi = (id) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/${id}/behaviour`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ behaviour : ""})
    });
    return res;
}

// Login

export const loginApi = (login) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login)
    });
    return res;
}

// Register

export const registerApi = (newProfile) => {
    const res = fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProfile)
    });
    return res;
}