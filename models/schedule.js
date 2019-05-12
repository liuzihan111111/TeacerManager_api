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
    required: true,
  },
  ClassHour: {   // 课时
    type: String,
    required: true
  },
  Student: {   // 授课班级
    type: String,
    required: true
  },
  Number: {  // 总人数
    type: Number,
    required: true
  },
  type: {  // 授课层次
    type: String,
    required: true
  },
  term: {  // 学年
    type: String,
    required: true
  },
  t_id: {  // 外键 教师表
    type: mongoose.Schema.Types.ObjectId, ref: "teacher"
  }
}, {
    timestamps: true,
  })

const Schedule = mongoose.model('schedule', ClassSchema)
module.exports = Schedule;
