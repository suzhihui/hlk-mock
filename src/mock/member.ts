import { formatDays } from './../utils/index';
import { IMemberCoustomeAction, ICustomer } from './../types/index.d';
import faker from 'faker'
import { Response, Request } from 'express'
faker.locale = "zh_CN";

const memberList: ICustomer[] = []
let memberCount = 100
for(let i = 0; i < memberCount; i++) {
  memberList.push({
    id: i,
    merchant_id: 10000 + i,
    shop_id: 20000 + i,
    name: faker.name.findName(),
    pinyin: faker.name.findName(),
    mobile: faker.phone.phoneNumber(),
    gender: faker.name.findName(),
    avatar: faker.image.avatar(),
    no: faker.name.findName(),
    actionList: []
  })
}

// function _getActionList(i):IMemberCoustomeAction {
//   return []
// }
// todo (顾客动态列表) 根据日期显示数据

export const getMembers = (req: Request, res: Response)=> {
  // params
  const {
    type, // 1=>日期; 2=>月
    page = 1, // 页码
    limit = 20, // 分页
    isSystole = false, // 是否是缩略
    curDate = new Date().getTime(), // 当前日期时间戳
    sort,
  } = req.query
  memberList.forEach((item, i) => {
    item.actionList = _renderData(type, isSystole, curDate)
  })

  const pageList =  memberList.filter((_, i) => i < limit * page && i >= limit * (page - 1))
  // console.log(pageList)
  return res.json({
    code: 200,
    ts: new Date().getTime(),
    data: {
      total: memberCount,
      items: pageList
    }
  })
}

const _renderData = (type, isSystole, curDate):IMemberCoustomeAction[] => {
  // 日期动态 一个月数据（初次：当前日期的前后15天数据; 左右滑加载 前后一个月）
  if(type == 1) {
    // const today = new Date(curDate).getDate()
    const dayTimes = 24*60*60*1000
    const datePrvied = curDate - 15 * dayTimes
    const dateNext = curDate + 15 * dayTimes
    const sD = new Date(datePrvied)
    const eD = new Date(dateNext)
    return _actionList(curDate, sD, eD, 15)
  }

  // 月动态 一年数据（初次：当前月和前11个月；左右滑 前后半年（6个月）
  if(type == 2) {
    // 缩略模式 可由前端处理
    if(isSystole) {
      
    }
    // 展开
    else {

    }
    // 当前月 mock month data
    let _mon = new Date(curDate).getMonth()
    let _year = new Date(curDate).getFullYear()
    let _monList:string[] = []
    // 11个月
    for(let i = 0; i < 12; i++) {
      // 下一年
      if(_mon == 0) {
        _mon = 12
        _year--
      }
      else {
        _monList.push(`${_year}-${_mon}-28`)
      }
      _mon--
    }
    console.log(_monList)
    return _actionList(curDate, new Date(_monList[0]), new Date(_monList[_monList.length - 1]), 12 * faker.random.arrayElement([1, 6]))
  }
}

const _pendZroe = (sN:string):string => {
  if(sN.length < 2) {
    return sN.padStart(2, '0')
  }
  return sN
}

// mock 区间 事项
/**
 * @param {dateTimes} curDate 当前时间戳
 * @param {date} sD 开始时间戳
 * @param {date} eD 结束时间戳
 * @param {number} items mock数据条数
 */
const _actionList = (curDate,sD, eD, items) => {
  // 当前日期
  
  const actionList:IMemberCoustomeAction[] = []
  const dList = [] // 日期范围
  for(let i = 0; i< items; i++) {
    let d = faker.date.between(sD, eD)
    const {
      year,
      month,
      day
    } = formatDays(d)
    dList.push(`${year}-${month}-${day}`)
  }
  dList.sort()
  dList.forEach(item => {
    let ds = item.split('-')
    let _id = ~~(ds[0] + _pendZroe(ds[1]) + _pendZroe(ds[2]))
    let _now = new Date(item).getTime()
    let _history = _now < curDate // 是否过成为历史
    actionList.push({
      id: _id,
      merchant_id: _id,
      shop_id: _id,
      customer_id: _id,
      action_time: _now,
      is_history: _history, 
      is_pending: faker.random.boolean(),
      type: faker.random.arrayElement(['service', 'consume', 'service_cycle', 'consume_cycle', 'sms', 'call', 'birth', 'remark']),
      batch_serial: faker.random.boolean(), // 循环事件唯一标识
      remark: null,
      amount: faker.random.number(180),
      cash_amount: faker.random.number(120),
      noncash_amount: faker.random.number(240),
      ext: null,
      status: faker.random.arrayElement([2, 3]),
      action_status: faker.random.arrayElement([2, 3]),
      create_user: null,
      create_ts: faker.date.past(ds[0]).getTime(),
      last_update_ts: faker.date.past(ds[0]).getTime(),
      last_update_user: null
    })
  })

  return actionList
}