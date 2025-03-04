---
id: crypto-tracker
title: Crypto Price Tracker Documentation
sidebar_label: Crypto Tracker Guide
---

# Crypto Price Tracker Documentation 🚀

Welcome to the official documentation for the **Crypto Price Tracker** project! This guide will walk you through the setup process, API integration, state management, UI/UX considerations, and the challenges faced while developing this application.

---

## 📌 1. Project Setup Guide

### 🔹 Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)
- A package manager like **npm** or **yarn**

### 🔹 Installation Steps
```sh
# Clone the repository
git clone https://github.com/your-username/crypto-tracker.git

# Navigate into the project directory
cd crypto-tracker

# Install dependencies
npm install

# Start the development server
npm run dev

# Open the application in your browser
http://localhost:3000

```
## 📌 2. Fetching Crypto Prices (API Integration)
🔹 API Used: CoinCap API
The application fetches cryptocurrency prices from CoinCap API, which provides real-time crypto price updates.

API Endpoint Used:
https://api.coincap.io/v2/assets

🔹 Fetching Data Using Axios :
We use Axios to fetch data from the API:
```js
import axios from "axios";

const fetchCryptoPrices = async () => {
  try {
    const response = await axios.get("https://api.coincap.io/v2/assets");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    return [];
  }
};
```
🔹 Error Handling in UI :
If the API call fails, we display an error message to the user:
```tsx
import { useQuery } from "@tanstack/react-query";

const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ["cryptoPrices"],
  queryFn: fetchCryptoPrices,
  staleTime: 60000, // Cache data for 1 minute
});

if (isLoading) return <p>Loading crypto prices...</p>;
if (isError) return <p style={{ color: "red" }}>Error loading data. Please try again.</p>;
```
🔹 How Data is Processed ?  
The API response is a list of cryptocurrencies with details like name, price, market cap, and supply.
We extract relevant data and display it in the UI.

## 📌 3. State Management
We use React Query for handling API calls efficiently.

🔹 Why React Query?  
Automatic caching: Reduces API calls and speeds up performance.  
Refetching in the background: Keeps prices updated without reloading the page.  
Error handling: Provides built-in error management.  
🔹 Implementation in React:  
We wrap our application in a QueryClientProvider:

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
```

In the Home Page, we use useQuery to fetch and manage crypto prices:

```tsx
import { useQuery } from "@tanstack/react-query";

const { data, isLoading, refetch } = useQuery({
  queryKey: ["cryptoPrices"],
  queryFn: fetchCryptoPrices,
  staleTime: 60000, // Cache for 1 minute
});
```
`isLoading` helps show a loading indicator.  
`refetch()` allows users to refresh prices manually.

🔹 Using React Query in Components:  
```tsx
import { useQuery } from "@tanstack/react-query";

const { data, isLoading, refetch } = useQuery({
  queryKey: ["cryptoPrices"],
  queryFn: fetchCryptoPrices,
  staleTime: 60000, // Cache for 1 minute
});

return (
  <div>
    <button onClick={() => refetch()}>Refresh Prices</button>
    {isLoading ? <p>Loading...</p> : <CryptoList data={data} />}
  </div>
);
```
## 📌 4. UI/UX and Responsiveness  
🔹 Key Features  
✅ Live Crypto Prices - Fetches latest price updates.  
✅ Search Functionality - Filters coins dynamically.  
✅ Manual Refresh - Click a button to update prices.  
✅ Loading State - Displays a message while fetching.  

🔹 UI Implementation Example
```js
<button onClick={() => refetch()}>Refresh Prices</button>

{isLoading ? (
  <p>Loading...</p>
) : (
  <ul>
    {data.map((coin) => (
      <li key={coin.id}>{coin.name}: ${coin.priceUsd}</li>
    ))}
  </ul>
)}
```

🔹 Making the UI Mobile-Friendly :  
We use CSS Flexbox and Grid to ensure the app works well on all devices.  

Example CSS for Responsiveness:  
```css
.crypto-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.crypto-card {
  width: 100%;
  max-width: 300px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}

@media (min-width: 768px) {
  .crypto-card {
    width: 45%;
  }
}

@media (min-width: 1024px) {
  .crypto-card {
    width: 30%;
  }
}
```
## 📌 5. Challenges & Solutions  
🔹 Challenge 1: API Rate Limits  
Problem: The CoinCap API enforces rate limits, restricting the number of requests in a short time.  
Solution:  
✅ Implemented React Query caching with staleTime: 5 minutes to reduce unnecessary API calls.  
✅ Added retry logic with exponential backoff to handle temporary failures.  
✅ Introduced a manual refresh button so users can update data only when needed.     

🔹 Challenge 2: Data Loading Performance  
Problem: Frequent API calls were slowing down the application and causing delays.  
Solution:  
✅ Optimized caching to 5-minute intervals to prevent excessive API requests.  
✅ Used client-side state filtering to improve search performance without triggering API calls.
  
🔹 Challenge 3: Handling API Errors  
Problem: API failures resulted in blank screens, leading to a poor user experience.  
Solution:  
✅ Implemented error messages with retry buttons to inform users when something goes wrong.  
✅ Added a spinner and loading indicator to improve UX during data fetching.  
✅ Implemented fallback data handling to prevent crashes when API requests fail.

  
 
## 📌 6. Running the Documentation  
To start the Docusaurus documentation site:  
```sh 
cd your-docusaurus-project
npm run start
```
Then, visit:
```tsx
http://localhost:3000/docs/crypto-tracker
```

## 🎉 Conclusion
The Crypto Price Tracker provides real-time prices, a smooth UI, and efficient state management. This documentation ensures that both developers and users can understand how the app works.

Happy coding! 🚀
