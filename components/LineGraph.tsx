/** @format */

'use client'

import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface DataPoint {
    timestamp: string;
    value: number;
}

const fetchLineGraphData = async (startDate: string, endDate: string) => {
    try {
        const response = await axios.get('http://localhost:8000/energy-consumption-per-day', {
            params: {
                start_date: startDate,
                end_date: endDate
            }
        });
        return response.data.map((item: any) => ({
            value: item.value,
            day: new Date(item.timestamp).getDate().toString()
        }));
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
};


export default function LineGraph({ startDate, endDate }: { startDate: string; endDate: string; }) {
    const [receivedData, setReceivedData] = useState<DataPoint[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchLineGraphData(startDate, endDate);
                setReceivedData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [startDate, endDate]);

    return (
        <ResponsiveContainer width={'100%'} height={350}>
            <LineChart data={receivedData}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey={'day'} />
                <YAxis tickLine={false} axisLine={false} stroke="#888888" fontSize={12} tickFormatter={(value) => `${value} W`} />
                <Line type="monotone" dataKey={'value'} stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )
    }
