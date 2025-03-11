"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function OffersList() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/offers`)
      .then((res) => setOffers(res.data))
      .catch(() => console.error("Failed to load offers"));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Offers Management</h1>
        <Link href="/offers/add" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          <FaPlus className="mr-2" /> Add Offer
        </Link>
      </div>

      <table className="w-full mt-4 border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id} className="text-center">
              <td className="border p-2">{offer.id}</td>
              <td className="border p-2">{offer.name}</td>
              <td className="border p-2">
                <Link href={`/offers/edit/${offer.id}`} className="text-blue-600 mr-2">
                  <FaEdit />
                </Link>
                <button className="text-red-600">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

