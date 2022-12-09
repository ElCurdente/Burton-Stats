import './App.css';
import React, { useRef, useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ResponsiveBar } from '@nivo/bar'
import collines from './assets/images/collines.svg';
import augustus from './assets/images/augustus.png';
import jack from './assets/images/jack.png';
import sparky from './assets/images/Sparky.png';
import edward from './assets/images/edward.png';
import oumpa from './assets/images/oumpa.png';
import willy from './assets/images/willy.png';
import reine from './assets/images/reine.png';
import chapelier from './assets/images/chapelier.png';
import charlie from './assets/images/charlie.png';
import chien from './assets/cursor/dogwhite.png';
import chienRed from './assets/cursor/dogrouge.png';

function FavoritePersos({ data }) {

  const visible = { opacity: 1, y: 0, x: 0, transition: { duration: 0.5, ease: 'linear' } };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible
  };

  const [cursorVariant, setCursorVariant] = useState(false);
  const [persoId, setPersoId] = useState(null);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  // Variant animation
  const variants = {
    default: {
      x: mousePosition.x + 10,
      y: mousePosition.y + 10,
      opacity: 1,
    },
  };

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    console.log(mousePosition);

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const Augustus = useRef(null);
  const Charlie = useRef(null);
  const Chapelier = useRef(null);
  const Sparky = useRef(null);
  const Willy = useRef(null);
  const Oumpa = useRef(null);
  const Jack = useRef(null);
  const Edward = useRef(null);
  const Reine = useRef(null);



  useEffect(() => {
    const personnages = [{ name: 'Augustus gloop', ref: Augustus }, { name: 'Charlie Bucket', ref: Charlie }, { name: 'Le chapelier fou', ref: Chapelier }, { name: 'Frankenweenie', ref: Sparky }, { name: 'Willy Wonka', ref: Willy }, { name: 'Oompa loompa', ref: Oumpa }, { name: 'Jack skellington', ref: Jack }, { name: 'Edward aux mains d’argent', ref: Edward }, { name: 'La reine de coeur', ref: Reine }];
    console.log(persoId);
    personnages.forEach((perso) => {
      if (persoId === perso.name) {
        console.log(perso);
        perso.ref.current.style.opacity = 1;
        personnages.forEach((perso2) => {
          if (perso2.name !== perso.name) {
            perso2.ref.current.style.opacity = 0;
          }
        })
      } else {
        perso.ref.current.style.opacity = 0;
      }
    })

  }, [persoId]);

  return (
    <motion.div
      className="App Stat Persos"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 1, transition: { duration: 1, delay: .5 } }}>
      <motion.img
        initial={{ opacity: 0 }}
        src={cursorVariant ? chienRed : chien}
        className="cursor"
        variants={variants}
        animate="default"
        exit={{ opacity: 0 }}
      />
      <Link to="/films">
        <motion.div
          className={"next"}
          variants={{
            hidden: { opacity: 1, y: -200, x: 200 },
            visible
          }}
          exit={{ y: -200, x: 200, opacity: 0, transition: { duration: .5, ease: 'linear' } }}>
        </motion.div>
      </Link>
      <motion.span
        variants={{
          hidden: { opacity: 1, y: 200, x: 200 },
          visible
        }}
        className={"descPersos"}
        exit={{ y: 200, x: 200, opacity: 1, transition: { duration: .3, ease: 'linear' } }}>
        Les personnages favoris des BDDI créés par Tim Burton
      </motion.span>
      <motion.div
        className='moon'
        initial={{ y: -100, x: -100, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{ y: -100, x: -100, opacity: 0, transition: { duration: 1, ease: 'linear' } }}>
        <motion.img
          className='moonPersos'
          src={augustus}
          ref={Augustus} />
        <motion.img
          className='moonPersos'
          src={charlie}
          ref={Charlie} />
        <motion.img
          className='moonPersos'
          src={chapelier}
          ref={Chapelier} />
        <motion.img
          className='moonPersos'
          src={sparky}
          ref={Sparky} />
        <motion.img
          className='moonPersos'
          src={edward}
          ref={Edward} />
        <motion.img
          className='moonPersos'
          src={jack}
          ref={Jack} />
        <motion.img
          className='moonPersos'
          src={willy}
          ref={Willy} />
        <motion.img
          className='moonPersos'
          src={reine}
          ref={Reine} />
        <motion.img
          className='moonPersos'
          src={oumpa}
          ref={Oumpa} />
      </motion.div>
      <motion.img
        src={collines}
        className='collines'
        initial={{ y: 450, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ y: 450, opacity: 0, transition: { duration: .3, delay: .5, ease: 'linear' } }} />
      <motion.div
        initial={{ y: 450, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        className={"graphContainer"}
        exit={{ y: 450, opacity: 0, transition: { duration: .3, ease: 'linear' } }}>

        <ResponsiveBar
          data={data}
          keys={[
            'score'
          ]}
          indexBy="perso"
          margin={{ top: 50, right: 130, bottom: 0, left: 60 }}
          padding={0.5}
          layout="vertical"
          valueScale={{ type: 'symlog' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'greys' }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            }
          ]}
          fill={[]}
          borderColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                1.6
              ]
            ]
          }}
          borderRadius={36}
          onMouseEnter={event => {
            setCursorVariant(true);
          }}
          onMouseLeave={event => {
            setCursorVariant(false);
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          enableGridY={false}
          onClick={node => {
            console.log(node);
            setPersoId(persoId === node.indexValue ? null : node.indexValue)
          }}
          label={function (e) { return e.indexValue }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor='black'
          legends={[]}
          tooltip={({ id, indexValue, value, color }) => (
            <div
              style={{
                padding: 12,
                color,
                background: '#222222',
              }}
            >
              <span>
                {indexValue}: {value}%
              </span>
            </div>
          )}
          role="application"
        />
      </motion.div>
    </motion.div>
  );
}

export default FavoritePersos;