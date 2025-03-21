import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Tasks from "./components/Tasks";

function App() {
  const [token, setToken] = useState(null);

  return (
    <div class name="App">
      <header className="App-header">
        {!token ? <Login setToken={setToken} /> : <Tasks token={token} />}
      </header>
    </div>
  );
}

export default App;
