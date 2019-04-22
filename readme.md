# 高校教师信息管理系统

```bash

    http:localhost:3000

```
# 后台接口

## 一、管理员操作

```bash

1.管理员列表
  url
    /api/v1/admin/AdminList
  method
    get
  params
    无
  result
    成功
      {
        code:1,
        status:'success',
        info:'成功',
        result:admins
      }
    失败
      {
        code:0,
        status:'error',
        info:error
      }
2. 新增管理员
  url
    /api/v1/admin/creatAdmin
  method
    post
  params
    {
      admin_id:string, 管理员账号
      admin_pwd: "000000", 管理员密码
      admin_name: string, 管理员名字
      major_name: string,  管理员所属院系
      type: 1   账号类型 1表示管理员账号
    }
  result
    成功
      {
        code: 1,
        info: '添加成功',
      }
    失败
      {
        code: 0,
        info: error,
      }
3. 删除管理员信息
  url
    /api/v1/admin/delete/:id
  method
    delete
  params
    {
      _id: string 管理员id
    }
  result
    成功
      {
        code: 1,
        info: '删除成功',
      }
    失败
      {
        code: 0,
        info: error,
      }
4. 修改管理员信息
  url
    /api/v1/admin/ModifyAdmin
  method
    post
  params
    {
      _id: string 管理员id （参数）
      admin_id
      admin_pwd
      admin_name
      major_name
    }
  result
    成功
      {
        code: 1,
        info: "修改成功",
        mess: req.body,  //返回修改后的数据
      }
    失败
      {
        code: 0,
        mess: "修改失败",
        info: error,
      }

```
。。。。。。。。。。。。。。。。。。。。。。。。

## 二、学院操作

```bash

1.学院列表
  url
    /api/v1/majorList
  method
    get
  params
    无
  result
    成功
      {
        code:1,
        status:'success',
        info:'成功',
        result:list
      }
    失败
      {
        code:0,
        status:'error',
        info:error
      }
2. 添加学院信息（不能重复）
  url
    /api/v1/majorAdd
  method
    post
  params
    {
      major_name: string,  院系名
    }
  result
    成功
      {
        code: 1,
        info: '添加成功',
      }
    失败
      {
        code: 0,
        info: error,
      }
      {
        code: 0,
        info: '学院名已存在',
      }
3. 删除学院信息
  url
    /api/v1/majorDel/:id
  method
    delete
  params
    {
      _id: string 学院id
    }
  result
    成功
      {
        code: 1,
        info: '删除成功',
      }
    失败
      {
        code: 0,
        info: error,
      }
4. 修改学院信息
  url
    /api/v1/majorMod/:id
  method
    post
  params
    {
      major_name: string,  院系名
    }
  result
    成功
      {
        code: 1,
        info: "修改成功",
        mess: req.body,  //返回修改后的数据
      }
    失败
      {
        code: 0,
        mess: "修改失败",
        info: error,
      }

```
。。。。。。。。。。。。。。。。。。。。。。。

## 三、教师信息操作

```bash

1.教师基本信息列表
  url
    /api/v1/teacherList
  method
    get
  params
    无
  result
    成功
      {
        code:1,
        status:'success',
        info:'成功',
        result:list
      }
    失败
      {
        code:0,
        status:'error',
        info:error
      }
2. 添加教师信息
  url
    /api/v1/teacherAdd
  method
    post
  params
    {
      tid: String  //账号
      tpwd:String  // 密码
      tname:   // 姓名
      address:String,  // 住址
      sex:String,  // 性别
      birth:Date, //出生日期
      marriage:String, //婚姻状态
      polity:String, //政治面貌
      edu:String, //学历
      major_name:String,
      duty:String, //职务
      tel:String,//电话
      remark:String //备注
    }
  result
    成功
      {
        code: 1,
        status: "success",
        info: "添加成功"
      }
    失败
      {
        code: 0,
        status: 'error',
        info: error,
      }
3. 删除教师信息
  url
    /api/v1/teacherDel/:id
  method
    delete
  params
    {
      _id: string 教师id
    }
  result
    成功
      {
        code: 1,
        info: '删除成功',
      }
    失败
      {
        code: 0,
        info: error,
      }
4. 修改教师信息
  url
    /api/v1/teacherMod/:id
  method
    post
  params
    {
     tid: String  //账号
      tpwd:String  // 密码
      tname:   // 姓名
      address:String,  // 住址
      sex:String,  // 性别
      birth:Date, //出生日期
      marriage:String, //婚姻状态
      polity:String, //政治面貌
      edu:String, //学历
      major_name:String,
      duty:String, //职务
      tel:String,//电话
      remark:String //备注
    }
  result
    成功
      {
        code: 1,
        info: "修改成功",
        mess: req.body,  //返回修改后的数据
      }
    失败
      {
        code: 0,
        mess: "修改失败",
        info: error,
      }

```
