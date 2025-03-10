"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";  // ✅ Import Link
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface Affiliate {
  id: number;
  name: string;
  api_key: string;
  postback_url: string;
  status: boolean;
  created_at: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export default function Affiliates() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this affiliate?")) return;
  
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/affiliates/${id}`);
      setAffiliates(affiliates.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete the affiliate. Please try again.");
    }
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/affiliates`)
      .then((res) => {
        setAffiliates(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load affiliates");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Affiliates Management</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Add Affiliate
        </button>
      </div>

      {loading ? (
        <p className="text-center mt-4">Loading affiliates...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : (
        <table className="w-full mt-4 border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">API Key</th>
              <th className="border p-2">Postback URL</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {affiliates.map((affiliate) => (
              <tr key={affiliate.id} className="text-center">
                <td className="border p-2">{affiliate.id}</td>
                <td className="border p-2">{affiliate.name}</td>
                <td className="border p-2">{affiliate.api_key}</td>
                <td className="border p-2">{affiliate.postback_url}</td>
                <td className="border p-2">
                  {affiliate.status ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Inactive</span>
                  )}
                </td>
                <td className="border p-2">
                  <Link href={`/affiliates/edit/${affiliate.id}`} className="text-blue-600 mr-2">
                    <FaEdit />
                  </Link>
                  <button className="text-red-600" onClick={() => handleDelete(affiliate.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
