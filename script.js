const form = document.getElementById('bug-form');
const titleInput = document.getElementById('bug-title');
const descInput = document.getElementById('bug-description');
const bugList = document.getElementById('bug-list');
const priorityInput = document.getElementById('bug-priority');

let bugs = JSON.parse(localStorage.getItem('bugs')) || [];

function saveBugs() {
  localStorage.setItem('bugs', JSON.stringify(bugs));
}

function renderBugs() {
  bugList.innerHTML = '';
  bugs.forEach((bug, index) => {
    const li = document.createElement('li');
    li.className = `bug ${bug.resolved ? 'resolved' : ''}`;
    li.innerHTML = `
  <h3>${bug.title} <span class="priority ${bug.priority.toLowerCase()}">${bug.priority}</span></h3>
  <p>${bug.description}</p>
  <button onclick="toggleBug(${index})">
    ${bug.resolved ? 'Mark Unresolved' : 'Mark Resolved'}
  </button>
  <button onclick="deleteBug(${index})" class="delete-btn">🗑️ Delete</button>
`;
    bugList.appendChild(li);
  });
}

function toggleBug(index) {
  bugs[index].resolved = !bugs[index].resolved;
  saveBugs();
  renderBugs();
}

function deleteBug(index) {
  if (confirm("Are you sure you want to delete this bug?")) {
    bugs.splice(index, 1);
    saveBugs();
    renderBugs();
  }
}

function logDebug(message) {
  const logBox = document.getElementById('debug-log');
  logBox.innerHTML += `<p>${message}</p>`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const priority = priorityInput.value;

  logDebug(`Submitted: ${title}, ${description}, ${priority}`);

  if (title && description && priority) {
    const newBug = {
      title,
      description,
      priority,
      resolved: false
    };

console.log("✅ Adding bug:", { title, description, priority });
    
    bugs.push(newBug);
    saveBugs();
    renderBugs();

    // Only reset after everything has been used
    form.reset();
  }
});

// Initial render
renderBugs();
