// Sample user data (replace with actual data fetched from backend)
let users = [
    { id: 1, username: 'admin1', email: 'admin1@example.com', role: 'admin', status: 'active' },
    { id: 2, username: 'user1', email: 'user1@example.com', role: 'user', status: 'active' },
    { id: 3, username: 'user2', email: 'user2@example.com', role: 'user', status: 'inactive' }
  ];
  
  // Function to generate unique user ID
  function generateUserId() {
    return Math.max(...users.map(user => user.id), 0) + 1;
  }
  
  // Function to render user list
  function renderUserList() {
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = '';
  
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${user.status}</td>
        <td>
          <button onclick="editUser(${user.id})">Edit</button>
          <button onclick="toggleStatus(${user.id})">${user.status === 'active' ? 'Deactivate' : 'Activate'}</button>
          <button onclick="deleteUser(${user.id})">Delete</button>
        </td>
      `;
      userListElement.appendChild(row);
    });
  }
  
  // Function to add a new user
  function addUser() {
    const newUsername = prompt("Enter username:");
    const newEmail = prompt("Enter email:");
    const newRole = prompt("Enter role:");
    const newStatus = prompt("Enter status (active/inactive):");
  
    if (newUsername && newEmail && newRole && newStatus) {
      const newUser = { id: generateUserId(), username: newUsername, email: newEmail, role: newRole, status: newStatus };
      users.push(newUser);
      renderUserList();
    } else {
      alert("Please provide all required information.");
    }
  }
  
  // Function to edit user
  function editUser(userId) {
    const user = users.find(user => user.id === userId);
    if (!user) {
      alert('User not found');
      return;
    }
    const newUsername = prompt("Enter new username:", user.username);
    const newEmail = prompt("Enter new email:", user.email);
    const newRole = prompt("Enter new role:", user.role);
    const newStatus = prompt("Enter new status (active/inactive):", user.status);
  
    if (newUsername && newEmail && newRole && newStatus) {
      user.username = newUsername;
      user.email = newEmail;
      user.role = newRole;
      user.status = newStatus;
      renderUserList();
    } else {
      alert("Please provide all required information.");
    }
  }
  
  // Function to toggle user status
  function toggleStatus(userId) {
    const user = users.find(user => user.id === userId);
    if (!user) {
      alert('User not found');
      return;
    }
    user.status = user.status === 'active' ? 'inactive' : 'active';
    renderUserList();
  }
  
  // Function to delete user
  function deleteUser(userId) {
    users = users.filter(user => user.id !== userId);
    renderUserList();
  }
  
  // Function to filter users
  function filterUsers() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const roleFilter = document.getElementById('roleFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
  
    let filteredUsers = users.filter(user => {
      return (user.username.toLowerCase().includes(searchInput) || user.email.toLowerCase().includes(searchInput)) &&
             (roleFilter === '' || user.role === roleFilter) &&
             (statusFilter === '' || user.status === statusFilter);
    });
  
    renderUserList(filteredUsers);
  }
  
  // Event listeners
  document.getElementById('searchInput').addEventListener('input', filterUsers);
  document.getElementById('roleFilter').addEventListener('change', filterUsers);
  document.getElementById('statusFilter').addEventListener('change', filterUsers);
  document.getElementById('addUserBtn').addEventListener('click', addUser);
  
  // Initial render
  renderUserList();
  