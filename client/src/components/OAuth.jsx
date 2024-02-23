import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {app}  from "../firebase";
import { Navigate } from "react-router-dom";

export default function OAuth() {
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      // console.log(result);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      Navigate('/')
      console.log(data);
    
    } catch (error) {
      console.log("Could Not Sign With Google", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:placeholder-opacity-95"
    >
      Sign In With Google
    </button>
  );
}
