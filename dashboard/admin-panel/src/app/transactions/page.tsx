"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Transaction {
  id: number;
  affiliate_id: number;
  offer_id: number;
  mobile_number: string;
  transaction_id: string;
  status: string;
  created_at: string;
  verified_at?: string | null;
  failed_attempts: number;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions from API
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions`)
      .then((res) => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load transactions");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Transactions</h1>

      {loading ? (
        <p className="text-center mt-4">Loading transactions...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : (
        <table className="w-full mt-4 border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Affiliate ID</th>
              <th className="border p-2">Offer ID</th>
              <th className="border p-2">Mobile Number</th>
              <th className="border p-2">Transaction ID</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Failed Attempts</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Verified At</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className="text-center">
                <td className="border p-2">{txn.id}</td>
                <td className="border p-2">{txn.affiliate_id}</td>
                <td className="border p-2">{txn.offer_id}</td>
                <td className="border p-2">{txn.mobile_number}</td>
                <td className="border p-2">{txn.transaction_id}</td>
                <td className="border p-2">
                  {txn.status === "SUCCESS" ? (
                    <span className="text-green-600">Success</span>
                  ) : txn.status === "PENDING" ? (
                    <span className="text-yellow-600">Pending</span>
                  ) : (
                    <span className="text-red-600">Failed</span>
                  )}
                </td>
                <td className="border p-2">{txn.failed_attempts}</td>
                <td className="border p-2">{new Date(txn.created_at).toLocaleString()}</td>
                <td className="border p-2">
                  {txn.verified_at ? new Date(txn.verified_at).toLocaleString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

