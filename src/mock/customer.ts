import { IActionDayItem, IActionDay, ICustomerItem, ICustomerInfo } from './../types/index.d';
// 顾客
import { Response, Request } from 'express';
import faker from 'faker'
import { ITypeCountItem } from 'src/types';
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
const dayCustomers:Array<IActionDayItem> = []

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
  
}

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