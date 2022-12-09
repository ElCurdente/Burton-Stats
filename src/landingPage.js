import './App.css';
import video from './assets/video/bg.mp4';
import React, { useEffect, useRef, useState } from 'react';
import logo from './assets/images/logo.png';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible
};

function LandingPage() {

    const [isActive, setIsActive] = useState(false);

    const vidRef = useRef(null);
    const go = () => {
        vidRef.current.play();
        setIsActive(!isActive);
    }

    useEffect(() => {
        vidRef.current.play();
    }, [])

    return (
        <motion.div className="App"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 1, transition: { duration: 1, delay: 2.5 } }}
            variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        >
            <motion.video
                muted
                loop
                id="myVideo"
                className={isActive ? 'active video' : 'video'}
                ref={vidRef}
                src={video}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}></motion.video>
            <div
                className={isActive ? 'activeVideo circle' : 'circle'}>
            </div>
            <Link
                to="/films"
                onClick={go}>
                <motion.img
                    className={isActive ? 'activeLogo logo' : 'logo'}
                    src={logo}
                    alt="logo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: .5 }} />
            </Link>
        </motion.div>
    )
}

export default LandingPage