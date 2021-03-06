
const mongoose = require('mongoose');
//引入接口
const Admin = require('./admin'); //管理员表
const Major = require('./major');  //院系表
const Teacher = require('./teacher'); //教师表
const Schedule = require('./schedule'); //排课信息表
const Salary = require('./salary'); // 薪资表
const Project = require('./project'); //项目表
const Edu = require('./edu'); //教育经历



//连接数据库
mongoose.connect('mongodb://localhost:27017/teacherManager', { useNewUrlParser: true });

module.exports = {
  Admin,
  Major,
  Teacher,
  Schedule,
  Salary,
  Project,
  Edu
}
