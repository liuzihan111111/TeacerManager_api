const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassSchema = new Schema({
  /*  cid: {   //课程号
     type: String,
     required: true
   }, */
  cname: {   //课程名
    type: String,
    required: true
  },
  tid: {   //教师工号
    type: String,
    required: true
  },
  tname: {   //教师名
    type: String,
    required: true
  },
  ClassTime: {   //上课时间
    type: String,
    required: true
  },
  ClassPlace: {   //上课班级
    type: String,
    required: true
  },
  ClassHour: {   // 课时
    type: String,
    required: true
  },
  Student: {
    type: String,
    required: true
  }
}, {
    timestamps: true,
  })

const Schedule = mongoose.model('schedule', ClassSchema)
module.exports = Schedule;
