import { useContext, useState } from "react";
import { AuthProvider, useFirebaseApp } from "reactfire";
import { getAuth } from "firebase/auth";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Four04 } from "./pages";
import { NavBar } from "./components";
import { ViewContext } from "./context/viewContext";

function App() {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const [inView,setInView]=useState(true)
  return (
    <ViewContext.Provider value={{inView,setInView }}>
      <AuthProvider sdk={auth}>
        <section className="bg-white">
          <NavBar />
          <Routes>
            <Route path="*" element={<Four04 />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </section>
      </AuthProvider>
    </ViewContext.Provider>
  );
}

export default App;
