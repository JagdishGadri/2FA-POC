"use client";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    // Check if user is already logged in

    const userData = JSON.parse(localStorage.getItem("userInfo"));
    if (userData) {
      router.push("/home");
    }
  }

  return (
    <>
      <ToastContainer />
      <LoginForm />
    </>
  );
};

export default App;
