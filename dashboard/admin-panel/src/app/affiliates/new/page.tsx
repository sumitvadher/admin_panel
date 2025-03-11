"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddAffiliate() {
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [postbackUrl, setPostbackUrl] = useState("");
  const [status, setStatus] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/affiliates`, {
        name,
        api_key: apiKey,
        postback_url: postbackUrl || null,
        status,
      });
      router.push("/affiliates");
    } catch (err) {
      alert("Failed to add affiliate");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Add Affiliate</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Postback URL (optional)" value={postbackUrl} onChange={(e) => setPostbackUrl(e.target.value)} className="w-full p-2 border rounded" />
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={status} onChange={() => setStatus(!status)} />
          <span>Active</span>
        </label>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}

