const mongoose = require('mongoose')
const Sechma = mongoose.Sechma

const SalarySechma = new Sechma({
  tid: {  // 教师工号
    type: String,
    required: true
  },
  basePay: {  // 基本工资
    type: Number,
    required: true
  },
  ClassFees: Number,  // 课时费
  PerformanceSalary: Number, // 效绩工资
  bonus: Number,// 奖金
  allowance: Number, // 津贴
  other: Number, // 其他
  mark: String // 备注
})

const Salary = mongoose.model('salary', SalarySechma);
module.exports = Salary;
