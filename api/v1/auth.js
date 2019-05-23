const express = require('express');
//引入数据库表
const { Admin, Major, Teacher, Schedule, Salary, Project, Edu } = require('../../models/index');
const router = express.Router();

//登录
router.post('/admin_login', async (req, res) => {
  try {
    // console.log(req.body)
    if (!req.body.username || !req.body.password) {
      res.json({
        code: 0,
        status: 'error',
        info: '用户名或密码不能为空！'
      })
      return;
    }
    if (req.body.username == 'admin' && req.body.password == 'admin') {
      res.json({
        code: 1,
        status: 'success',
        info: '登录成功',
        type: 0,
        mess: req.body
      })
    } else {

      const detail = await Teacher.findOne({ 'tid': req.body.username })
      const admin = await Admin.findOne({ 'admin_id': req.body.username })
      if (detail) {
        // console.log(count)
        if (detail.tpwd == req.body.password) {
          res.json({
            code: 1,
            status: 'success',
            info: '登录成功',
            type: 1,
            mess: req.body,
            allmess: detail
          })
        } else {
          res.json({
            code: 0,
            status: 'error',
            info: '密码有误',
          })
        }
      } else if (admin) {
        if (admin.admin_pwd == req.body.password) {
          res.json({
            code: 1,
            status: 'success',
            info: '登录成功',
            type: 2,
            mess: req.body,
            allmess: admin
          })
        } else {
          res.json({
            code: 0,
            status: 'error',
            info: '密码有误',
          })
        }
      } else {
        res.json({
          code: 0,
          status: 'error',
          info: '用户名不存在',
        })
      }
    }

  } catch (error) {
    res.json({
      code: 0,
      status: error,
      info: '登录失败'
    })
  }

})

/* *****管理员操作****** */

// 1. 管理员列表页面
router.get('/admin/AdminList', async (req, res) => {
  try {
    //console.log()
    var data = {}
    if (req.query.major_name) {
      data.major_name = new RegExp(req.query.major_name)
    }
    if (req.query.admin_id) {
      data.admin_id = new RegExp(req.query.admin_id)
    }
    if (req.query.admin_pwd) {
      data.admin_pwd = new RegExp(req.query.admin_pwd)
    }
    //console.log(data)
    const admins = await Admin.find(data).sort({ "admin_id": 1 })
    res.json({
      code: 1,
      status: 'success',
      info: admins
    })
  } catch (error) {
    res.json({
      code: 0,
      status: 'error',
      info: error
    })
  }
})

// 2. 获取新增管理员信息
router.post('/admin/creatAdmin', async (req, res) => {
  try {
    console.log(req.body);
    //获取传递的参数
    const p = new Admin({
      admin_id: req.body.admin_id,
      admin_pwd: "000000",
      major_name: req.body.major_name,
      type: 2
    })
    await p.save();
    res.json({
      code: 1,
      info: '添加成功',
    })
  } catch (error) {
    res.json({
      code: 0,
      info: error,
    })
  }
})

// 3. 删除管理员信息
router.delete('/admin/delete/:id', async (req, res) => {
  try {
    //获取id
    const id = req.params.id;
    console.log(id);
    await Admin.findOneAndDelete({
      _id: id,
    })
    res.json({
      code: 1,
      info: '删除成功'
    })
  } catch (error) {
    res.json({
      code: 0,
      info: error,
    })
  }

})

// 4. 修改管理员信息
router.post('/admin/ModifyAdmin/:id', async (req, res) => {
  try {
    var id = req.params.id;
    console.log(id)
    console.log(req.body);
    await Admin.findByIdAndUpdate({ _id: id }, req.body)
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
      id
    })
  }
})

/* *******学院操作******* */

//学院列表
router.get('/majorList', async function (req, res) {
  try {
    var quertInfo = {}
    if (req.query.major_name) {
      // 按学院名查询
      quertInfo.major_name = new RegExp(req.query.major_name)
    }
    MajorQuery(req, quertInfo, res)
  } catch (error) {
    res.json({
      code: 0,
      status: 'error',
      info: error
    })
  }

})
async function MajorQuery(req, queryInfo, res) {
  const allCount = await Major.countDocuments(queryInfo)
  // console.log(allCount)
  // console.log(req)
  const page = req.query.page * 1 || 1;
  const per = req.query.per * 1 || 10;
  const majors = await Major.find(queryInfo).skip((page - 1) * per).limit(per);
  const pageCount = Math.ceil(allCount / per);
  res.json({
    code: 1,
    status: 'success',
    info: {
      allCount: allCount,
      pageCount: pageCount,
      page: 1,
      list: majors
    }
  })
}

//添加学院信息
router.post('/majorAdd', async (req, res) => {
  try {
    const count = await Major.count({ major_name: req.body.major_name })
    if (count > 0) {
      res.json({
        code: 0,
        info: '学院名已存在!!',
      })
    } else {
      var major = new Major(req.body);
      await major.save();
      res.json({
        code: 1,
        info: '添加成功!!',
      })
    }
  } catch (error) {
    res.json({
      code: 0,
      info: error,
    })
  }
})

//修改学院信息
router.post('/majorMod/:id', async (req, res) => {
  // console.log(req.body)
  try {
    var id = req.params.id;
    // console.log(id)
    await Major.findByIdAndUpdate({
      _id: id,
    }, {
        major_name: req.body.major_name
      });

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
      id
    })
  }
})

//学院信息删除
router.delete('/majorDel/:id', async (req, res) => {
  try {
    var id = req.params.id;
    await Major.findByIdAndDelete({ _id: id });

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
/* ***************教师信息管理**************** */

//教师信息列表
router.get('/teacherList', async (req, res) => {
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
    if (req.query.edu) {
      // 按学历查询
      quertInfo.edu = new RegExp(req.query.edu)
    }
    if (req.query.major_name) {
      // 按院系查询
      quertInfo.major_name = new RegExp(req.query.major_name)
    }
    if (req.query.duty) {
      // 按职称查询
      quertInfo.duty = new RegExp(req.query.duty)
    }
    if (req.query.tpwd) {
      // 修改密码
      quertInfo.tpwd = new RegExp(req.query.tpwd)
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
  const allCount = await Teacher.countDocuments(queryInfo)
  // console.log(allCount)
  // console.log(req)
  const page = req.query.page * 1 || 1;
  const per = req.query.per * 1 || 10;
  const teachers = await Teacher.find(queryInfo).skip((page - 1) * per).limit(per).sort({ "tid": 1 });
  const pageCount = Math.ceil(allCount / per);
  res.json({
    code: 1,
    status: 'success',
    info: {
      allCount: allCount,
      pageCount: pageCount,
      page: 1,
      list: teachers
    }
  })
}


//教师信息添加
router.post('/teacherAdd', async (req, res) => {
  try {
    let obj = { ...req.body };
    obj.tpwd = '000000';
    console.log(obj)
    var teacher = new Teacher(obj)
    await teacher.save();
    res.json({
      code: 1,
      status: "success",
      info: "添加成功",
      obj
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
router.delete('/teacherDel/:id', async (req, res) => {
  try {
    var id = req.params.id;
    await Teacher.findByIdAndDelete({ _id: id });

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
router.post('/teacherMod/:id', async (req, res) => {
  // console.log(req.body)
  try {
    var id = req.params.id;
    // console.log(id)
    await Teacher.findByIdAndUpdate({
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

/* ****************排课信息管理****************** */
//授课列表
router.get('/schedule/list', async (req, res) => {
  /*
    page 页码
    per 每页显示的数量
    quertInfo{} 查询条件（模糊查询）
   */
  try {
    console.log(req.query)
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
      quertInfo.cname = new RegExp(req.query.cname)
    }
    if (req.query.ClassPlace) {
      // 按上课地点
      quertInfo.ClassPlace = new RegExp(req.query.ClassPlace)
    }
    if (req.query.Student) {
      // 按班级查询
      quertInfo.Student = new RegExp(req.query.Student)
    }
    ScheduleQuery(req, quertInfo, res)
  } catch (error) {
    res.json({
      code: 0,
      status: 'error',
      info: error
    })
  }
})
async function ScheduleQuery(req, queryInfo, res) {
  var data = {}
  if (req.query.major_name) {
    data = { major_name: req.query.major_name }
  }
  const allCount = await Schedule.countDocuments(queryInfo)
  const page = req.query.page * 1 || 1;
  const per = req.query.per * 1 || 10;
  const schedule = await Schedule.find(queryInfo).skip((page - 1) * per).limit(per).sort({ "tid": 1 }).populate({
    path: 't_id',
    select: '_id tid tname major_name',
    match: data
  })
  // console.log(schedule)
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


//授课信息添加
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

//授课信息删除
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

//修改授课信息
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

/* ****************薪资信息管理****************** */
//薪资列表
router.get('/salary/list', async (req, res) => {
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
    SalaryQuery(req, quertInfo, res)
  } catch (error) {
    res.json({
      code: 0,
      status: 'error',
      info: error
    })
  }
})
async function SalaryQuery(req, queryInfo, res) {
  var data = {}
  if (req.query.major_name) {
    data.major_name = req.query.major_name
  }
  const allCount = await Salary.countDocuments(queryInfo)
  // console.log(allCount)
  // console.log(req)
  const page = req.query.page * 1 || 1;
  const per = req.query.per * 1 || 10;
  const salary = await Salary.find(queryInfo).skip((page - 1) * per).limit(per).sort({ "tid": 1 }).populate({
    path: 't_id',
    select: '_id tid tname major_name',
    match: data
  });
  const pageCount = Math.ceil(allCount / per);
  res.json({
    code: 1,
    status: 'success',
    info: {
      allCount: allCount,
      pageCount: pageCount,
      page: 1,
      list: salary
    }
  })
}


//薪资信息添加
router.post('/salary/add', async (req, res) => {
  try {
    var salary = new Salary(req.body)
    await salary.save();
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

//薪资信息删除
router.delete('/salary/delete/:id', async (req, res) => {
  try {
    var id = req.params.id;
    await Salary.findByIdAndDelete({ _id: id });

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

//修改薪资信息
router.post('/salary/modify/:id', async (req, res) => {
  // console.log(req.body)
  try {
    var id = req.params.id;
    // console.log(id)
    await Salary.findByIdAndUpdate({
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

/* ****************科研成果信息管理****************** */
//科研成果列表
router.get('/project/list', async (req, res) => {
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
    if (req.query.subject_title) {
      // 按项目名
      quertInfo.subject_title = new RegExp(req.query.subject_title)
    }
    if (req.query.subject_type) {
      // 按成果类别
      quertInfo.subject_type = new RegExp(req.query.subject_type)
    }
    if (req.query.subject_time) {
      // 按完成时间
      quertInfo.subject_time = new RegExp(req.query.subject_time)
    }
    ProjectQuery(req, quertInfo, res)
  } catch (error) {
    res.json({
      code: 0,
      status: 'error',
      info: error
    })
  }
})
async function ProjectQuery(req, queryInfo, res) {
  var data = {}
  if (req.query.major_name) {
    data.major_name = req.query.major_name
  }
  const allCount = await Project.countDocuments(queryInfo)
  // console.log(allCount)
  // console.log(req)
  const page = req.query.page * 1 || 1;
  const per = req.query.per * 1 || 10;
  const project = await Project.find(queryInfo).skip((page - 1) * per).limit(per).sort({ "tid": 1 }).populate({
    path: 't_id',
    select: '_id tid tname major_name',
    match: data
  });;
  const pageCount = Math.ceil(allCount / per);
  res.json({
    code: 1,
    status: 'success',
    info: {
      allCount: allCount,
      pageCount: pageCount,
      page: 1,
      list: project
    }
  })
}


//项目信息添加
router.post('/project/add', async (req, res) => {
  try {
    // console.log(req.body)
    var project = new Project(req.body)
    await project.save();
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

//项目信息删除
router.delete('/project/delete/:id', async (req, res) => {
  try {
    var id = req.params.id;
    await Project.findByIdAndDelete({ _id: id });

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

//修改项目信息
router.post('/project/modify/:id', async (req, res) => {
  // console.log(req.body)
  try {
    var id = req.params.id;
    // console.log(id)
    await Project.findByIdAndUpdate({
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
/* ****************教育经历信息管理****************** */
//教育经历列表
router.get('/edu/list', async (req, res) => {
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
    /*  if (req.query.subject_title) {
       // 按项目名
       quertInfo.subject_title = new RegExp(req.query.subject_title)
     } */
    EduQuery(req, quertInfo, res)
  } catch (error) {
    res.json({
      code: 0,
      status: 'error',
      info: error
    })
  }
})
async function EduQuery(req, queryInfo, res) {
  const allCount = await Edu.countDocuments(queryInfo)
  // console.log(allCount)
  // console.log(req)
  const page = req.query.page * 1 || 1;
  const per = req.query.per * 1 || 10;
  const edu = await Edu.find(queryInfo).skip((page - 1) * per).limit(per).sort({ "tid": 1 }).populate('t_id');
  const pageCount = Math.ceil(allCount / per);
  res.json({
    code: 1,
    status: 'success',
    info: {
      allCount: allCount,
      pageCount: pageCount,
      page: 1,
      list: edu
    }
  })
}


//项目信息添加
/* router.post('/project/add', async (req, res) => {
  try {
    // console.log(req.body)
    var project = new Project(req.body)
    await project.save();
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
}) */

//教育信息删除
router.delete('/edu/delete/:id', async (req, res) => {
  try {
    var id = req.params.id;
    await Edu.findByIdAndDelete({ _id: id });

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

//修改教育信息
router.post('/edu/modify', async (req, res) => {
  // console.log(req.body)
  try {
    // console.log(id)
    await Edu.findOneAndUpdate({ tid: req.body.tid }, req.body, { upsert: true });

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

//教师基本信息分组
router.get('/teacher/group/:query', async (req, res) => {
  // console.log("$" + req.params.query)
  // console.log(req.query)
  const allCount = await Teacher.countDocuments(req.query)
  const data = "$" + req.params.query
  try {
    const list = await Teacher.aggregate([{ $match: req.query }, { $group: { _id: data, num: { $sum: 1 } } }])
    // console.log(list)
    res.json({
      code: 1,
      mess: '分组成功',
      info: {
        allCount,
        list
      },
    })
  } catch (error) {
    res.json({
      code: 0,
      mess: "分组失败",
      info: error,
    })
  }
})






module.exports = router;
