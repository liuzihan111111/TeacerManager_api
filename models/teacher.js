const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const TeacherSchema= new Schema({
  tid:{   //账号
    type:String,
    required:true
  },
  tpwd:{
    type:String,
    required:true
  },
  tname:{  //姓名
    type:String,
    required:true
  },
  address:String,
  sex:String,
  birth:Date, //出生日期
  marriage:String, //婚姻状态
  polity:String, //政治面貌
  edu:String, //学历
  major_name:String,
  duty:String, //职务
  tel:String,//电话
  remark:String //备注
},{
  timestamps:true,
});

const Teacher=mongoose.model('teacher',TeacherSchema);
module.exports=Teacher;