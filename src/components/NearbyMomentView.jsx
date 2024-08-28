"use strict";
import "../stylesheets/nearbymoment.css";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { statusCheck } from "../scripts/utils";
import { BASE_URL } from "../scripts/utils";

import playIcon from '../assets/play.svg';
import stopIcon from '../assets/stop.svg';
import spotifyLogo from '../assets/spotify-white.svg';
import moment from "moment";

import fullLogo from "../assets/logo.png";

/**
 * Constructs a page showing a preview of a moment nearby,
 * given query parameters `lat` and `lng`
 * @returns The constructed page
 */
const NearbyMomentView = () => {
  const ANIMATION_TIME = 5000;

  const [momentData, setMomentData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loaderTimer, setLoaderTimer] = useState(null);

  let lng = searchParams.get("lng");
  let lat = searchParams.get("lat");

  useEffect(() => {
    // make a request to api to get information about the nearest
    // moment at location
    setLoaderTimer(setTimeout(() => {
      setLoaderTimer(null);
    }, ANIMATION_TIME));
    
    getMomentData();
  }, []);

  // // handle error message
  // useEffect(() => {
  //   alert(errorMsg);
  // }, [errorMsg]);

  async function getMomentData() {
    try {
      let res = await fetch(`${BASE_URL}/api/v1/pings/near?lat=${lat}&lng=${lng}`);
      await statusCheck(res);
      res = await res.json();

      setMomentData(res);
    } catch (err) {
      setErrorMsg(err.message);
      setMomentData(true);
    }
  }

  const LoadingData = () => {
    return (
      <div id="loading-moment">
        <p>Here's a song someone listened to</p>
        <h2>right where you're standing</h2>
      </div>
    )
  }

  const ErrorView = () => {
    return (
      <div id="error">
        <h1>{errorMsg || "Something happened and we don't know what it was..."}</h1>
      </div>
    )
  }



  if (momentData) {
    return (
      <div className="fullscreen">
        {errorMsg ? <ErrorView /> : loaderTimer || !momentData ? <LoadingData /> : <LoadedMomentView momentData={momentData} />}
      </div>
    )
  } else {
    return <LoadingData />
  }
}

const LoadedMomentView = ({momentData}) => {
  const [isPlaying, setIsPlaying] = useState(null);
  const music = useRef();

  let releasedYear = new Date(momentData.songInfo.dateReleased).getFullYear();

  useEffect(() => {
    console.log(music.current.stop)
    if (music.current && isPlaying !== null) {
      if (isPlaying) {
        music.current.play();
      } else {
        music.current.pause();
        music.current.currentTime = 0;
      }
    }
  }, [isPlaying]);

  const PlayButton = () => {
    return (
      <div id="playbutton" onClick={() => setIsPlaying(!(isPlaying))}>
        {<img
          style={{marginLeft: isPlaying ? 0 : '4px'}}
          src={isPlaying ? stopIcon : playIcon }
        />}
      </div>
    )
  }

  return (
    <>
      <img src={fullLogo} id="branding" alt="Moments branding logo" />
      <div id="loaded-moment" style={{backgroundImage: `linear-gradient(${momentData?.primaryColors[0]}, #000000)`}}>
        <div className="listener-tag">
          <img
            className="avatar"
            src={momentData.posterImg}
            alt={momentData.postedBy}
          />
          <p>{momentData.postedBy} listened to:</p>
        </div>
        <div id="song-view">
          <h1>{momentData.songInfo.songName}</h1>
          <img
            className="albumImg"
            src={momentData.songInfo.albumImg}
            alt={momentData.songInfo.albumName}
          />
          {momentData.previewUrl && <PlayButton />}
          <div id="music-meta">
            <p className="artists">{momentData.songInfo.artist.join(",")}</p>
            <p>{momentData.songInfo.albumName}</p>
            <p>{releasedYear}</p>
          </div>
          {
            momentData.caption &&
            <div id="caption">
              <p>{momentData.caption}</p>
            </div>
          }
          <p id="date-posted">{moment(momentData.datePosted).format('MMMM Do YYYY, h:mm a')}</p>
          <div id="get-spotify">
            <img src={spotifyLogo} alt="Spotify logo" />
            <a href={momentData.spotifyUrl}>Play on Spotify</a>
          </div>
        </div>
        <audio id="myAudio" ref={music} onEnded={() => setIsPlaying(false)}>
            <source src={momentData.previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
      </div>
    </>
  )
}

export default NearbyMomentView;
export { LoadedMomentView };