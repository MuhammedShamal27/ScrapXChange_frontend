import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { shopGraph } from '../services/api/shop/shopApi';


const LineGraph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);  // Start loading before the API call
        const result = await shopGraph();  // Fetch data using the API function
        // Map the API response to the format expected by recharts
        const chartData = result.months.map((month, index) => ({
          name: month,
          value: result.total_spent[index] || 0,  // Ensure that total_spent exists for each month
        }));
        setData(chartData);  // Store the data in state
      } catch (err) {
        setError(err);  // Store the error in state if it occurs
      } finally {
        setLoading(false);  // Stop loading after the API call completes
      }
    };

    fetchData();  // Call the async function to fetch data
  }, []);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="value" stroke="#4318FF" />
        {/* <CartesianGrid stroke="#ccc" /> */}
        <XAxis dataKey="name" />
        {/* <YAxis /> */}
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
