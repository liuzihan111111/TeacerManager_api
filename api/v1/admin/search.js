router.get('/admin/teacher', async (req, res) => {
  // page         页码
  // per          每页显示的数量
  // quertInfo{}  查询条件（模糊匹配）
  try{
    const quertInfo = {}
    if(req.query.name) {
      // 按姓名查询
      quertInfo.name = new RegExp(req.query.name)
    }
    if(req.query.teachingInfo) {
      // 按授课信息查询
      quertInfo.teachingInfo = new RegExp(req.query.teachingInfo)
    }
    if(req.query.position) {
      // 按职位查询
      quertInfo.position = new RegExp(req.query.position)
    }
    FuzzyQuery(req, quertInfo, res)
  } catch(err) {
    res.json({
      status: 'error',
      info: '查询失败'
    })
    return;
  }

})

async function FuzzyQuery(req, queryInfo, res) {
  const allCount = await Teacher.countDocuments(queryInfo)
  // console.log(allCount)
  const page = req.query.page || 1;
  const teachers = await Teacher.find(queryInfo).skip((page - 1) * req.body.per).limit(req.body.per);
  const pageCount = Math.ceil(allCount / req.body.per);
  res.json({
    status: 'success',
    info: {
      allCount: allCount,
      pageCount: pageCount,
      page: 1,
      list: teachers
    }
  })
}
