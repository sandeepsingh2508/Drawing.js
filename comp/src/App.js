import Login from "./pages/login";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles";
import { useState } from "react";
import { UserContext } from "./contexts/userContext";

function App() {
  const [user, setUser ] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <UserContext.Provider value={{ user, setUser }}>
            <Login />
            
          </UserContext.Provider>
        }/>
        <Route path="/home" element={
          <UserContext.Provider value={{ user }}>
            <Home />
          </UserContext.Provider>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
