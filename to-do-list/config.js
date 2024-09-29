function addTask() {
    const input = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
                    <span>${input.value}</span>
                    <button onclick="removeTask(this)">Remove</button>
                `;
        taskList.appendChild(li);
        input.value = '';
    }
}

function removeTask(button) {
    const li = button.parentElement;
    li.remove();
}