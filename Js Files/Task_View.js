// Function to populate task details in the overlay
function populateTaskDetails(task) {
    // Set task name
    document.querySelector('.overlay-content h1.header').textContent = 'Name';
    document.querySelector('.overlay-content p.value').textContent = task.task_name;

    // Set task description
    document.querySelectorAll('.overlay-content h1.header')[1].textContent = 'Description';
    document.querySelectorAll('.overlay-content p.value')[1].textContent = task.description;

    // Set due date
    document.querySelectorAll('.overlay-content h1.header')[2].textContent = 'Due date';
    document.querySelectorAll('.overlay-content p.value')[2].textContent = task.currentDate.toLocaleDateString();

    // Set status
    document.querySelectorAll('.overlay-content h1.header')[3].textContent = 'Status';
    const statusValue = document.querySelector('.overlay-content p.value.status-value');
    statusValue.querySelector('.circle').classList.remove('blue-background', 'yellow-background', 'green-background');
    switch (task.type) {
        case 'To do':
            statusValue.querySelector('.circle').classList.add('blue-background');
            statusValue.querySelector('span').textContent = 'To do';
            break;
        case 'Doing':
            statusValue.querySelector('.circle').classList.add('yellow-background');
            statusValue.querySelector('span').textContent = 'Doing';
            break;
        case 'Done':
            statusValue.querySelector('.circle').classList.add('green-background');
            statusValue.querySelector('span').textContent = 'Done';
            break;
        default:
            break;
    }
}

// Event listener for close button
document.querySelector('.close-button').addEventListener('click', function () {
    document.getElementById('view-task-overlay').classList.add('hide');
});

// Event listener for delete button
document.getElementById('delete-task-cta').addEventListener('click', function () {
    // Implement delete task functionality here
    // Example: alert('Delete task functionality will be implemented here');
});

// Example: assume task data is passed from the main page
const task = {
    task_name: 'Sample Task',
    description: 'This is a sample task description.',
    currentDate: new Date(),
    type: 'To do' // Assuming task type is 'To do'
};

// Populate task details
populateTaskDetails(task);

// Show overlay
document.getElementById('view-task-overlay').classList.remove('hide');
