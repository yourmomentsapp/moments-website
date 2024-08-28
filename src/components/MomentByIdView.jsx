/**
 * The screen that shows up when a moment is requested, knowing its id
 */
"use strict";

import { useEffect, useState } from "react";
import { LoadedMomentView } from "./NearbyMomentView";
import { useParams } from "react-router-dom";
import { BASE_URL, statusCheck } from "../scripts/utils";

const MomentByIdView = () => {
  let { momentId } = useParams();
  const [momentData, setMomentData] = useState();
  
  useEffect(() => {
    (async () => {
      try {
        let data = await getMomentWithId(momentId);
        console.log(data);
        setMomentData(data);
      } catch (err) {
        setMomentData(null);
      }
    })();
  }, []);

  /**
   * fetches info about moment from api.
   * no need to try/catch since it's handled
   * where it's called
   */
  async function getMomentWithId() {
    let res = await fetch(`${BASE_URL}/api/v1/search/pings/${momentId}`);
    await statusCheck(res);
    res = await res.json();


    // format to match expected format by LoadedMomentView
    return {
      ...res,
      postedBy: res.poster,
      posterImg: res.userPic,
      previewUrl: res["preview_url"],
      spotifyUrl: res["external_urls"]["spotify"]
    }
  }

  /** The page to show while loading */
  const LoadingPage = () => {
    return (
      <h1>Loading...</h1>
    )
  }

  /** The page to show when an error happens */
  const ErrorView = () => {
    return (
      <h1>We couldn't find that...</h1>
    )
  }
  
  return (
    <div className="fullscreen">
      {momentData === null ? <ErrorView /> : momentData ? <LoadedMomentView momentData={momentData} /> : <LoadingPage />}
    </div>
  )
}

export default MomentByIdView;