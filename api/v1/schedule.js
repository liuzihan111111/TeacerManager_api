const express = require('express');
// 引入数据库表
const { Schedule } = require('../../models/index');
const router = express.Router();

//排课列表
router.get('/schedule/list', async (req, res) => {
  /*
    page 页码
    per 每页显示的数量
    quertInfo{} 查询条件（模糊查询）
   */
  try {
    const quertInfo = {}
    if (req.query.tid) {
      // 按工号查询
      quertInfo.tid = new RegExp(req.query.tid)
    }
    if (req.query.tname) {
      // 按姓名查询
      quertInfo.tname = new RegExp(req.query.tname)
    }
    if (req.query.cname) {
      // 按课程名
      quertInfo.edu = new RegExp(req.query.cname)
    }
    if (req.query.ClassPlace) {
      // 按上课地点
      quertInfo.major_name = new RegExp(req.query.ClassPlace)
    }
    if (req.query.Student) {
      // 按班级查询
      quertInfo.duty = new RegExp(req.query.Student)
    }
    FuzzyQuery(req, quertInfo, res)
  } catch (error) {
    res.json({
      code: 0,
      status: 'error',
      info: error
    })
  }
})
async function FuzzyQuery(req, queryInfo, res) {
  const allCount = await Schedule.countDocuments(queryInfo)
  // console.log(allCount)
  // console.log(req)
  const page = req.query.page * 1 || 1;
  const per = req.query.per * 1 || 10;
  const schedule = await Schedule.find(queryInfo).skip((page - 1) * per).limit(per);
  const pageCount = Math.ceil(allCount / per);
  res.json({
    code: 1,
    status: 'success',
    info: {
      allCount: allCount,
      pageCount: pageCount,
      page: 1,
      list: schedule
    }
  })
}


//排课信息添加
router.post('/schedule/add', async (req, res) => {
  try {
    // let obj = { ...req.body };
    var schedule = new Schedule(req.body)
    await schedule.save();
    res.json({
      code: 1,
      status: "success",
      info: "添加成功",
    })
  } catch (error) {
    res.json({
      code: 0,
      status: 'error',
      info: error,
    })
  }
})

//教师信息删除
router.delete('/schedule/delete/:id', async (req, res) => {
  try {
    var id = req.params.id;
    await Schedule.findByIdAndDelete({ _id: id });

    res.json({
      code: 1,
      info: '删除成功'
    })

  } catch (error) {
    res.json({
      code: 0,
      info: error
    })
  }

})

//修改教师信息
router.post('/schedule/modify/:id', async (req, res) => {
  // console.log(req.body)
  try {
    var id = req.params.id;
    // console.log(id)
    await Schedule.findByIdAndUpdate({
      _id: id,
    }, req.body);

    res.json({
      code: 1,
      info: "修改成功",
      mess: req.body,  //返回修改后的数据
    })

  } catch (error) {
    res.json({
      code: 0,
      mess: "修改失败",
      info: error,
    })
  }
})
