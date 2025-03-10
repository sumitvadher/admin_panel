"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AddAffiliate() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [postbackUrl, setPostbackUrl] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/affiliates`, {
        name,
        api_key: apiKey,
        postback_url: postbackUrl,
        status,
      });

      if (response.status === 201) {
        router.push("/affiliates");
      }
    } catch (err) {
      setError("Failed to add affiliate. Please check the input values.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Affiliate</h1>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Affiliate Name:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">API Key:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Postback URL:</label>
          <input
            type="url"
            className="w-full p-2 border border-gray-300 rounded"
            value={postbackUrl}
            onChange={(e) => setPostbackUrl(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <label className="font-medium mr-2">Status:</label>
          <select
            className="p-2 border border-gray-300 rounded"
            value={status ? "active" : "inactive"}
            onChange={(e) => setStatus(e.target.value === "active")}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Affiliate"}
        </button>
      </form>
    </div>
  );
}
