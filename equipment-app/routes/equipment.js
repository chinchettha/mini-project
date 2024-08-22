const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');
const multer = require('multer');
const path = require('path');

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Save files with unique names
    }
});

const upload = multer({ storage: storage });

// Create: เพิ่มข้อมูลใหม่ พร้อมจัดการการอัปโหลดไฟล์
router.post('/create', upload.single('picture_path'), async (req, res) => {
    try {
        const newEquipment = new Equipment({
            customer_name: req.body.customer_name,
            equipment_name: req.body.equipment_name,
            station: req.body.station,
            serial_number: req.body.serial_number, // บันทึก serial number
            picture_path: req.file ? req.file.filename : null // Save the file name if a file is uploaded
        });
        await newEquipment.save();
        res.status(201).json({ message: 'Equipment added', data: newEquipment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read: อ่านหรือดึงข้อมูลทั้งหมดมาแสดง
router.get('/', async (req, res) => {
    try {
        const equipments = await Equipment.find();
        res.status(200).json(equipments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read: อ่านข้อมูลเดี่ยวตาม ID
router.get('/:id', async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);
        res.status(200).json(equipment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update: แก้ไขข้อมูลที่มีอยู่ พร้อมจัดการการอัปโหลดไฟล์
router.put('/update/:id', upload.single('picture_path'), async (req, res) => {
    try {
        const updatedData = {
            customer_name: req.body.customer_name,
            equipment_name: req.body.equipment_name,
            station: req.body.station,
            serial_number: req.body.serial_number, // อัปเดต serial number
        };
        if (req.file) {
            updatedData.picture_path = req.file.filename; // Update the file name if a new file is uploaded
        }

        const updatedEquipment = await Equipment.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).json({ message: 'Equipment updated', data: updatedEquipment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete: ลบข้อมูล
router.delete('/delete/:id', async (req, res) => {
    try {
        await Equipment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Equipment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
