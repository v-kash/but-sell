"use client";
import { useRouter } from "next/navigation";


export default function Login() {
const router = useRouter();


function handleLogin() {
localStorage.setItem("loggedIn", "true");
router.push("/dashboard");
}


return (
<div className="max-w-sm mx-auto mt-20 bg-white p-6 rounded shadow">
<h2 className="text-xl mb-4">Login</h2>
<input className="w-full border p-2 mb-3" placeholder="Email" />
<input className="w-full border p-2 mb-3" type="password" placeholder="Password" />
<button onClick={handleLogin} className="w-full bg-[#7b2c2c] text-white py-2">Login</button>
</div>
);
}