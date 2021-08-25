import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
} from "react-bootstrap";
import "../css/login.css";
import LoginImage from "./../../img/login.svg";
import { HomeButton } from "../homepage/pages/homeButton";
import { useAlert } from "react-alert";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
export default function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [captcha, setCaptcha] = useState({ expected: "", entered: "" });
  const alert = useAlert();

  useEffect(() => {
    setCaptcha({ ...captcha, expected: GenerateCaptcha() });
  }, []);

  function validateusername(username) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(username).toLowerCase());
  }

  const validations = () => {
    if (!checkEmptyFields()) {
      if (!validateusername(credentials.username)) {
        alert.show("Invalid username");
      } else {
        authenticate();
      }
    } else alert.show("Fill your credentials");
  };
  const authenticate = () => {
    if (ValidCaptcha()) {
      const promise = AuthService.login(credentials);
      promise
        .then((response) => {
          console.log(JSON.stringify(response));
          console.log("logged in!!");
          window.location.href ="/dashboard";
        })
        .catch((error) => {
          if (error.response === undefined) {
            alert.show("Server is down :)");
          } else {
            alert.show("Credentials entered are incorrect");
          }
        });
    } else {
      alert.show("re-enter captcha");
      document.getElementsByName("entered")[0].id = "error-captcha";
      setCaptcha({ ...captcha, expected: GenerateCaptcha(), entered: "" });
    }
  };
  function checkEmptyFields() {
    let usernameInput = document.getElementsByName("username");
    let passwordInput = document.getElementsByName("password");
    if (credentials.username === "") {
      usernameInput[0].id = "error";
    }

    if (credentials.password === "") {
      passwordInput[0].id = "error";
    }
    if (credentials.username === "" || credentials.password === "") return true;

    return false;
  }
  function GenerateCaptcha() {
    var chr1 = Math.ceil(Math.random() * 10) + "";
    var chr2 = Math.ceil(Math.random() * 10) + "";
    var chr3 = Math.ceil(Math.random() * 10) + "";

    var str = new Array(4).join().replace(/(.|$)/g, function () {
      return ((Math.random() * 36) | 0)
        .toString(36)
        [Math.random() < 0.5 ? "toString" : "toUpperCase"]();
    });
    var captchaCode = str + chr1 + " " + chr2 + " " + chr3;
    return captchaCode;
  }

  function ValidCaptcha() {
    var str1 = removeSpaces(captcha.entered);
    var str2 = removeSpaces(captcha.expected);

    if (str1 === str2) {
      return true;
    }
    return false;
  }

  function removeSpaces(string) {
    return string.split(" ").join("");
  }

  function handleChange(evt) {
    const value = evt.target.value;
    document.getElementsByName("username")[0].id = "cred";
    document.getElementsByName("password")[0].id = "cred";
    setCredentials({
      ...credentials,
      [evt.target.name]: value,
    });
  }
  function handleChangeCaptcha(evt) {
    const value = evt.target.value;
    document.getElementsByName("entered")[0].id = "";
    setCaptcha({
      ...captcha,
      [evt.target.name]: value,
    });
  }
  return (
    <div>
    <div className="container1">
      <div className="box" id="logoBlock1">
        <img src={LoginImage} className="Imagel"></img>
      </div>
      <div id="loginBlock" className="box">
        <div className="heading1 mb-3">Login to PS Portal</div>
        <div id="loginbox">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Email
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={credentials.username}
                onChange={handleChange}
                name="username"
                placeholder="Enter Email"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Password
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
              />
            </Col>
          </Form.Group>
        </div>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3"></Form.Label>
          <Col sm="9">
            <span align="center" sm="4">
              <a href="/forgotpassword">Forgot Password?</a>
            </span>
          </Col>
        </Form.Group>
        <div className="captchablock">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Enter Captcha
            </Form.Label>

            <Col sm="4">
              <Form.Control
                id="captcha"
                type="text"
                name="entered"
                value={captcha.entered}
                placeholder="Captcha"
                onChange={handleChangeCaptcha}
                placeholder="Captcha"
                required
              />
            </Col>

            <Col sm="5">
              <div id="captcha-img">{captcha.expected}</div>
            </Col>
          </Form.Group>
        </div>
        <div className="center" id="buttonArea">
       
            <Link to='/login' className="btn-link">
              <HomeButton buttonStyle='btn--outline'  onClick={validations} >Login</HomeButton>
            </Link>
           

          <p className="mb-3">
            <br />
            <b>
              New to PS Portal? Register
              <Link to="/signup"> here</Link>
            </b>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
