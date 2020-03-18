import { IActionDayItem, IActionDay, ICustomerItem, ICustomerInfo, IActionMonItem, IActionMon, IActionMonExt, IRequestActionAdd, IRequestActionUpdate } from './../types/index.d';
// 顾客
import { Response, Request } from 'express';
import faker from 'faker'
import { ITypeCountItem } from 'src/types';
import { getDayStr, compare, filterArr } from './../utils';
faker.locale = "zh_CN"

const typeItems: ITypeCountItem[] = []
let typeItemsCount = 4
for(let i = 0; i < typeItemsCount; i++) {
  typeItems.push({
    type: faker.name.findName(),
    typeCount: faker.random.number(120) + ''
  })
}

// 顾客概要统计
export const customerTypeCount = (req: Request, res: Response) => {

  return res.json({
    code: 200,
    ts: new Date().getTime(),
    data: {
      customerTypeCount: typeItems
    }
  })
}

// 顾客动态
// mock data
const dayList:Array<IActionDay> = []
const dayCustomers:Array<IActionDayItem> = [] // 日动态
const monCustomers:Array<IActionMonItem> = [] // 月动态、缩略模式

const dayCustomersCount = 100
for(let i = 1; i < dayCustomersCount; i++) {
  let _len = faker.random.number(5)
  const _items:Array<ICustomerInfo> =[]
  for(let j = 0; j < _len; j++) {
    _items.push({
      name: faker.name.lastName(2),
      leaveTime: faker.random.number(10)
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
    action: [] 
  })
  monCustomers.push({
    coustomer: _cus,
    action: []
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
        remark: faker.random.words(18),
        actionTime: new Date(faker.date.between(_s, _e)).getTime(),
        isPending: faker.random.arrayElement(['Y', 'N']),
        actionStatus: faker.random.arrayElement(['FINISHEDD', 'UNFINISHED'])
      })
    }
    pageList[i].action =[..._act]
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
    pageList[i].action = [..._act]
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
    item.action = filterArr(_act.sort(compare('actionMonth')), 'actionMonth')
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