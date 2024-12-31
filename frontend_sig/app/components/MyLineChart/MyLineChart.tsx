'use client';


import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Données représentant l'évolution des votes toutes les 30 minutes
const voteData = [
  {
    time: '08:00',
    'Candidat-A': 50,
    'Candidat-B': 30,
    'Candidat-C': 20,
    'Candidat-D': 40,
  },
  {
    time: '08:10',
    'Candidat-A': 34,
    'Candidat-B': 12,
    'Candidat-C': 23,
    'Candidat-D': 10,
  },
  {
    time: '08:20',
    'Candidat-A': 36,
    'Candidat-B': 22,
    'Candidat-C': 27,
    'Candidat-D': 29,
  },
  {
    time: '08:30',
    'Candidat-A': 120,
    'Candidat-B': 90,
    'Candidat-C': 60,
    'Candidat-D': 80,
  },
  {
    time: '09:00',
    'Candidat-A': 200,
    'Candidat-B': 150,
    'Candidat-C': 110,
    'Candidat-D': 140,
  },
  {
    time: '09:30',
    'Candidat-A': 300,
    'Candidat-B': 200,
    'Candidat-C': 170,
    'Candidat-D': 210,
  },
  {
    time: '10:00',
    'Candidat-A': 400,
    'Candidat-B': 260,
    'Candidat-C': 230,
    'Candidat-D': 290,
  },
];
interface ResultData {
  candidat: string;
  total_votes: number;
  time: string;
}
const LineChartComponent = () => {
  const [data, setData] = useState<ResultData[]>([]);
  useEffect(() => {
    // Fetch existing results
    fetch('http://localhost:8000/users/get_existing_results/')
    .then((response) => response.json())
    .then((fetchedData: ResultData[]) => setData(fetchedData))
    .catch((error) => console.error('Error fetching existing results:', error));

    // Setup WebSocket connection
    const socket = new WebSocket('ws://localhost:8000/ws/vote-results/');
    
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('message : ', message)
      if (message.type === 'existing') {
        setData(message.data); // Assurez-vous que message.data est un tableau de ResultData
      } else if (message.type === 'new') {
        setData((prevData) => [...prevData, message.data]); // Assurez-vous que message.data est de type ResultData
      }
    };


    return () => {
      socket.close();
    };}, []);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={500}
        data={voteData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" label={{ value: 'Heure', position: 'insideBottom', offset: -10 }} />
        <YAxis label={{ value: 'Votes', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        {/* Lignes pour chaque candidat */}
        <Line type="monotone" dataKey="Candidat-A" stroke="#3b82f6" />
        <Line type="monotone" dataKey="Candidat-B" stroke="#ef4444" />
        <Line type="monotone" dataKey="Candidat-C" stroke="#22c55e" />
        <Line type="monotone" dataKey="Candidat-D" stroke="#8b5cf6" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;



const CustomTooltip = ({ active, payload, label }:{ active?: boolean; payload?: any[]; label?:string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Revenue:
          <span className="ml-2">${payload[0].value}</span>
        </p>
        <p className="text-sm text-indigo-400">
          Profit:
          <span className="ml-2">${payload[1].value}</span>
        </p>
        <p className="text-sm text-green-400">
          Total Revenue:
          <span className="ml-2">${payload[2].value}</span>
        </p>
        <p className="text-sm text-red-400">
          Loss:
          <span className="ml-2">${payload[3].value}</span>
        </p>
      </div>
    );
  }
};
