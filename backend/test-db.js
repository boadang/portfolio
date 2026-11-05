const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

console.log("Đang thử kết nối với URI:", uri ? uri.replace(/:([^:@]+)@/, ':****@') : "undefined (Không tìm thấy biến MONGO_URI)");

mongoose.connect(uri)
  .then(() => {
    console.log('✅ KÊNH THÀNH CÔNG! Kết nối tới MongoDB Atlas thành công.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ KẾT NỐI THẤT BẠI!');
    console.error('Chi tiết lỗi:', err.message);
    process.exit(1);
  });