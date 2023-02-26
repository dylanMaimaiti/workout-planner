import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.js";
import { useState } from "react";
//pages and components
import Home from "./pages/Home.js";
import Navbar from "./components/Navbar";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";

function App() {
  const {user} = useAuthContext();
  const [page, setPage] = useState(0);
  const pageSize = 4;

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <Home page={page} setPage={setPage} size={pageSize}/> : <Navigate to="/login" />} 
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
