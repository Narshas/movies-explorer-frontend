import React from "react";
import "./Main.css";
import { Header } from "../Header/Header";
import { Footer } from '../Footer/Footer';
import { AboutProject } from "./AboutProject";
import { AboutMe } from "./AboutMe/AboutMe";
import { Techs } from "./Techs/Techs";
import { Promo } from "./Promo/Promo";

export function Main() {
    return (
        <>
            <Header/>
            <main className="main">
                <Promo/>
                <AboutProject/>
                <Techs/>
                <AboutMe/>
            </main>
            <Footer/>
        </>
    );
}

