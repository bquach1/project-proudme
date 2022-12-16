import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';

import '../css/login.css';

const LoginScreen = () => {

    const navigate = useNavigate();

    const tempDatabase = [
        {
            username: "testUser",
            password: "testPassword"
        },
        {
            username: "testUser2",
            password: "testPassword2"
        }
    ];

    const errors = {
        usernameError: "invalid username",
        passwordError: "invalid password"
    };

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const renderErrorMessage = (name) => {
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        )
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        var { usernameError, passwordError } = document.forms[0];

        const userData = tempDatabase.find((user) => user.username === usernameError.value);
    
        if (userData) {
            if (userData.password !== passwordError.value) {
                setErrorMessages({ name: "passwordError", message: errors.passwordError });
            } 
            else {
                setIsSubmitted(true);
            }
        }
        else {
            setErrorMessages({ name: "usernameError", message: errors.usernameError });
        }
    };

    const renderForm = (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Username: </label>
              <input type="text" name="usernameError" required />
              {renderErrorMessage("usernameError")}
            </div>
            <div className="input-container">
              <label>Password: </label>
              <input type="password" name="passwordError" required />
              {renderErrorMessage("passwordError")}
            </div>
            <div className="button-container">
              <Button 
                style={{backgroundColor: '#EF9090', color: 'white', padding: '10px 50px 10px 50px', 
                borderRadius: '20px', textTransform: 'none'}}
                type="submit">
                    Log In
              </Button>
            </div>
          </form>
        </div>
    );

    function successfulLogin() {

    }

    return (
        <div class="login">
            <h1 id="welcome">Welcome back to ProudME!</h1>
            <div className="login-form">
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );
};

export default LoginScreen;