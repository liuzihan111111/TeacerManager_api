# 高校教师信息管理系统

```bash

    http://localhost:3000

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
      id: string 管理员id （参数）
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
    page 页码
    per 每页显示的数量
    .............
    tid
    tname
    edu
    major_name
    duty
    ........... 查询条件（模糊查询）
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
      duty:String, //职称
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
。。。。。。。。。。。。。。。。。。

## 四、排课信息操作

```bash

1.排课信息列表
  url
    /api/v1/schedule/list
  method
    get
  params
    page 页码
    per 每页显示的数量
    .............
    tid  教师工号
    tname   教师名字
    cname   课程名
    ClassPlace   上课教室
    Student    上课班级
    ........... 查询条件（模糊查询）
  result
    成功
      {
        code:1,
        status:'success',
        info:'成功',
        info: {
          allCount: allCount,
          pageCount: pageCount,
          page: 1,
          list: schedule
      }
    失败
      {
        code:0,
        status:'error',
        info:error
      }
2. 添加排课信息
  url
    /api/v1/schedule/add
  method
    post
  params
    {
      cname  课程名
      tid   教师工号
      tname   教师名
      ClassTime   上课时间
      ClassPlace  上课地点
      ClassHour   总课时
      Student    上课班级
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
3. 删除排课信息
  url
    /api/v1/schedule/delete/:id
  method
    delete
  params
    {
      _id
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
4. 修改排课信息
  url
    /api/v1/schedule/modify/:id
  method
    post
  params
    {
      cname  课程名
      tid   教师工号
      tname   教师名
      ClassTime   上课时间
      ClassPlace  上课地点
      ClassHour   总课时
      Student    上课班级
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

。。。。。。。。。。。。。。。。。。

## 五、薪资信息操作

```bash

1.薪资列表
  url
    /api/v1/salary/list
  method
    get
  params
    page 页码
    per 每页显示的数量
    .............
    tid  教师工号
    ........... 查询条件（模糊查询）
  result
    成功
      {
        code:1,
        status:'success',
        info: {
          allCount: allCount,
          pageCount: pageCount,
          page: 1,
          list: salary
        }
      }
    失败
      {
        code:0,
        status:'error',
        info:error
      }
2. 添加薪资信息
  url
    /api/v1/salary/add
  method
    post
  params
  除教师工号为string，其他都为number
    {
      tid:String   教师工号
      basePay:Number  基本工资
      ClassFees:Number   课时费
      PerformanceSalary:Number   效绩工资
      bonus: Number  奖金
      allowance: Number   津贴
      other: Number   其他
      mark: String  备注
    }
  result
    成功
      {
        code: 1,
        status: "success",
        info: "添加成功"
      }
    已存在
    {
        code: 2,
        status: 'error',
        info: "该教师工号已经存在"
      }
    失败
      {
        code: 0,
        status: 'error',
        info: error,
      }
3. 删除薪资信息
  url
    /api/v1/salary/delete/:id
  method
    delete
  params
    {
      _id
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
4. 修改薪资信息
  url
    /api/v1/salary/modify/:id
  method
    post
  params
    {
      tid:String   教师工号
      basePay:Number  基本工资
      ClassFees:Number   课时费
      PerformanceSalary:Number   效绩工资
      bonus: Number  奖金
      allowance: Number   津贴
      other: Number   其他
      mark: String  备注
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

。。。。。。。。。。。。。。。。。。

## 六、项目信息操作

```bash

1.项目列表
  url
    /api/v1/project/list
  method
    get
  params
    page 页码
    per 每页显示的数量
    .............
    tid  教师工号
    subject_title  项目名
    ........... 查询条件（模糊查询）
  result
    成功
      {
        code:1,
        status:'success',
        info: {
          allCount: allCount,
          pageCount: pageCount,
          page: 1,
          list: project
        }
      }
    失败
      {
        code:0,
        status:'error',
        info:error
      }
2. 申请项目
  url
    /api/v1/project/add
  method
    post
  params
  {
	"tid":"T0003",            工号
	"tname":"王莉",           教师名
	"subject_title":"111",    项目名
	"subject_time":"300",     时长
	"subject_funding":10000,  经费
	"subject_desc":"描述",    项目描述
	"check":false,            审核状态
	"apply_time":"2018/2/2",  申请时间
	"check_time":"" ,          审核时间
  "complete":false           是否完成
	
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
3. 删除项目信息
  url
    /api/v1/project/delete/:id
  method
    delete
  params
    {
      _id
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
4. 修改项目信息
  url
    /api/v1/project/modify/:id
  method
    post
  params
    {
      "tid":"T0003",
	    "tname":"王莉",
	    "subject_title":"111",
	    "subject_time":"300",
	    "subject_funding":10000,
	    "subject_desc":"描述",
	    "check":false,
	    "apply_time":"2018/2/2",
	    "check_time":"",
	    "complete":false
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

