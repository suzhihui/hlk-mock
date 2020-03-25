import { IResponseAdvSearch, IAdvSearchItem } from './../types/customer.d';
import { IActionDayItem, IActionDay, ICustomerItem, ICustomerInfo, IActionMonItem, IActionMon, IActionMonExt, IRequestActionAdd, IRequestActionUpdate } from './../types/index.d';
// 顾客
import { Response, Request } from 'express';
import faker from 'faker'
import { ITypeCountItem } from 'src/types';
import { getDayStr, compare, filterArr } from './../utils';
import { IclassItems, IClasses, IMetaTs, IActionTodo } from 'src/types/customer';
faker.locale = "zh_CN"

// 顾客概要数据
const classItemCon:Array<IClasses> = [
  {
    classifyType: '消费能力',
    detail:[
      {
        id: 1,
        count: 28,
        classifyCode: 'C',
        color: '#D5874E'
      },
      {
        id: 2,
        count: 61,
        classifyCode: 'B',
        color: '#9AB3D7'
      },
      {
        id: 3,
        count: 309,
        classifyCode: 'A',
        color: '#FFAF0B'
      }
    ]
  },
  {
    classifyType: '手动分类项目类别客',
    detail:[
      {
        id: 1,
        count: 26,
        classifyCode: '身',
        color: '#71D187'
      },
      {
        id: 2,
        count: 42,
        classifyCode: '基',
        color: '#FE6C6C'
      },
      {
        id: 3,
        count: 419,
        classifyCode: '疗',
        color: '#538FFF'
      }
    ]
  },
  {
    classifyType: '手动分类项2',
    detail:[
      {
        id: 1,
        count: 4,
        classifyCode: '大',
        color: '#71D187'
      },
      {
        id: 2,
        count: 48,
        classifyCode: '特',
        color: '#FE6C6C'
      },
      {
        id: 3,
        count: 81,
        classifyCode: '绝',
        color: '#FFA76A'
      },
      {
        id: 4,
        count: 82,
        classifyCode: '豪',
        color: '#538FFF'
      }
    ]
  },
]

const metaTs:IMetaTs = {
  user: faker.random.number(32),
  property: faker.random.number(128),
  config: faker.random.number(18)
}
// 顾客概要统计
export const getCustomer = (req: Request, res: Response) => {

  return res.json({
    code: 200,
    ts: new Date().getTime(),
    content: classItemCon,
    metaTs: metaTs
  })
}
let num:number = faker.random.number(9)
// 24小时内新顾客分配数
export const getNewCustomer = (req: Request, res: Response) => 
  res.json({
    code: 200,
    content: num || num++
  })

// 顾客动态
// mock data
const dayList:Array<IActionDay> = []
const dayCustomers:Array<IActionDayItem> = [] // 日动态
const monCustomers:Array<IActionMonItem> = [] // 月动态、缩略模式

const dayCustomersCount = 100
for(let i = 1; i < dayCustomersCount; i++) {
  let _len = faker.random.number(5) || 1
  const _items:Array<ICustomerInfo> =[]
  for(let j = 0; j < _len; j++) {
    _items.push({
      name: faker.name.lastName(2),
      leaveTime: faker.random.number(9)||1
    })
  }
  const _cus:ICustomerItem = {
    id: `${10000+i}`,
    name: faker.name.findName(),
    mobile: faker.phone.phoneNumber(),
    stage: faker.random.arrayElement(['POTENTIAL', 'TRIAL', 'MEMBER', 'DANGER']),
    items: _items
  }
  dayCustomers.push({
    coustomer: _cus,
    actions: [] 
  })
  monCustomers.push({
    coustomer: _cus,
    actions: []
  })
  
}

// 日动态
export const getDayList = (req: Request, res: Response) => {
  const {merchantId, customer, startTime, endTime, pageNum, pageSize} = req.query
  let _s = new Date(Number(startTime))
  let _e = new Date(Number(endTime))
  const pageList =  dayCustomers.filter((_, i) => i < pageSize * pageNum && i >= pageSize * (pageNum - 1))
  for(let i = 0; i < pageList.length; i++) {
    let _len = faker.random.number(20)
    const _act:IActionDay[] = []
    for(let j = 0; j < _len; j++) {
      _act.push({
        type: faker.random.arrayElement(['SERVICE', 'CONSUME', 'SERVICE_CYCLE', 'CONSUME_CYCLE', 'SMS', 'CALL', 'BIRTH']),
        remark: faker.random.boolean() && faker.random.words(18),
        actionTime: new Date(faker.date.between(_s, _e)).getTime(),
        isPending: faker.random.arrayElement(['Y', 'N']),
        actionStatus: faker.random.arrayElement(['FINISHEDD', 'UNFINISHED'])
      })
    }
    pageList[i].actions =[..._act]
  }

  const content:Array<IActionDayItem> = pageList


  return res.json({
    code: 200,
    message: 'success',
    exception: false,
    content: content
  })
}


// 月动态
export const getMonList = (req: Request, res: Response) => {
  const {merchantId, customer, startTime, endTime, pageNum, pageSize} = req.query
  let _s = new Date(Number(startTime))
  let _e = new Date(Number(endTime))
  const pageList =  monCustomers.filter((_, i) => i < pageSize * pageNum && i >= pageSize * (pageNum - 1))
  for(let i = 0; i< pageList.length; i++) {
    let _len = faker.random.number(12)
    const _act:IActionMon[] = []
    for(let j = 0; j < _len; j++) {
      _act.push({
        actionDay: faker.date.between(_s, _e).getTime().toString(),
        isConsume: faker.random.boolean()
      })
    }
    pageList[i].actions = [..._act]
  }
  const content:Array<IActionMonItem> = pageList

  return res.json({
    code: 200,
    message: 'success',
    exception: false,
    content: content
  })
}

// 月动态缩略
export const getMonListExt = (req: Request, res: Response) => {
  const {merchantId, customer, startTime, endTime, pageNum, pageSize} = req.query
  let _s = new Date(Number(startTime))
  let _e = new Date(Number(endTime))
  const pageList =  monCustomers.filter((_, i) => i < pageSize * pageNum && i >= pageSize * (pageNum - 1))
  let _len = faker.random.number(48)
  const _act:IActionMonExt[] = []
  pageList.forEach(item => {
    for(let i = 0; i < _len; i++) {
      _act.push({
        actionTimes: faker.random.number(99),
        actionMonth: getDayStr(new Date(faker.date.between(_s, _e))),
        isConsume: faker.random.boolean()
      })
    }
    item.actions = filterArr(_act.sort(compare('actionMonth')), 'actionMonth')
  })

  const content:Array<IActionMonItem> = pageList

  return res.json({
    code: 200,
    message: 'success',
    exception: false,
    content: content
  })
}

// 动态新增
export const addAction = (req: Request, res: Response) => {
  const {action} = req.body
  console.log(action)
  let _postData:IRequestActionAdd = action
  return res.json({
    code: 200,
    message: 'success',
    success: true,
    exception: faker.random.boolean(),
    content: '200',
    postData: _postData
  })
}

// 动态修改
export const mutifiyAction = (req: Request, res: Response) => {
  const {merchantId, id} = req.query
  const {action} = req.body
  const _putData:IRequestActionUpdate = action
  return res.json({
    code: 200,
    message: 'success',
    success: true,
    exception: faker.random.boolean(),
    content: '200', // 动态code
    postData: _putData
  })
}

/******************** 顾客高级查询搜索器 */
const searchList:Array<IAdvSearchItem> = []
let searchLen:number = faker.random.number(9)
if(searchLen == 0) searchLen++
for (let i = 0; i < searchLen; i++) {
  searchList.push({
    queryName: `搜索器${i+1}`,
    detail: faker.name.jobArea(),
    isMobileEnable: faker.random.arrayElement([`Y`, 'N']),
    id: i+''
  })
}
// 查
export const searchQuery = (req: Request, res: Response) => {
  const {merchantId, shopId, userId} = req.query
  return res.json({
    code: 200,
    message: 'success',
    configs: searchList
  })
}

// 删
export const searchDel = (req: Request, res: Response) => {
  const {merchantId, id} = req.query
  console.log(merchantId, '---', id, req.path);
  return res.json({
    code: 200,
    message: 'success'
  })
}