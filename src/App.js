import './App.css';
import React, { useState, useEffect } from 'react'
import { useLocation, useRoutes } from "react-router-dom";
import LandingPage from './landingPage';
import FavoriteFilms from './FavoriteFilms';
import FavoritePersos from './FavoritePersos';
import { AnimatePresence } from "framer-motion";

function App() {

  const [dataFilms, setDataFilms] = useState([]);
  const [dataPersos, setDataPersos] = useState([]);

  const getDataFilms = () => {
    fetch('films.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setDataFilms(myJson)
      });
  }

  const getDataPersos = () => {
    fetch('persos.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setDataPersos(myJson)
      });
  }
  useEffect(()=>{
    getDataFilms()
    getDataPersos()
  },[])
  
  const element = useRoutes([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/films",
      element: (
        <FavoriteFilms
          data={dataFilms} 
          />
      )
    },
    {
      path: "/persos",
      element: (
        <FavoritePersos
          data={dataPersos}
        />
      )
    }
  ]);

  const location = useLocation();

  if (!element) return null;

  return (
    // <div className="App transition-fade" id="swup">
    //   <Routes>
    //     <Route path="/" index element={<LandingPage/>} />
    //     <Route path="/stat" element={<Stat/>} />
    //   </Routes>
    // </div>
    <AnimatePresence mode="wait">
      {React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
}

export default App;
