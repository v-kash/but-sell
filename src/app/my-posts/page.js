"use client";
import { useEffect, useState } from "react";
import AdCard from "@/components/AdCard";
import EmployeeCard from "@/components/EmployeeCard";
import EmployerCard from "@/components/EmployerCard";
import Spinner from "@/components/Spinner";

export default function MyPostsPage() {
  const [data, setData] = useState({ ads: [], employees: [], employers: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/my-posts")
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

if (loading) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spinner size={40} />
    </div>
  );
}

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-xl font-semibold">My Posts</h1>

      {data.ads.map(a => <AdCard key={a.id} ad={a} />)}
      {data.employees.map(e => <EmployeeCard key={e.id} employee={e} />)}
      {data.employers.map(e => <EmployerCard key={e.id} employer={e} />)}
    </div>
  );
}
