import "./login.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import signin from "./../assets/images/signin-image.jpg";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const handleChangeUserName = (e) => {
    if (e.target.name === "email") {
      if (e.target.value !== null) {
        setEmail(e.target.value);
      }
    }
    if (e.target.name === "password") {
      if (e.target.value !== null) {
        setPassword(e.target.value);
      }
    }
  };

  const onLogin = () => {
    if (email && password) {
      setIsLoading(true);
      setIsError("");
      const user = {
        email: email,
        password: password,
      };
      fetch(`http://localhost:3002/auth/signin`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => {
          try {
            return response.text();
          } catch (err) {
            return null;
          }
        })
        .then((user) => {
          const userData = JSON.parse(user);
          setIsLoading(false);
          setIsError(userData && userData.message);
          const email = userData && userData.user && userData.user.email;
          const id = userData && userData.user && userData.user.id;
          if (email && id) {
            sessionStorage.setItem("email", userData.user.email);
            sessionStorage.setItem("id", userData.user.id);
            history.push("/home");
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else {
      setIsError("Please fill all filelds!");
    }
  };

  const onNavigate = () => {
    history.push("/register");
  };

  return (
    <div>
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <img src={signin} alt="logo" />
            </div>
            <div className="signin-form">
              <h2 className="form-title">Sign In</h2>
              {isError ? (
                <div className="mb-3 mt-n3" style={{ color: "red" }}>
                  {isError}
                </div>
              ) : (
                ""
              )}
              <form className="register-form">
                <div className="form-group">
                  <label htmlFor="your_name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="your_name"
                    placeholder="Email"
                    value={email}
                    onChange={handleChangeUserName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="your_pass">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="your_pass"
                    placeholder="Password"
                    value={password}
                    onChange={handleChangeUserName}
                  />
                </div>
                <div className="form-group form-button">
                  <button
                    style={{ border: "none" }}
                    type="button"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    onClick={onLogin}
                  >
                    Log in &nbsp;{" "}
                    {isLoading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      ""
                    )}
                  </button>
                </div>
                <div className="form-group text-center">
                  <p>
                    <a
                      style={{ cursor: "pointer", textDecorationLine: "none" }}
                      className="signup-image-link"
                      href
                      onClick={onNavigate}
                    >
                      Create an account
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
