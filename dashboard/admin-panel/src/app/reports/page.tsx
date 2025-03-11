"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/reports`)
      .then((res) => {
        setReports(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load reports");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Reports</h1>

      {loading ? (
        <p className="text-center mt-4">Loading reports...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : (
        <table className="w-full mt-4 border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Report Name</th>
              <th className="border p-2">Generated On</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report: any, index: number) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{report.name}</td>
                <td className="border p-2">{new Date(report.generated_at).toLocaleString()}</td>
                <td className="border p-2">
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/api/reports/download/${report.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

