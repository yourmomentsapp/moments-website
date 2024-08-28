import "../stylesheets/landingpage.css";
import grad from "../assets/moments-grad.png";
import momentsMap from "../assets/screenshots/map.png";

import { BASE_URL } from "../scripts/utils";

import { useEffect, useState } from "react";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <>
      <Welcome />
      <Footer />
    </>
  )
}

const Welcome = () => {
  return (
    <main id="welcome">
      <div id="logo-banner">
        <div id="grad">
          <img src={grad} alt="moments linear gradient" />
        </div>
        <div class="side-by-side">
          <div id="intro-text">
            <h1>Moments</h1>
            <h2>Music Made Memorable</h2>
            <p>
              It's the new way to discover the best music around you.
              Interact with the people and places you love with the tunes
              that guide you with <span className="underline">Moments</span>.
            </p>
            <button>
              <p>
                <a target="_blank" href="https://testflight.apple.com/join/AiH3LdD8">Become a Beta Tester</a>
              </p>
            </button>
          </div>
          <div id="mobile-preview">
            <img id="map-preview" src={momentsMap} alt="mobile app screenshot of the Moments music map" />
          </div>
        </div>
      </div>
    </main>
  )
}


export default LandingPage;