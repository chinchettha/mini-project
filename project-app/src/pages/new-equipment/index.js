import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import styles from './new-equipment.module.css';

const NewEquipment = () => {
    const [customerName, setCustomerName] = useState('');
    const [equipmentName, setEquipmentName] = useState('');
    const [station, setStation] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [picture, setPicture] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('customer_name', customerName);
        formData.append('equipment_name', equipmentName);
        formData.append('station', station);
        formData.append('serial_number', serialNumber);
        formData.append('picture_path', picture);

        try {
            await axios.post('http://localhost:5000/api/equipments/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Regis New Equipment Success');
            setCustomerName('');
            setEquipmentName('');
            setStation('');
            setSerialNumber('');
            setPicture(null);
        } catch (error) {
            setMessage('Failed to add equipment. Please try again.');
        }
    };

    const handlePictureChange = (e) => {
        setPicture(e.target.files[0]);
    };

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.title}>New Equipment Registration</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Customer Name:</label>
                        <input 
                            type="text" 
                            value={customerName} 
                            onChange={(e) => setCustomerName(e.target.value)} 
                            className={styles.input} 
                            placeholder="Enter customer name"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Equipment Name:</label>
                        <input 
                            type="text" 
                            value={equipmentName} 
                            onChange={(e) => setEquipmentName(e.target.value)} 
                            className={styles.input} 
                            placeholder="Enter equipment name"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Station:</label>
                        <input 
                            type="text" 
                            value={station} 
                            onChange={(e) => setStation(e.target.value)} 
                            className={styles.input} 
                            placeholder="Enter station"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Serial Number:</label>
                        <input 
                            type="text" 
                            value={serialNumber} 
                            onChange={(e) => setSerialNumber(e.target.value)} 
                            className={styles.input} 
                            placeholder="Enter serial number"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Picture:</label>
                        <input 
                            type="file" 
                            onChange={handlePictureChange} 
                            className={styles.input} 
                        />
                    </div>
                    <button type="submit" className={styles.button}>Regis New Equipment</button>
                </form>
                {message && <p className={styles.successMessage}>{message}</p>}
            </div>
        </div>
    );
};

export default NewEquipment;
