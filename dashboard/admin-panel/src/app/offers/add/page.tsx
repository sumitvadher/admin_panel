"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddOffer() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/offers`, { name });
    router.push("/offers/list");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Offer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Offer Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
          Save Offer
        </button>
      </form>
    </div>
  );
}

