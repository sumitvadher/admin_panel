"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditOffer() {
  const router = useRouter();
  const { id } = useParams();
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/offers/${id}`).then((res) => setName(res.data.name));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/offers/${id}`, { name });
    router.push("/offers/list");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Offer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Offer Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
          Update Offer
        </button>
      </form>
    </div>
  );
}

