/** @format */
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart as BarGraph, ResponsiveContainer, XAxis, YAxis, Bar } from 'recharts';

interface MonthData {
  timestamp: string;
  value: number;
}

const BarChar: React.FC = () => {
  const [data, setData] = useState<MonthData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get('http://localhost:8000/energy-consumption-per-month');
        const apiData: { timestamp: string; value: number }[] = response.data.map((item: any) => ({
          value: item.value,
          timestamp: new Date(item.timestamp).getMonth()
        }));

        // Normalize and format data
        const normalizedData: { [timestamp: string]: number } = {};
        apiData.forEach(item => {
          normalizedData[item.timestamp.toString()] = item.value;
        });

        const formattedData: MonthData[] = [];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        months.forEach((month, index) => {
          const value = normalizedData[index.toString()] || Math.floor(Math.random() * 100) + 100; // Use random value if month is missing in the API data
          formattedData.push({ timestamp: month, value: value });
        });

        // Set the formatted data to state
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarGraph data={data}>
        <XAxis dataKey="timestamp" tickLine={false} axisLine={false} stroke="#888888" fontSize={12} />
        <YAxis tickLine={false} axisLine={false} stroke="#888888" fontSize={12} tickFormatter={(value) => `${value} W`} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} />
      </BarGraph>
    </ResponsiveContainer>
  );
};

export default BarChar;
