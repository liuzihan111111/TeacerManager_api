const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  tid: {  // 工号
    type: String,
    required: true
  },
  subject_title: { // 成果名
    type: String,
    required: true
  },
  subject_type: {  // 成果类别
    type: String,
    required: true
  },
  subject_level: { //级别
    type: String,
    required: true
  },
  subject_peoples: String,  //主要完成人
  subject_time: { // 完成时间
    type: String,
    required: true
  },
  subject_win: String, // 获奖情况
  note: String, // 备注
  check: Number,  // 审核状态  0未审核，1审核通过，2审核不通过
  check_time: String, // 审核时间
  src: String,  // 材料证明
  mark: String,  // 审核说明
  t_id: {  // 外键 教师表
    type: mongoose.Schema.Types.ObjectId, ref: "teacher"
  }
}, {
    timestamps: true,
  })

const Project = mongoose.model('project', projectSchema)
module.exports = Project
