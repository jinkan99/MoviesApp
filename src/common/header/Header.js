import React, { useState } from "react";
import "./Header.css";
import Logo from "../../assets/logo.svg";
import "../../assets/logo.svg";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";
import Modal from "react-modal";
import { Box, Tab, Tabs } from "@material-ui/core";
import { Link } from "react-router-dom";
import { TabContext } from "@material-ui/lab";
import { TabPanel } from "@material-ui/lab";

function Header(props) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "1px",
      height: "auto",
      width: "400px",
      padding: "5px",
    },
  };

  const [value, setValue] = React.useState("Login");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [username, setUsername] = useState("dispNone");
  const [password, setPassword] = useState("dispNone");
  const [registerPassword, setRegisterPassword] = useState("dispNone");
  const [firstName, setFirstName] = useState("dispNone");
  const [lastName, setLastName] = useState("dispNone");
  const [email, setEmail] = useState("dispNone");
  const [contact, setContact] = useState("dispNone");
  const [registerText, setRegisterText] = useState("dispNone");
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    password: "",
    mobile_number: "",
  });

  async function loginHandler() {
    const params = window.btoa(`${user}:${pw}`);
    const response = await fetch(props.baseUrl + "auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: `Basic ${params}`,
      },
    });
    const result = await response.json();
    if (response.ok) {
      window.sessionStorage.setItem("user-details", JSON.stringify(result));
      window.sessionStorage.setItem(
        "access-token",
        response.headers.get("access-token")
      );
      setUser("");
      setPw("");
      handleClose();
    }
  }

  const handleLogin = () => {
    user === "" ? setUsername("dispBlock") : setUsername("dispNone");
    pw === "" ? setPassword("dispBlock") : setPassword("dispNone");
    if (user !== "" || pw !== "") {
      loginHandler();
    }
  };

  const firstNameChangeHandler = (e) => {
    setFirst(e.target.value);
  };

  const LastNameChangeHandler = (e) => {
    setLast(e.target.value);
  };

  const mailChangeHandler = (e) => {
    setMail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPass(e.target.value);
  };

  const contactChangeHandler = (e) => {
    setPhone(e.target.value);
  };

  const userHandler = (e) => {
    setUser(e.target.value);
  };

  const pwChangeHandler = (e) => {
    setPw(e.target.value);
  };

  async function registrationHandler() {
    const state = userDetails;
    state.first_name = first;
    state.last_name = last;
    state.email_address = mail;
    state.password = pass;
    state.mobile_number = phone;
    setUserDetails({ ...state });
    console.log(userDetails);
    try {
      const rawResponse = await fetch(props.baseUrl + "signup", {
        body: JSON.stringify(userDetails),
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      const result = await rawResponse.json();
      if (rawResponse.ok) {
        setRegisterText("DispBlock");
        setFirst("");
        setLast("");
        setMail("");
        setPass("");
        setPhone("");
      } else {
        const error = new Error();
        error.message = result.message || "Something went wrong.";
        throw error;
      }
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  }

  const handleRegister = () => {
    first === "" ? setFirstName("dispBlock") : setFirstName("dispNone");
    last === "" ? setLastName("dispBlock") : setLastName("dispNone");
    mail === "" ? setEmail("dispBlock") : setEmail("dispNone");
    pass === ""
      ? setRegisterPassword("dispBlock")
      : setRegisterPassword("dispNone");
    phone === "" ? setContact("dispBlock") : setContact("dispNone");
    if (
      first !== "" ||
      last !== "" ||
      mail !== "" ||
      pass !== "" ||
      phone !== ""
    ) {
      registrationHandler();
    }
  };

  const logoutHandler = () => {
    window.sessionStorage.removeItem("access-token");
    window.location.href = "/";
  };

  const handleDetailsLogin = () => {
    handleOpen();
  };

  return (
    <div className="maincontainer">
      <img
        src={process.env.PUBLIC_URL + Logo}
        id="movie-logo"
        alt="app-logo"
      ></img>
      {props.url === "/" ||
      props.url === "/bookshow/" ||
      props.url === "/confirm/" ? (
        window.sessionStorage.getItem("access-token") === "" ||
        window.sessionStorage.getItem("access-token") === null ? (
          <div className="buttons">
            <Button
              id="btn2"
              variant="contained"
              color="inherit"
              onClick={handleOpen}
            >
              {props.buttonHeading}
            </Button>
          </div>
        ) : (
          <div className="buttons">
            <Button
              id="btn2"
              variant="contained"
              color="inherit"
              onClick={logoutHandler}
            >
              LOGOUT
            </Button>
          </div>
        )
      ) : window.sessionStorage.getItem("access-token") === "" ||
        window.sessionStorage.getItem("access-token") === null ? (
        <div className="buttons">
          <Button
            id="btn1"
            variant="contained"
            color="primary"
            onClick={handleDetailsLogin}
          >
            Book Show
          </Button>
          <Button
            id="btn2"
            variant="contained"
            color="inherit"
            onClick={handleDetailsLogin}
          >
            {props.buttonHeading}
          </Button>
        </div>
      ) : (
        <div className="buttons">
          <Link to={`/bookshow/${props.id}`} style={{ textDecoration: "none" }}>
            <Button id="btn1" variant="contained" color="primary">
              Book Show
            </Button>
          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Button
              id="btn2"
              variant="contained"
              color="inherit"
              onClick={logoutHandler}
            >
              LOGOUT
            </Button>
          </Link>
        </div>
      )}
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        ariaHideApp={false}
      >
        <Box
          sx={{
            border: "0.8px groove",
            borderColor: "grey",
            borderRadius: 1,
            padding: "25px",
          }}
        >
          <TabContext value={value}>
            <Box sx={{ marginBottom: "20px" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                indicatorColor="secondary"
                variant="fullWidth"
              >
                <Tab label="LOGIN" value="Login"></Tab>
                <Tab label="REGISTER" value="Register"></Tab>
              </Tabs>
            </Box>
            <TabPanel value="Login">
              <Box
                sx={{ display: "grid", justifyContent: "center" }}
                id="login-form"
              >
                <FormControl>
                  <InputLabel htmlFor="username" id="username-label">
                    Username*
                  </InputLabel>
                  <Input
                    type="text"
                    value={user}
                    onChange={userHandler}
                    sx={{ marginLeft: "10px" }}
                  ></Input>
                  <FormHelperText className={username}>
                    <span className="red">Required</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <FormControl>
                  <InputLabel htmlFor="password" id="password-label">
                    Password*
                  </InputLabel>
                  <Input
                    type="password"
                    value={pw}
                    onChange={pwChangeHandler}
                    sx={{ marginLeft: "10px" }}
                  ></Input>
                  <FormHelperText className={password}>
                    <span className="red">Required</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <br />
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  id="user-login"
                  onClick={handleLogin}
                >
                  LOGIN
                </Button>
              </Box>
            </TabPanel>
            <TabPanel value="Register">
              <Box
                sx={{ display: "grid", justifyContent: "center" }}
                id="login-form"
              >
                <FormControl>
                  <InputLabel htmlFor="first-name" id="first-label">
                    First Name*
                  </InputLabel>
                  <Input
                    type="text"
                    value={first}
                    onChange={firstNameChangeHandler}
                    sx={{ marginLeft: "10px" }}
                  ></Input>
                  <FormHelperText className={firstName}>
                    <span className="red">Required</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <FormControl>
                  <InputLabel htmlFor="last-name" id="last-label">
                    Last Name*
                  </InputLabel>
                  <Input
                    type="text"
                    value={last}
                    onChange={LastNameChangeHandler}
                    sx={{ marginLeft: "10px" }}
                  ></Input>
                  <FormHelperText className={lastName}>
                    <span className="red">Required</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <FormControl>
                  <InputLabel htmlFor="email" id="email-label">
                    Email*
                  </InputLabel>
                  <Input
                    type="email"
                    value={mail}
                    onChange={mailChangeHandler}
                    sx={{ marginLeft: "10px" }}
                  ></Input>
                  <FormHelperText className={email}>
                    <span className="red">Required</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <FormControl>
                  <InputLabel htmlFor="password" id="password-label">
                    Password*
                  </InputLabel>
                  <Input
                    type="password"
                    value={pass}
                    onChange={passwordChangeHandler}
                    sx={{ marginLeft: "10px" }}
                  ></Input>
                  <FormHelperText className={registerPassword}>
                    <span className="red">Required</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <FormControl>
                  <InputLabel htmlFor="contact" id="contact-label">
                    Contact No*
                  </InputLabel>
                  <Input
                    type="phone"
                    value={phone}
                    onChange={contactChangeHandler}
                    sx={{ marginLeft: "10px" }}
                  ></Input>
                  <FormHelperText className={contact}>
                    <span className="red">Required</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <div className={registerText}>
                  Registration Successful. Please Login!
                </div>
                <br />
                <br />
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  id="user-login"
                  onClick={handleRegister}
                >
                  REGISTER
                </Button>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
}

export default Header;
