import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./stylesheets/common.css";

/** Components */
import LandingPage from './components/LandingPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import NearbyMomentView from './components/NearbyMomentView';
import MomentByIdView from './components/MomentByIdView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />
  },
  {
    path: "/terms-of-use",
    element: <TermsOfUse />
  },
  {
    path: "/moments/location",
    element: <NearbyMomentView />
  },
  {
    path: "/moments/id/:momentId",
    element: <MomentByIdView />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
