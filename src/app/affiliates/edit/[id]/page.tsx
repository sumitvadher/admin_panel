"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function EditAffiliate() {
  const router = useRouter();
  const { id } = useParams();
  const [affiliate, setAffiliate] = useState({
    name: "",
    api_key: "",
    postback_url: "",
    status: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/affiliates/${id}`)
      .then((res) => {
        setAffiliate(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load affiliate details");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAffiliate({ ...affiliate, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/affiliates`, {
        id,
        ...affiliate,
      });
      router.push("/affiliates");
    } catch (error) {
      setError("Failed to update affiliate");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Affiliate</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={affiliate.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">API Key</label>
            <input
              type="text"
              name="api_key"
              value={affiliate.api_key}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Postback URL</label>
            <input
              type="text"
              name="postback_url"
              value={affiliate.postback_url}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Active</label>
            <input
              type="checkbox"
              name="status"
              checked={affiliate.status}
              onChange={(e) => setAffiliate({ ...affiliate, status: e.target.checked })}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Affiliate
          </button>
        </form>
      )}
    </div>
  );
}
