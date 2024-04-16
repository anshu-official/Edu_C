// Function to check if the user is authenticated
const {jwtDecode} = require("jwt-decode");

export const isAuthenticated = () => {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage
    if (!token) {
      return false; // No token found, user is not authenticated
    }
  
    // Decode the token to extract expiration date
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp > currentTime; // Check if token is not expired
  };
  
  // Function to save the JWT token in local storage
  export const setAuthentication = (token) => {
    localStorage.setItem('token', token); // Save the token in local storage
  };