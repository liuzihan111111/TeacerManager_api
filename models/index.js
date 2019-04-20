
const mongoose=require('mongoose');
//引入接口
const Admin=require('./admin'); //管理员表
const Major=require('./major');  //院系表
const Teacher=require('./teacher'); //教师表
//连接数据库
mongoose.connect('mongodb://localhost:27017/teacherManager', {useNewUrlParser: true});

module.exports={
  Admin,
  Major,
  Teacher,
}
