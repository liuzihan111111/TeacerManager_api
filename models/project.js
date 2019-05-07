const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  tid: {  // 工号
    type: String,
    required: true
  },
  tname: {  //姓名
    type: String,
    required: true
  },
  subject_title: { // 课题名称
    type: String,
    required: true
  },
  subject_time: String,  // 时长
  subject_funding: Number, // 经费
  subject_desc: String, // 科研描述
  check: Boolean,  // 审核状态
  apply_time: String, // 申请时间
  check_time: String, // 审核时间
  complete: Boolean  // 是否完成
}, {
    timestamps: true,
  })

const Project = mongoose.model('project', projectSchema)
module.exports = Project
