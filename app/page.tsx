'use client'
import Card, { CardContent, CardProps } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import { Calculator, DollarSign, Leaf, PlugZap, Zap } from "lucide-react";
import Image from "next/image";
import BarChar from "@/components/BarChar";
import LineGraph from "@/components/LineGraph";
import axios from "axios";
import { useEffect, useState } from "react";


const today = new Date()
const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const formattedToday = today.toISOString().split('T')[0];
const formattedFirstDayOfMonth = firstDayOfMonth.toISOString().split('T')[0];
const firstDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0];
const lastDateOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0];

const fetchDataTotalEnergy = async (startDate: string, endDate: string) => {
  try {
    const response = await axios.get('http://localhost:8000/energy-consumption-per-day', {
      params: {
        start_date: startDate,
        end_date: endDate
      }
    });
    const sum = response.data.reduce((acc: number, item: any) => acc + item.value, 0);
    const numberOfDataPoints = response.data.length;
    const average = sum / numberOfDataPoints;
    return {
      data: response.data.map((item: any) => ({
        value: item.value,
        day: new Date(item.timestamp).getDate().toString()
      })),
      sum: sum,
      average: average
    }
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};


export default function Home() {
   const [cardData, setCardData] = useState([
    {
      label: "Total Energy",
      amount: "500 W",
      description: "Total energy consumed from the 1st day of the month until current day",
      icon: Zap
    },
    {
      label: "Average Energy",
      amount: "250W",
      description: "Average energy consumed from the 1st day of the month until current day",
      icon: Calculator
    },
    {
      label: "Total Energy Last Month",
      amount: "1240 W",
      description: "Total energy consumed in the last month",
      icon: Leaf
    },
    {
      label: "Average Energy Last month",
      amount: "507 W",
      description: "Average energy consumed in the last month",
      icon: PlugZap
    }
  ]);
  useEffect(() => {
    const fetchDataPreviousMonth = async () => {
      try {
        const previousData = await fetchDataTotalEnergy(firstDayOfPreviousMonth, lastDateOfPreviousMonth);
        const totalEnergy = previousData.sum.toFixed(2);
        const averageEnergy = previousData.average.toFixed(2);
        setCardData(prevCardData => prevCardData.map(card => {
          switch(card.label) {
            case "Total Energy Last Month":
              return {
                ...card,
                amount: `${totalEnergy} W`
              };
            case "Average Energy Last month":
              return {
                ...card,
                amount: `${averageEnergy} W`
              };
            default:
              return card;
          }
        }));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchDataCurrentMonth = async () => {
      try {
        const result = await fetchDataTotalEnergy(formattedFirstDayOfMonth, formattedToday);
        const totalEnergy = result.sum.toFixed(2);
        const averageEnergy = result.average.toFixed(2);
        setCardData(prevCardData => prevCardData.map(card => {
          switch(card.label) {
            case "Total Energy":
              return {
                ...card,
                amount: `${totalEnergy} W`
              };
            case "Average Energy":
              return {
                ...card,
                amount: `${averageEnergy} W`
              };
            default:
              return card;
          }
        }));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDataCurrentMonth();
    fetchDataPreviousMonth();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((field, index) =>
          <Card key={index}
            amount={field.amount}
            description={field.description}
            icon={field.icon}
            label={field.label}

          />
        )}
      </section>
      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <BarChar />
        </CardContent>
        <CardContent>
          <p className="font-semibold"> Last Month Overview</p>
          <p className="text-sm text-gray-400"> This Graph reprents the consumption on an entire month</p>
          <LineGraph startDate={formattedFirstDayOfMonth} endDate={formattedToday} />
        </CardContent>
      </section>
    </div>
  );
}
