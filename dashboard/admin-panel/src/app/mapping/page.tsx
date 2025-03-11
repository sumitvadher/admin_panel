"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface Mapping {
  id: number;
  smart_offer_id: number;
  offer_id: number;
  affiliate_id: number;
  created_at: string;
}

export default function MappingPage() {
  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch mappings from API
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/mappings`)
      .then((res) => {
        setMappings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load mappings");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">SmartOffer Mappings</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          <FaPlus className="mr-2" /> Add Mapping
        </button>
      </div>

      {loading ? (
        <p className="text-center mt-4">Loading mappings...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : (
        <table className="w-full mt-4 border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">SmartOffer ID</th>
              <th className="border p-2">Offer ID</th>
              <th className="border p-2">Affiliate ID</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mappings.map((mapping) => (
              <tr key={mapping.id} className="text-center">
                <td className="border p-2">{mapping.id}</td>
                <td className="border p-2">{mapping.smart_offer_id}</td>
                <td className="border p-2">{mapping.offer_id}</td>
                <td className="border p-2">{mapping.affiliate_id}</td>
                <td className="border p-2">{new Date(mapping.created_at).toLocaleString()}</td>
                <td className="border p-2">
                  <button className="text-blue-600 mr-2">
                    <FaEdit />
                  </button>
                  <button className="text-red-600">
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

