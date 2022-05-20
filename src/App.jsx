import { useContext, useState } from "react";
import { AuthProvider, useFirebaseApp } from "reactfire";
import { getAuth } from "firebase/auth";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Four04 } from "./pages";
import { NavBar } from "./components";
import { ViewContext } from "./context/viewContext";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const [light,setLight]=useLocalStorage('light',true)
  const [inView,setInView]=useState(true)
  return (
    <ViewContext.Provider value={{inView,setInView }}>
      <AuthProvider sdk={auth}>
        <section className={`${light?'':'dark'} bg-white`}>
          <NavBar mode={light} setMode={setLight} />
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
