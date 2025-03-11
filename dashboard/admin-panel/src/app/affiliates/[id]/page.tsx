"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function EditAffiliate() {
  const router = useRouter();
  const { id } = useParams();
  const [affiliate, setAffiliate] = useState({ name: "", api_key: "", postback_url: "", status: true });

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/affiliates/${id}`)
      .then((res) => setAffiliate(res.data))
      .catch(() => alert("Failed to fetch affiliate"));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/affiliates/${id}`, affiliate);
    router.push("/affiliates");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Edit Affiliate</h1>
      <form onSubmit={handleUpdate} className="mt-4 space-y-4">
        <input type="text" value={affiliate.name} onChange={(e) => setAffiliate({ ...affiliate, name: e.target.value })} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}

