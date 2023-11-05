import TwoFactorAuthentication from "@/components/TwoFactorAuthentication";
import Link from "next/link";

function Login() {
  return (
    <div>
      <h1>Home Page</h1>
      <TwoFactorAuthentication />

      <Link href="/homepage"></Link>
    </div>
  );
}

export default Login;
