import { LogoGithubIcon, MarkGithubIcon } from "@primer/octicons-react";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "reactfire";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const provider = new GithubAuthProvider();
  const [loggedin, setLoggedin] = useState(false);
  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log('signedin',result.user.providerData);
      console.log(result)
      setLoggedin(true);
    });
  };
 
    if(loggedin){
        navigate('/')
        console.log('navigated')
    }
  return (
    <section className="">
      <div className="w-[80%] max-w-[600px] mx-auto bg-slate-300 mt-14 rounded-xl px-4 py-5 ">
        <h1 className="text-center text-xl font-bold">Welcome back,</h1>
        <h2 className="text-center mb-3">please login to continue</h2>
        <button
          className="mx-auto flex gap-2 bg-slate-800 rounded-xl px-4 py-2 items-center "
          onClick={signIn}
        >
          <MarkGithubIcon size={24} className="fill-white" />
          <h3 className="text-white text-lg font-semibold"> login</h3>
        </button>
      </div>
    </section>
  );
};

export default Login;
