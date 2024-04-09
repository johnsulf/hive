const API_KEY = "e7ae91be-9c36-4703-bcf9-9b7c3fde3b98";

const BASE_URL = "https://v2.api.noroff.dev/";
const AUTH_URL = "auth/";
const REGISTER_URL = "register/";
const LOGIN_URL = "login/";
const API_KEY_URL = "create-api-key/";

async function generateApiKey() {

  try {
    const response = await fetch(`${BASE_URL}${AUTH_URL}${API_KEY_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer [token]`,
      },
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// generateApiKey();

async function register(name, email, password) {
    const data = {
        name: name,
        email: email,
        password: password,
    };

    try {
        const response = await fetch(`${BASE_URL}${AUTH_URL}${REGISTER_URL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

async function login(email, password) {
    const data = {
        email: email,
        password: password,
    };

    try {
        const response = await fetch(`${BASE_URL}${AUTH_URL}${LOGIN_URL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// login("erljoh20713@stud.noroff.no", "11111111");