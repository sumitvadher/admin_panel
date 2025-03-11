"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: "",
    adminEmail: "",
    defaultCurrency: "USD",
    apiKey: "",
    globalPostbackURL: "",
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`)
      .then((res) => {
        setSettings(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load settings");
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`, settings);
      setSuccess("Settings updated successfully!");
    } catch {
      setError("Failed to update settings");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>

      {loading ? (
        <p className="text-center mt-4">Loading settings...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div>
            <label className="block text-gray-700">Site Name</label>
            <input
              type="text"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Admin Email</label>
            <input
              type="email"
              name="adminEmail"
              value={settings.adminEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Default Currency</label>
            <input
              type="text"
              name="defaultCurrency"
              value={settings.defaultCurrency}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">API Key</label>
            <input
              type="text"
              name="apiKey"
              value={settings.apiKey}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Global Postback URL</label>
            <input
              type="text"
              name="globalPostbackURL"
              value={settings.globalPostbackURL}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save Settings
          </button>
        </form>
      )}
    </div>
  );
}

