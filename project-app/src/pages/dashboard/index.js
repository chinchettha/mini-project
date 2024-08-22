import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './dashboard.module.css';

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.blinkingText}>Chinchettha Namayom</h1>
                <h2 className={styles.subTitle}>Project for DEPA</h2>
            </div>
        </div>
    );
};

export default Dashboard;
