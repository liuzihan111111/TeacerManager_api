const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  tid: {  // 工号
    type: String,
    required: true
  },
  /*   tname: {  //姓名
      type: String,
      required: true
    }, */
  subject_title: { // 课题名称
    type: String,
    required: true
  },
  subject_time: String,  // 时长
  subject_funding: Number, // 经费
  subject_desc: String, // 科研描述
  check: Number,  // 审核状态  0未审核，1审核通过，2审核不通过
  apply_time: String, // 申请时间
  check_time: String, // 审核时间
  conform: String,  // 材料证明
  mark: String,  // 审核说明
  t_id: {  // 外键 教师表
    type: mongoose.Schema.Types.ObjectId, ref: "teacher"
  }
}, {
    timestamps: true,
  })

const Project = mongoose.model('project', projectSchema)
module.exports = Project
