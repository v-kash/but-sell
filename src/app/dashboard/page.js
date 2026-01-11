"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Dashboard() {
const router = useRouter();


useEffect(() => {
if (!localStorage.getItem('loggedIn')) router.push('/login');
}, []);


return (
<div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
<h2 className="text-xl">Dashboard</h2>
<p className="my-4">Logged in (fake auth)</p>
<button onClick={() => router.push('/post-ad')} className="bg-[#7b2c2c] text-white px-4 py-2">Post New Ad</button>
</div>
);
}