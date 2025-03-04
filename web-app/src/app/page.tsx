"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import styles from "./Home.module.css"; // Import CSS file for styling

// Function to fetch cryptocurrency prices
const fetchCryptoPrices = async () => {
  try {
    const response = await axios.get("https://api.coincap.io/v2/assets", {
      params: { limit: 5, t: Date.now() }, // Timestamp to avoid caching
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    throw new Error("Failed to fetch crypto prices.");
  }
};

export default function Home() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
    staleTime: 0, // Always fetch fresh data
    cacheTime: 0, // Disable cache after unmount
    refetchOnWindowFocus: false, // Prevent automatic refetching on tab focus
    retry: 1, // Retry once on failure
    networkMode: "always", // Always fetch fresh data
  });

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch({ stale: true, force: true }); // Force fresh API fetch
    setIsRefreshing(false);
  };

  // Filter cryptocurrencies based on search input
  const filteredData =
    data?.filter((crypto) =>
      crypto.id.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Crypto Price Tracker 🚀</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search cryptocurrency..."
        className={styles.searchBar}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Refresh Button */}
      <button onClick={handleRefresh} className={styles.refreshBtn} disabled={isRefreshing}>
        {isRefreshing ? "Refreshing..." : "Refresh Prices"}
      </button>

      {/* Loading Spinner */}
      {(isLoading || isRefreshing) && (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
          <p>Loading latest prices...</p>
        </div>
      )}

      {/* Error Handling */}
      {isError && (
        <div className={styles.error}>
          <p>{error?.message || "Failed to load crypto prices."}</p>
          <button onClick={handleRefresh} className={styles.retryBtn}>
            Retry
          </button>
        </div>
      )}

      {/* Display Latest 5 Crypto Prices */}
      {!isError && !isLoading && !isRefreshing && (
        <ul className={styles.cryptoList}>
          {filteredData.map((crypto) => (
            <li key={crypto.id} className={styles.cryptoItem}>
              <span className={styles.cryptoName}>{crypto.name}</span>: $
              {parseFloat(crypto.priceUsd).toFixed(2)}
            </li>
          ))}
        </ul>
      )}

      {/* No Results Found */}
      {!isLoading && !isError && filteredData.length === 0 && (
        <p className={styles.noResults}>No cryptocurrencies found.</p>
      )}
    </main>
  );
}
