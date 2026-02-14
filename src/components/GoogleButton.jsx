"use client";

import { GoogleLogin } from "@react-oauth/google";

export default function GoogleButton() {
  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const res = await fetch("/api/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              credential: credentialResponse.credential,
            }),
          });

          const data = await res.json();

          if (res.ok) {
            if (data.isAdmin) {
              window.location.href = "/admin/ads";
            } else {
              window.location.href = "/";
            }
          } else {
            alert("Google login failed");
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}
