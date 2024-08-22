const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
    customer_name: { type: String, required: true },
    equipment_name: { type: String, required: true },
    station: { type: String, required: true },
    serial_number: { type: String, required: true }, // เพิ่ม serial number
    picture_path: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
