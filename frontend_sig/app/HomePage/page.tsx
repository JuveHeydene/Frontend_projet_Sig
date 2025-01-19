"use client";
import React from "react";
import "./home.scss";
import Image from "next/image";
import myLogo from "../../public/Images/elections_237.png";
import Link from "next/link";
import { MyPieChart } from "../components/PieChart/PieChart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import LineChartComponent from "../components/MyLineChart/MyLineChart";
import MapComponent from "../components/MapComponent/MapComponent";
import ApiServices from "../components/services/ApiServices";
const colorList = [
  "#4AB48F", // Couleur 1
  "#EDA145", // Couleur 2
  "#EA191D", // Couleur 3
  "#1A9EE1", // Couleur 4
  "#51c992", // Couleur 5
];

const page = () => {
  const [totalVotesCandidate, setTotalVotesCandidate] = React.useState<any>([]);
  const [electionSummary, setElectionSummary] = React.useState<any>({});
  React.useEffect(() => {
    const fetchResultaVoteByCandidat = async () => {
      try {
        const data = await ApiServices.getTotalVotes(); // Récupère les résultats de l'API
        const sumaryData = await ApiServices.election_summary();
        setElectionSummary(sumaryData.data)
        console.log("Summary data : ", sumaryData.data)
        
        // Attribution des couleurs et préparation des données pour le graphique
        const resultsWithColors = data.map((candidate: any, index: number) => ({
          name: candidate.candidateName, // Nom du candidat
          votes: candidate.totalVotes, // Total des votes
          fill: colorList[index], // Couleur associée
        }));
        setTotalVotesCandidate(resultsWithColors); // Met à jour les données du graphique
        
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats :", error);
      }
    };
    fetchResultaVoteByCandidat();
  }, []);
  return (
    <div className="home">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Platypi:ital,wght@0,300..800;1,300..800&family=Podkova:wght@400..800&display=swap');
      </style>
      <nav>
        <Image src={myLogo} alt={""} className="logo"></Image>
        <h1>Presidential Elections 2024</h1>
        <ul className="nav-items">
          <li>
            <Link href={""}>
              <span>Login</span>{" "}
            </Link>
          </li>
          <li>
            <Link href={""}>
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link href={""}>
              <span>CopyRight</span>
            </Link>
          </li>
        </ul>
      </nav>
      <main>
         <div className="key-stats">
          <div className="label-stat">
            <span>Total de voix enregistrées :</span>
            <span>{electionSummary.total_votes}</span>
          </div>
          <div className="label-stat">
            <span>Taux de participation globale :</span>
            <span>{electionSummary.participation_rate}%</span>
          </div>
          <div className="label-stat">
            <span>Candidat en tête à l'échelle nationale:</span>
            <span>{electionSummary.leading_candidate?.name}, {electionSummary.leading_candidate?.political_party}</span>
          </div>
        </div> 
        <section className="statistics">
          <div className="pie-chart">
            <h1 style={{ color: "#1A9EE1", padding: "20px 0px" }}>
              Répartition en Temps Réel
              <br /> des Votes par Candidat
            </h1>
            <ul className="candidates">
              {totalVotesCandidate.map((candidate: any, index: number) => (
                <li key={index}>
                  <span
                    className="color"
                    style={{ background: candidate.fill }}
                  ></span>
                  <span className="name" style={{ color: candidate.fill }}>
                    {candidate.name}
                  </span>
                </li>
              ))}
            </ul>
            <div className="chart">
              <MyPieChart />
            </div>
          </div>
          <div className="linechart">
            <h1 style={{ color: "#1A9EE1", padding: "20px 0px" }}>
              Evolution en Temps Réel des Votes par Candidat
            </h1>
            <LineChartComponent />
          </div>
        </section>
        <section className="Map">
          <MapComponent />
        </section>

        <section className="table"></section>
      </main>
    </div>
    // <><ElectionHomePage/></>
  );
};

export default page;
