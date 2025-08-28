//  just keys for storing/retrieving from localStorage (a browser database).
const USERS_KEY = "notes-vault-users";
const TOKEN_KEY = "notes-vault-token";

//  fetches all registered users from localStorage. If they exist → parses them from string to array
function getStoredUsers() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

//  This function saves all users back into localStorage. It converts array to string (required for storage)
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// So if you call register({ name, email, password }):
    // It adds the user to a local "database"
    // Creates a fake token
    // Returns that data
export function register({ name, email, password }) {
  const users = getStoredUsers();
  const userExists = users.find((u) => u.email === email);

  if (userExists) {
    throw new Error("User with this email already exists.");
  }

  const newUser = { name, email, password };
  users.push(newUser);
  saveUsers(users);

  const fakeToken = `token-${Date.now()}`;
  localStorage.setItem(TOKEN_KEY, fakeToken);

  return { user: newUser, token: fakeToken };
}

//  Simulates backend login:
    // Finds the matching user from storage
    // Issues a fake token again
    // Returns data
export function login({ email, password }) {
  const users = getStoredUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const fakeToken = `token-${Date.now()}`;
  localStorage.setItem(TOKEN_KEY, fakeToken);

  return { user, token: fakeToken };
}

// These are utility functions:
// logout() clears the token
export function logout() {
    localStorage.removeItem(TOKEN_KEY);
}
    
// getToken() lets you check if someone is "logged in"
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
