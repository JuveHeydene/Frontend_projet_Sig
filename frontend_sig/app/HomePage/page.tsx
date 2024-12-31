"use client";
import React from "react";
import "./home.scss";
import Image from "next/image";
import myLogo from "../../public/Images/elections_237.png";
import Link from "next/link";
import { MyPieChart } from "../components/PieChart/PieChart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import LineChartComponent from "../components/MyLineChart/MyLineChart";


const page = () => {
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
            <span>12053875</span>
          </div>
          <div className="label-stat">
            <span>Taux de participation globale :</span>
            <span>75.34%</span>
          </div>
          <div className="label-stat">
            <span>Candidat en tête à l'échelle nationale:</span>
            <span>Candidat-A, RAPC</span>
          </div>
        </div>
        <section className="statistics">
          <div className="pie-chart">
            <h1 style={{ color: "#1A9EE1", padding: "20px 0px" }}>
              Répartition en Temps Réel
              <br /> des Votes par Candidat
            </h1>
            <ul className="candidates">
              <li>
                <span
                  className="color"
                  style={{ background: "#ea191d" }}
                ></span>
                <span className="name" style={{ color: "#ea191d" }}>
                  Candidat-A
                </span>
              </li>
              <li>
                <span
                  className="color"
                  style={{ background: "#1A9EE1" }}
                ></span>
                <span className="name" style={{ color: "#1A9EE1" }}>
                  Candidat-B
                </span>
              </li>
              <li>
                <span
                  className="color"
                  style={{ background: "#4AB47B" }}
                ></span>
                <span className="name" style={{ color: "#4AB47B" }}>
                  Candidat-C
                </span>
              </li>
              <li>
                <span
                  className="color"
                  style={{ background: "#EDA145" }}
                ></span>
                <span className="name" style={{ color: "#EDA145" }}>
                  Candidat-D
                </span>
              </li>
            </ul>
            <div className="chart">
              <MyPieChart />
            </div>
          </div>
          <div className="linechart">
            <h1 style={{ color: "#1A9EE1", padding: "20px 0px" }}>
              Evolution en Temps Réel des Votes par Candidat
            </h1>
              <LineChartComponent/>
          </div>
        </section>
        <section className="Map">b</section>

        <section className="table">
          
        </section>
      </main>
    </div>
    // <><ElectionHomePage/></>
  );
};

export default page;
