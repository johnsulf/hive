import { API_KEY } from '../../helpers/constants.js';

function fetchProfiles() {
    fetch('https://v2.api.noroff.dev/social/profiles/', {
        method: 'GET',
        headers: {
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGVzdGVmamVzMSIsImVtYWlsIjoiaGVzdGVmamVzMUBub3JvZmYubm8iLCJpYXQiOjE3MTI4NDA0Mzl9.M6LtpQUaLpu7FxOHBr3hP7sZmwbnZaH3rY5vLfp9Kqc",
            'X-Noroff-API-Key': API_KEY,
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Profiles:', data);
        })
        .catch(error => {
            console.error('Error fetching profiles:', error);
        });
}

// Call the function to fetch profiles
fetchProfiles();
