import signupLogo from "./../assets/images/signup-image.jpg";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

function Register() {
  const navigate = useHistory();
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState("");
  const [confrimpassword, setConfirmPassword] = useState();
  const [country, setCountry] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [checked, setChecked] = useState([]);
  const [categories] = useState({
    Cricket: "Cricket",
    Music: "Music",
    Travelling: "Travelling",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const radioStyle = { textAlign: "left" };

  const navigetLogin = () => {
    navigate.push("/");
  };

  useEffect(() => {
    fetch("https://api.covid19api.com/countries", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((res) => {
        setCountry(res);
      });
  }, []);

  const handlecheck = (c) => () => {
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    setChecked(all);
  };

  const onChangeValue = (e) => {
    if (e.target.name === "firstname") {
      if (e.target.value !== null) {
        setFirstName(e.target.value);
      }
    }
    if (e.target.name === "lastname") {
      if (e.target.value !== null) {
        setLastName(e.target.value);
      }
    }
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
    if (e.target.name === "confrimpassword") {
      if (e.target.value !== null) {
        setConfirmPassword(e.target.value);
      }
    }
    if (e.target.name === "gender") {
      if (e.target.value !== null) {
        setGender(e.target.value);
      }
    }
    if (e.target.name === "country") {
      if (e.target.value !== null) {
        setCountryName(e.target.value);
      }
    }
  };

  const register = () => {
    console.log(
      firstname +
        " " +
        lastname +
        " " +
        email +
        " " +
        password +
        " " +
        gender +
        " " +
        countryName +
        " " +
        checked
    );
    if (firstname && lastname && email && password && countryName && gender) {
      setIsLoading(true);
      setIsError("");
      if (password === confrimpassword) {
        const userRegister = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          country: countryName,
          gender: gender,
          hobby: checked,
        };
        fetch(`http://localhost:3002/auth/signup`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userRegister),
        })
          .then((response) => {
            try {
              return response.text();
            } catch (err) {
              return null;
            }
          })
          .then((res) => {
            const user = JSON.parse(res);
            setIsLoading(false);
            setIsError(user && user.message);
          })
          .catch((err) => {
            setIsLoading(false);
          });
      } else {
        setIsError("Password and confirmPassword are not match!");
        setIsLoading(false);
      }
    } else {
      setIsError("Plase fill all field!");
    }
  };
  return (
    <div>
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              {isError ? (
                <div className="mb-3 mt-n3" style={{ color: "red" }}>
                  {isError}
                </div>
              ) : (
                ""
              )}
              <form className="register-form">
                <div className="form-group">
                  <label htmlFor="firstname">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="First Name"
                    value={firstname}
                    onChange={onChangeValue}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={onChangeValue}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={onChangeValue}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pass">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="pass"
                    placeholder="Password"
                    value={password}
                    onChange={onChangeValue}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="re-pass">
                    <i className="zmdi zmdi-lock-outline"></i>
                  </label>
                  <input
                    type="password"
                    name="confrimpassword"
                    id="re_pass"
                    placeholder="Repeat your password"
                    value={confrimpassword}
                    onChange={onChangeValue}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="re-pass">
                    <i className="zmdi zmdi-lock-outline"></i>
                  </label>
                  {country.length > 0 ? (
                    <select
                      className="form-control"
                      name="country"
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        marginLeft: "20px",
                      }}
                      onChange={onChangeValue}
                    >
                      {country.map((res, index) => (
                        <option key={index} value={res.Country}>
                          {res.Country}
                        </option>
                      ))}
                    </select>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group row">
                  <div className="col-md-2 mt-1">
                    <input
                      type="radio"
                      style={radioStyle}
                      name="gender"
                      checked={gender === "Male"}
                      value="Male"
                      onChange={onChangeValue}
                    />
                  </div>
                  <div className="col-md-2">Male</div>
                  <div className="col-md-3 mt-1">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === "Female"}
                      value="Female"
                      onChange={onChangeValue}
                    />
                  </div>
                  <div className="col-md-2">Female</div>
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="Cricket"
                    style={{ width: "10px", padding: "3px", display: "inline" }}
                    onChange={handlecheck(categories.Cricket)}
                  />{" "}
                  Cricket <br />
                  <input
                    type="checkbox"
                    name="Music"
                    style={{ width: "10px", padding: "3px", display: "inline" }}
                    onChange={handlecheck(categories.Music)}
                  />{" "}
                  Music <br />
                  <input
                    type="checkbox"
                    name="Travelling"
                    style={{ width: "10px", padding: "3px", display: "inline" }}
                    onChange={handlecheck(categories.Travelling)}
                  />{" "}
                  Travelling
                </div>
                <div className="form-group form-button">
                  <button
                    style={{ border: "none" }}
                    type="button"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value=""
                    onClick={register}
                  >
                    Register &nbsp;{" "}
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
              </form>
            </div>
            <div className="signup-image">
              <img src={signupLogo} alt="logo" />
              <p>
                <a hrefLang href
                  className="signup-image-link"
                  style={{ cursor: "pointer", textDecorationLine: "none" }}
                  onClick={navigetLogin}
                >
                  I am already member
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
