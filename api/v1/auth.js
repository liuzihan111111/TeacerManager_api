const express = require('express');
//引入数据库表
const { Admin, Major, Teacher, Schedule, Salary, Project } = require('../../models/index');
const router = express.Router();

/* *****管理员操作****** */

// 1. 管理员列表页面
router.get('/admin/AdminList', async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.json({
      code: 1,
      status: 'success',
      info: '成功',
      result: admins
    })
  } catch (error) {
    res.json({
      code: 0,
      status: 'error',
      info: error
    })
  }
})

/* //添加管理员页面
router.get('/admin/addAdmin',(req,res)=>{
  res.render('admin/Add_Admin');
}) */

// 2. 获取新增管理员信息
router.post('/admin/creatAdmin', async (req, res) => {
  try {
    console.log(req.body);
    //获取传递的参数
    const p = new Admin({
      admin_id: req.body.admin_id,
      admin_pwd: "000000",
      admin_name: req.body.admin_name,
      major_name: req.body.major_name,
      type: 1
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
router.post('/admin/ModifyAdmin', async (req, res) => {
  try {
    console.log(req.body);
    await Admin.findByIdAndUpdate({ _id: req.body.id }, {
      admin_id: req.body.admin_login,
      admin_pwd: req.body.admin_pwd,
      admin_name: req.body.admin_name,
      major_name: req.body.major_name,
    })

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
        info: '学院名已存在',
      })
    } else {
      var major = new Major(req.body);
      await major.save();
      res.json({
        code: 1,
        info: '添加成功',
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
  const teachers = await Teacher.find(queryInfo).skip((page - 1) * per).limit(per);
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
    let obj = { ...req.body };;
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
/* ****************排课信息管理****************** */
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

//排课信息删除
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

//修改排课信息
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
  const allCount = await Salary.countDocuments(queryInfo)
  // console.log(allCount)
  // console.log(req)
  const page = req.query.page * 1 || 1;
  const per = req.query.per * 1 || 10;
  const salary = await Salary.find(queryInfo).skip((page - 1) * per).limit(per);
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
    // console.log(req.body)
    const count = await Salary.countDocuments({ tid: req.body.tid })
    console.log("111" + count)
    if (count) {
      res.json({
        code: 2,
        status: 'error',
        info: "该教师工号已经存在"
      })
    } else {
      var salary = new Salary(req.body)
      await salary.save();
      res.json({
        code: 1,
        status: "success",
        info: "添加成功",
      })
    }
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

/* ****************项目信息管理****************** */
//项目列表
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
  const allCount = await Project.countDocuments(queryInfo)
  // console.log(allCount)
  // console.log(req)
  const page = req.query.page * 1 || 1;
  const per = req.query.per * 1 || 10;
  const project = await Project.find(queryInfo).skip((page - 1) * per).limit(per);
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





/*
//登录接口
router.post('/login',async (req,res)=>{
  try {
    const userCount = await User.countDocuments({
      userName:req.body.userName,
      password:req.body.password
    });
    if(userCount>0){
      //获取登录用户的信息
      const userOne=await User.find({
        userName:req.body.userName,
        password:req.body.password});
      res.json({
        status:'success',
        info:'登录成功',
        mess:userOne,
      })
    }else{
      res.json({
        status:'error',
        info:'登录失败'
      })
    }
  } catch (error) {
    res.json({
      st5atus:error,
      info:'登录失败'
    })
  }

})
*/








module.exports = router;
