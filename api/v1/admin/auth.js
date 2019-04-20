const express = require('express');
//引入数据库表
const { Admin, Major, Teacher } = require('../../models');
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
      admin_id: req.body.admin_login,
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
    //console.log(id);
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
    const list = await Major.find({});
    res.json({
      code: 1,
      status: 'success',
      info: '成功',
      result: list
    })
  } catch (error) {
    res.json({
      code: 0,
      status: 'error',
      info: error
    })
  }

})

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
      var major = new Major({ major_name: req.body.major_name });
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

//教师信息列表
router.get('/teacherList', async (req, res) => {
  try {
    const list = await Teacher.find({});
    res.json({
      code: 1,
      status: 'success',
      info: '成功',
      result: list
    })
  } catch (error) {
    res.json({
      code: 0,
      status: 'error',
      info: error
    })
  }
})

//教师信息添加
router.post('/teacherAdd', async (req, res) => {
  try {
    var teacher = new Teacher(req.body)
    await teacher.save();
    res.json({
      code: 1,
      status: "success",
      info: "添加成功"
    })
  } catch (error) {
    res.json({
      code: 0,
      status: 'error',
      info: error
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




/*
//注册接口
router.post('/reg',async (req,res)=>{
  //判断用户名是否存在
  const userCount=await User.countDocuments({userName:req.body.userName});
  if(userCount>0){
    res.json({
      status:'error',
      info:'用户名已存在'
    })
  }else{
    try {
      const user=new User(req.body);
      await user.save();
      res.json({
        status:'success',
        info:'注册成功'
      })

    } catch (error) {
      res.json({
        status:'error',
        info:error
      })
    }
  }


})

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

//管理员后台登录
router.post('/admin_login', (req,res)=>{
  try {
    if(req.body.userName=='admin' && req.body.password=='admin'){
      res.json({
        status:'success',
        info:'登录成功',
        mess:req.body
      })
    }else{
      res.json({
        status:'error',
        info:'用户名或密码有误',
        mess:req.body
      })
    }

  } catch (error) {
    res.json({
      status:error,
      info:'登录失败'
    })
  }

})


//获取商品信息
// params
 // per     每页显示的数量
 // page    页码
 // name    名字(模糊匹配)


//limit获取指定数量的记录，
//skip跳过指定数量的记录

 router.post('/admin/products', async (req,res)=>{
  try {

    const per=Number(req.body.per);
    const page=req.body.page || 1;
    //获取符合条件的总记录条数
    const allCount=await Product.count({name:new RegExp(req.body.name)});
    let productList=await Product.find({name:new RegExp(req.body.name)}).skip((page-1)*per).limit(per);

    //分页的页数
    pageNUm=Math.ceil(allCount/req.body.per);

    res.json({
      status:'success',
      info:"查询成功",
      mess:productList,
      count:allCount,
      pageNUm:pageNUm
    })
  } catch (error) {
    res.json({
      status:'error',
      info:error,
    })
  }

})

//商品新增
router.post('/admin/Addproducts',async (req,res)=>{
  try {
    var product=new Product(req.body);
    await product.save();
    res.json({
      status:'success',
      info:'增加成功'
    })

  } catch (error) {
    res.json({
      status:'error',
      info:error
    })
  }
})

//商品修改
router.post('/admin/Monproducts/:id',async (req,res)=>{
  try {
    var id=req.params.id;
    //console.log(req.body.name);
    //var list= await Product.find({_id:id});
    await Product.findByIdAndUpdate({
      _id:id,
    },{
      name:req.body.name ,
      price:req.body.price,
      productType: req.body.productType,
      content: req.body.content,
    });

    res.json({
      status:'success',
      info:"修改成功",
      mess:req.body  //返回修改后的数据
    })

  }  catch (error) {
    res.json({
      status:'error',
      info:error
    })
  }
})

//删除商品
router.delete('/admin/Delproducts/:id',async (req,res)=>{
  try {
    var id=req.params.id;
    await Product.findByIdAndDelete({_id:id});

    res.json({
      status:'success',
      info:'删除成功'
    })

  } catch (error) {
    res.json({
      status:"error",
      info:error
    })
  }

})
 */




module.exports = router;
