import React from 'react';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout
      title="Crypto Price Tracker"
      description="Live cryptocurrency price tracking and insights"
    >
      <main style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Welcome to the Crypto Price Tracker Docs</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          This documentation provides insights into the development and usage of the Crypto Price Tracker.  
        </p>
        
        <h2 style={{ marginTop: '2rem' }}>What is Crypto Price Tracker?</h2>
        <p>
          Crypto Price Tracker is a web application that provides real-time cryptocurrency prices using the <strong>CoinCap API</strong>.  
          The application is built with <strong>Next.js</strong> and leverages <strong>React Query</strong> for efficient data fetching.
        </p>

        <h2 style={{ marginTop: '2rem' }}>Key Features</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>🚀 Live price updates</li>
          <li>🔍 Search functionality</li>
          <li>📊 Real-time data fetching using React Query</li>
          <li>💾 Optimized for performance and caching</li>
        </ul>

        <h2 style={{ marginTop: '2rem' }}>Get Started</h2>
        <p>Check out the documentation to learn how to install, run, and extend the project.</p>

        <a
          href="/docs/crypto-tracker"
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            padding: '0.8rem 1.5rem',
            backgroundColor: '#0070f3',
            color: 'white',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Go to Documentation
        </a>
      </main>
    </Layout>
  );
}
