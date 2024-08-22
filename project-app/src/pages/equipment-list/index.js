import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar/Navbar';
import styles from './equipment-list.module.css';

const EquipmentList = () => {
    const router = useRouter();
    const { updatedId, successMessage } = router.query;
    const [equipments, setEquipments] = useState([]);
    const [showMessage, setShowMessage] = useState(!!successMessage);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/equipments');
                setEquipments(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000); // 5 วินาที
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/equipments/delete/${id}`);
            setEquipments(equipments.filter(equipment => equipment._id !== id));
        } catch (error) {
            console.error('Error deleting equipment:', error);
        }
    };

    const filteredEquipments = equipments.filter(equipment =>
        equipment.equipment_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.station.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.title}>Equipment List</h1>
                {showMessage && <p className={styles.successMessage}>{successMessage}</p>} {/* แสดงข้อความสำเร็จ */}
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search"
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img src="/icons/search-icon.png" alt="Search" className={styles.searchIcon} />
                </div>
                <ul className={styles.list}>
                    {filteredEquipments.map((equipment) => (
                        <li
                            key={equipment._id}
                            className={`${styles.listItem} ${equipment._id === updatedId ? styles.updated : ''}`} // ไฮไลท์รายการที่ถูกอัปเดต
                        >
                            <div className={styles.imageContainer}>
                                {equipment.picture_path && (
                                    <img src={`http://localhost:5000/uploads/${equipment.picture_path}`} alt={equipment.equipment_name} className={styles.image} />
                                )}
                            </div>
                            <div className={styles.details}>
                                <p><strong>Customer Name</strong>: {equipment.customer_name}</p>
                                <p><strong>Equipment Name</strong>: {equipment.equipment_name}</p>
                                <p><strong>Station</strong>: {equipment.station}</p>
                                <p><strong>Serial Number</strong>: {equipment.serial_number}</p>
                            </div>
                            <div className={styles.icons}>
                                <a href={`/update/${equipment._id}`}>
                                    <img src="/icons/update-icon.png" alt="Update" className={styles.icon} />
                                </a>
                                <img
                                    src="/icons/delete-icon.png"
                                    alt="Delete"
                                    className={styles.icon}
                                    onClick={() => handleDelete(equipment._id)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EquipmentList;
