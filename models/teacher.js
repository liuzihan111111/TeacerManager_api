const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  /* calssId: {
    type: Schema.Types.objectId,
    ref: 'schedule'
  }, */
  tid: {   //账号
    type: String,
    required: true
  },
  tpwd: {
    type: String,
    required: true
  },
  tname: {  //姓名
    type: String,
    required: true
  },
  address: String,
  sex: String,
  birth: String, //出生日期
  marriage: String, //婚姻状态
  polity: String, //政治面貌
  edu: String, //学历
  major_name: String,
  duty: String, //职务
  tel: String,//电话
  remark: String, //备注
  check: Number,  // 审核状态  0未审核，1审核通过，2审核不通过
}, {
    timestamps: true,
  });

const Teacher = mongoose.model('teacher', TeacherSchema);
module.exports = Teacher;
