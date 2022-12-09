import './App.css';
import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ResponsiveCirclePacking } from '@nivo/circle-packing'
import bridge from './assets/images/coline.svg';
import eclipse from './assets/images/ECLISPE_LUNA.png';
import chien from './assets/cursor/dogwhite.png';
import chienRed from './assets/cursor/dogrouge.png';
import Snowfall from 'react-snowfall'

function FavoriteFilms({ data }) {

    const visible = { opacity: 1, y: 0, x: 0, transition: { duration: 0.5, ease: 'linear' } };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible
    };

    const [cursorVariant, setCursorVariant] = useState(false);
    const [zoomedId, setZoomedId] = useState(null)
    const [moonIn, setMoonIn] = useState(false)

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

    return (
        <motion.div
            className="App Stat"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 1, transition: { duration: 1, delay: 1 } }}>
            <motion.img
                initial={{ opacity: 0}}
                src={cursorVariant ? chienRed : chien}
                className="cursor"
                variants={variants}
                animate="default"
                exit={{ opacity: 0 }}
            />
            <motion.div
                exit={{ opacity: 0, transition: { duration: 1, ease: 'linear' } }}>
                <Snowfall />
            </motion.div>
            <Link to="/persos">
                <motion.div
                    className={moonIn ? "next nextActive" : "next"}
                    variants={{
                        hidden: { opacity: 1, y: -200, x: 200 },
                        visible
                    }}
                    exit={{ y: -200, x: 200, opacity: 0, transition: { duration: .5, ease: 'linear' } }}>
                </motion.div>
            </Link>
            <motion.img
                src={bridge}
                className={moonIn ? "bridge bridgeActive" : "bridge"}
                variants={{
                    hidden: { opacity: 0, y: 500, x: 500 },
                    visible
                }}
                exit={{ y: 500, x: 500, opacity: 0, transition: { duration: .3, ease: 'linear' } }} />
            <motion.span
                variants={{
                    hidden: { opacity: 1, y: 500, x: 500 },
                    visible
                }}
                className={moonIn ? "desc bridgeActive" : "desc"}
                exit={{ y: 500, x: 500, opacity: 1, transition: { duration: .3, ease: 'linear' } }}>
                Les oeuvres favorites des BDDI réalisées par Tim Burton
            </motion.span>
            <motion.span
                variants={{
                    hidden: { opacity: 1, y: 100, x: -100 },
                    visible
                }}
                className={moonIn ? "votes votesActive" : "votes"}
                exit={{ y: 100, x: -100, opacity: 1, transition: { duration: .3, ease: 'linear' } }}>
                Nombre de votes : 32
            </motion.span>
            <motion.div
                initial={{ y: -450, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={moonIn ? "graphContainer graphContainerActive " : "graphContainer"}
                exit={{ y: -450, opacity: 0, transition: { duration: .3, ease: 'linear' } }}>

                <ResponsiveCirclePacking
                    data={data}
                    margin={{ top: 50, right: 20, bottom: 50, left: 20 }}
                    id="name"
                    value="value"
                    colors={{ scheme: 'greys' }}
                    childColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'brighter',
                                0.4
                            ]
                        ]
                    }}
                    padding={10}
                    enableLabels={moonIn ? true : false}
                    animate={true}
                    label={function (e) { return e.id }}
                    labelsFilter={label => label.node.depth === (zoomedId === "Total" || zoomedId === null || zoomedId === 'Beetlejuice' || zoomedId === 'Big Fish' || zoomedId === 'La Planète des singes' ? 1 : 2)}
                    labelsSkipRadius={1}
                    labelTextColor='black'
                    tooltip={({ id, value, percentage, color, depth }) => (
                        <strong style={{ color: '#000' }}>
                            {id}{depth > 1 ? null : ':'} {depth > 1 ? null : value} {depth === 2 || depth === 0 ? null : '(' + percentage.toFixed(2) + '%)'}
                        </strong>
                    )}
                    zoomedId={zoomedId}
                    motionConfig="slow"
                    onClick={node => {
                        setZoomedId(zoomedId === node.id ? null : node.id)
                    }}
                    onMouseEnter={event => {
                        setMoonIn(true);
                        setCursorVariant(true);
                    }}
                    onMouseLeave={event => {
                        setMoonIn(false);
                        setCursorVariant(false);
                    }}
                    borderWidth={moonIn ? 1 : 0}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.1
                            ]
                        ]
                    }}
                    defs={[
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'transparent',
                            color: 'inherit',
                            rotation: -45,
                            lineWidth: 0,
                            spacing: 8
                        },
                    ]}
                    fill={[
                        {
                            match: {
                                depth: 1
                            },
                            id: 'lines'
                        }
                    ]}
                />
            </motion.div>
        </motion.div>
    )
}
export default FavoriteFilms