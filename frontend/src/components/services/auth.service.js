import axios from "axios";

const API_URL = process.env.REACT_APP_AUTH_SIGNIN_URL;

class AuthService {
  login(credentials) {
    return axios
      .post(API_URL, credentials)
      .then(response => {
        if (response.data.token) {
          
          sessionStorage.setItem("user", JSON.stringify(response.data));
        }
        else {
          console.log("nothing")
        }
        return response.data;
      });
  }

  logout() {
    sessionStorage.removeItem("user");
    window.location.href = "/";
  }

  register(userDetails) {
    return axios.post(API_URL + "signup", userDetails);
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('user'));;
  }
}

export default new AuthService();
