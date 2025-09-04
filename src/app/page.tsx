"use client";
import axios from "axios";
import React, { useState } from "react";
import Navbar from "./components/navbar";
import BACKEND_URI from "./util";

type vin = string;
type details = {
  Country: string;
  Manufacturer: string;
  Region: string;
  Years: string;
  Body: string;
  Engine: string;
  Model: string;
  Plant: string;
  Serial: string;
  Transmission: string;
};
type success = boolean;
interface VINData {
  vin: vin;
  details: details;
  success: success;
}

export default function Home() {
  const [data, setData] = useState<VINData | null>(null);
  const [VIN, setVIN] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!VIN.trim()) {
      setError("Please enter a VIN number");
      return;
    }
    setLoading(true);
    setError("");
    setData(null);

    axios
      .get(BACKEND_URI + "/show/" + VIN)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err);
        setError(
          "Failed to fetch VIN data. Please check your VIN number and try again."
        );
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            🚗 VIN Checker
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Unlock the secrets of any vehicle with our powerful VIN decoder. Get
            detailed information about your car's history, specifications, and
            more!
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label
                  htmlFor="vin"
                  className="block text-lg font-semibold text-gray-700 mb-3"
                >
                  Enter Your VIN Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="vin"
                    id="vin"
                    value={VIN}
                    placeholder="e.g., 1HGBH41JXMN109186"
                    onChange={(e) => setVIN(e.target.value.toUpperCase())}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 font-mono tracking-wider"
                    maxLength={17}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {VIN.length}/17
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  VIN numbers are 17 characters long and contain letters and
                  numbers
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !VIN.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Decoding VIN...
                  </div>
                ) : (
                  "🔍 Decode My VIN"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results Section */}
        {data && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex justify-between items-center pb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  🎉 VIN Decode Results
                </h2>

                <img
                  src={`/manufacturer/${
                    data.details.Manufacturer.toLowerCase().includes("/")
                      ? data.details.Manufacturer.split("/")[0].toLowerCase()
                      : data.details.Manufacturer.toLowerCase()
                  }.png`}
                  alt=""
                  width={300}
                />
              </div>
              {data.success ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">
                        🏭 Manufacturer
                      </h3>
                      <p className="text-blue-700">
                        {data.details.Manufacturer}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">
                        🌍 Country
                      </h3>
                      <p className="text-green-700">{data.details.Country}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-purple-800 mb-2">
                        🚙 Model
                      </h3>
                      <p className="text-purple-700">{data.details.Model}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-orange-800 mb-2">
                        📅 Years
                      </h3>
                      <p className="text-orange-700">{data.details.Years}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-indigo-800 mb-2">
                        🔧 Engine
                      </h3>
                      <p className="text-indigo-700">{data.details.Engine}</p>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-pink-800 mb-2">
                        🚗 Body Type
                      </h3>
                      <p className="text-pink-700">{data.details.Body}</p>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-teal-800 mb-2">
                        ⚙️ Transmission
                      </h3>
                      <p className="text-teal-700">
                        {data.details.Transmission || "No information"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        🏭 Plant
                      </h3>
                      <p className="text-gray-700">{data.details.Plant}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">❌</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Unable to decode this VIN
                  </h3>
                  <p className="text-gray-500">
                    Please check your VIN number and try again.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our VIN Checker?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Get instant results with our optimized VIN decoding engine
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Data</h3>
              <p className="text-gray-600">
                Access detailed vehicle specifications and history
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
