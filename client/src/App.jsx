import { useState } from "react";
import "./App.css";

function App() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    password: "",
    email: "",
    role: "Admin",
  });
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userDetails);
    try{
      const response = await fetch("/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      console.log(data);
    }
    catch(error){
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(loginDetails)
    try{
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });
      const data = await response.json();
      console.log(data);
    }
    catch(error){
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <form type="submit" onSubmit={handleSubmit}>
          <h1>Signup</h1>
          <input
            type="text"
            placeholder="name"
            name="Name"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
          <select
            name="role"
            value={userDetails.role}
            onChange={(e) =>
              setUserDetails({ ...userDetails, role: e.target.value })
            }
          >
            <option value="Admin">Admin</option>
            <option value="Student">Student</option>
            <option value="Visitor">Visitor</option>
          </select>


          <button>Sign up</button>
        </form>
      </div>
      <div>
        <form type="submit" onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={loginDetails.email}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginDetails.password}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, password: e.target.value })
            }
          />


          <button>Login</button>
        </form>
      </div>
    </>
  );
}

export default App;
