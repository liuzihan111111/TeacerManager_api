const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EduSchema = new Schema({
  tid: {
    type: String,
    required: true
  },
  edu1_name: String,  // 学历（本科）
  edu1_school: String,  // 学校
  edu1_time: String,  // 时间
  edu2_name: String, // 研究生
  edu2_school: String,
  edu2_time: String,
  edu3_name: String,  // 博士
  edu3_school: String,
  edu3_time: String,
  t_id: {  // 外键 教师表
    type: mongoose.Schema.Types.ObjectId, ref: "teacher"
  }
}, {
    timestamps: true,
  })

const Edu = mongoose.model('edu', EduSchema);
module.exports = Edu;
