import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar/Navbar';
import styles from './update.module.css';

const UpdateEquipment = () => {
    const router = useRouter();
    const { id } = router.query;
    const [customerName, setCustomerName] = useState('');
    const [equipmentName, setEquipmentName] = useState('');
    const [station, setStation] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (id) {
            const fetchEquipment = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/equipments/${id}`);
                    const equipment = response.data;
                    setCustomerName(equipment.customer_name);
                    setEquipmentName(equipment.equipment_name);
                    setStation(equipment.station);
                    setSerialNumber(equipment.serial_number); // โหลดข้อมูล serial number ที่มีอยู่
                } catch (error) {
                    console.error('Error fetching equipment:', error);
                }
            };

            fetchEquipment();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            customer_name: customerName,
            equipment_name: equipmentName,
            station: station,
            serial_number: serialNumber, // อัปเดต serial number
        };

        try {
            await axios.put(`http://localhost:5000/api/equipments/update/${id}`, updatedData);
            setMessage('Equipment updated successfully!');
            router.push({
                pathname: '/equipment-list',
                query: { updatedId: id, successMessage: 'Update Equipment Successfully' }
            });
        } catch (error) {
            console.error('Error updating equipment:', error);
            setMessage('Failed to update equipment. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.title}>Update Equipment</h1>
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
                    <button type="submit" className={styles.button}>Update Equipment</button>
                </form>
                {message && <p className={styles.successMessage}>{message}</p>}
            </div>
        </div>
    );
};

export default UpdateEquipment;
