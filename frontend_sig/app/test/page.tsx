"use client"
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const pieData = [
  { name: 'Candidat-A', value: 44047, color: '#0088FE' },
  { name: 'Candidat-B', value: 20000, color: '#FF0000' },
  { name: 'Candidat-C', value: 15000, color: '#800080' },
  { name: 'Candidat-D', value: 10000, color: '#FFD700' },
];

const lineData = [
  { time: '8:00', 'Candidat-A': 20, 'Candidat-B': 40, 'Candidat-C': 10, 'Candidat-D': 5 },
  { time: '8:10', 'Candidat-A': 30, 'Candidat-B': 50, 'Candidat-C': 15, 'Candidat-D': 10 },
  { time: '8:20', 'Candidat-A': 40, 'Candidat-B': 60, 'Candidat-C': 25, 'Candidat-D': 15 },
  { time: '8:30', 'Candidat-A': 50, 'Candidat-B': 70, 'Candidat-C': 35, 'Candidat-D': 20 },
  { time: '8:40', 'Candidat-A': 60, 'Candidat-B': 80, 'Candidat-C': 45, 'Candidat-D': 25 },
];

const tableData = [
  { region: 'ADAMAOUA', a: 3455, b: 2344, c: 1232, d: 123, total: 7154, participation: '78.4%' },
  { region: 'CENTRE', a: 2112, b: 1003, c: 8032, d: 321, total: 11468, participation: '85.2%' },
  { region: 'EST', a: 3445, b: 975, c: 2122, d: 400, total: 6942, participation: '62.55%' },
  { region: 'EXTREME-NORD', a: 102, b: 123, c: 1203, d: 199, total: 1627, participation: '71.54%' },
];

const colors = ['#0088FE', '#FF0000', '#800080', '#FFD700'];

const HomePage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>PRESIDENTIAL ELECTIONS 2024</h1>
        <p>Total de voix enregistrées : <strong>12053875</strong></p>
        <p>Taux de participation globale : <strong>75.34%</strong></p>
        <p>Candidat en tête à l'échelle nationale : <strong>Candidat-A, RAPC</strong></p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
        <div>
          <h2 style={{ fontSize: '16px', textAlign: 'center' }}>Répartition en Temps Réel des Votes par Candidat</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={(entry) => `${entry.name}: ${entry.value}`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <p style={{ textAlign: 'center', fontWeight: 'bold' }}>44047 voix comptabilisées</p>
        </div>

        <div>
          <h2 style={{ fontSize: '16px', textAlign: 'center' }}>Évolution en Temps Réel des Votes par Candidat</h2>
          <LineChart width={500} height={300} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            {['Candidat-A', 'Candidat-B', 'Candidat-C', 'Candidat-D'].map((key, index) => (
              <Line key={key} type="monotone" dataKey={key} stroke={colors[index]} />
            ))}
          </LineChart>
        </div>
      </div>

      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '16px' }}>Tableau récapitulatif</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#004080', color: 'white' }}>
              <th>Region</th>
              <th>Total voix Candidat-A</th>
              <th>Total voix Candidat-B</th>
              <th>Total voix Candidat-C</th>
              <th>Total voix Candidat-D</th>
              <th>Total voix</th>
              <th>Taux de participation</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} style={{ textAlign: 'center', backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <td>{row.region}</td>
                <td>{row.a}</td>
                <td>{row.b}</td>
                <td>{row.c}</td>
                <td>{row.d}</td>
                <td>{row.total}</td>
                <td>{row.participation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
