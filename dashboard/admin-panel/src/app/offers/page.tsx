"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface Offer {
  id: number;
  name: string;
  description: string;
  status: boolean;
  created_at: string;
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch offers from API
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/offers`)
      .then((res) => {
        setOffers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load offers");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Offers Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          <FaPlus className="mr-2" /> Add Offer
        </button>
      </div>

      {loading ? (
        <p className="text-center mt-4">Loading offers...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : (
        <table className="w-full mt-4 border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} className="text-center">
                <td className="border p-2">{offer.id}</td>
                <td className="border p-2">{offer.name}</td>
                <td className="border p-2">{offer.description}</td>
                <td className="border p-2">
                  {offer.status ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Inactive</span>
                  )}
                </td>
                <td className="border p-2">{new Date(offer.created_at).toLocaleString()}</td>
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

