import React, { useState } from "react";
import { useSession } from "next-auth/react";

const TwoFactorAuthentication = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth/twofactor/verify", {
      method: "POST",
      body: JSON.stringify({
        verificationCode,
      }),
    });

    if (response.status === 200) {
      // Redirect the user to the `/protected` page.
      window.location.href = "/homepage";
    } else {
      // Display an error message.
      setErrorMessage(response.statusText);
    }
  };

  return (
    <div>
      <h2>Two-Factor Authentication</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="verificationCode"
          placeholder="Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default TwoFactorAuthentication;
