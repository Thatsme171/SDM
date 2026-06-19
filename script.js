const API = "http://localhost:3000/students";

async function loadStudents() {

    const response = await fetch(API);
    const data = await response.json();

    let html = "";

    data.forEach(student => {
html += `
<div class="student-card">
    <div class="student-info">
        <span>Name:</span> ${student.name}<br>
        <span>Age:</span> ${student.age}<br>
        <span>Marks:</span> ${student.marks}
    </div>

    <button class="delete-btn"
        onclick="deleteStudent('${student._id}')">
        Delete
    </button>
</div>
`;
    });

    document.getElementById("students").innerHTML = html;
}

async function addStudent() {

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const marks = document.getElementById("marks").value;

    await fetch(API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            age,
            marks
        })
    });

    loadStudents();
}

async function deleteStudent(id){

    await fetch(`${API}/${id}`,{
        method:"DELETE"
    });

    loadStudents();
}

loadStudents();