/** @format */

'use client'

import  React  from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type Props = {};

const data = [
    {
        day: '1',
        value: 150
    },
    {
        day: '2',
        value: 120
    },
    {
        day: '3',
        value: 110
    },
    {
        day: '4',
        value: 100
    },
    {
        day: '5',
        value: 150
    },
    {
        day: '6',
        value: 200
    },
    {
        day: '7',
        value: 180
    },
    {
        day: '8',
        value: 160
    },
    {
        day: '9',
        value: 130
    },
    {
        day: '10',
        value: 122
    },
]

export default function LineGraph({}: Props) {
    return (
        <ResponsiveContainer width={'100%'} height={350}>
            <LineChart data={data}>
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis dataKey={'day'} />
            <YAxis tickLine={false} axisLine={false} stroke="#888888" fontSize={12} tickFormatter={(value) => `${value} W`}/>
            <Line type="monotone" dataKey={'value'} stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )
}