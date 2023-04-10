import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPool } from "./components/UserPool";
const AccountContext = createContext();

export default function Account(props) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };
  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });
      const authenticationDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const token = result?.idToken?.jwtToken;
          localStorage.setItem("token", token);
          navigate("/");
          resolve(result);
        },
        onFailure: (err) => {
          console.log(err);
          setErrorMessage(err.message);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPassword: ", data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        errorMessage,
        setErrorMessage,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
}

export { Account, AccountContext };
