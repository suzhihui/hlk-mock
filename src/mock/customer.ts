import { IResponseAdvSearch, IAdvSearchItem, ICustomerListItem, IRequestMemberInfo, IResponseMemberInfo, ImemberDetail, ImemberItem } from './../types/customer.d';
import { IActionDayItem, IActionDay, ICustomerItem, ICustomerInfo, IActionMonItem, IActionMon, IActionMonExt, IRequestActionAdd, IRequestActionUpdate } from './../types/index.d';
// 顾客
import { Response, Request } from 'express';
import faker from 'faker'
import { ITypeCountItem } from 'src/types';
import { getDayStr, compare, filterArr } from './../utils';
import { IclassItems, IClasses, IMetaTs, IActionTodo } from 'src/types/customer';
import moment from 'moment'
faker.locale = "zh_CN"

const metedata:any = {
  "code": "SUCCESS",
  "message": null,
  "metaTs": null,
  "success": true,
  "content": {
    "classify": [
        {
          "code": "POTENTIAL",
          "typeCode": "STAGE",
          "name": "潜在客",
          "shortName": "潜",
          "color": "#71D187",
          "type": "DEFAULT"
        },
        {
          "code": "TRIAL",
          "typeCode": "STAGE",
          "name": "体验客",
          "shortName": "体",
          "color": "#FFA76A",
          "type": "DEFAULT"
        },
        {
          "code": "MEMBER",
          "typeCode": "STAGE",
          "name": "会员",
          "shortName": "会",
          "color": "#FE6C6C",
          "type": "DEFAULT"
        },
        {
          "code": "DANGER",
          "typeCode": "STAGE",
          "name": "临时会员",
          "shortName": "临",
          "color": "#538FFF",
          "type": "DEFAULT"
        },
        {
          "code": "BJK_3",
          "typeCode": "XFNL",
          "name": "B级客",
          "shortName": "B",
          "color": "#5656",
          "type": "AUTO"
        },
        {
          "code": "CJHY_5",
          "typeCode": "DK",
          "name": "初级会员",
          "shortName": "初",
          "color": "#FE6C6C",
          "type": "MANUAL"
        },
        {
          "code": "ZJHY",
          "typeCode": "DK",
          "name": "中级会员",
          "shortName": "中",
          "color": "#F8E71C",
          "type": "MANUAL"
        },
        {
          "code": "AJK_10",
          "typeCode": "XFNL_5",
          "name": "A级客",
          "shortName": "A",
          "color": "#F5A623",
          "type": "AUTO"
        },
        {
          "code": "BJK_11",
          "typeCode": "XFNL_5",
          "name": "B级客",
          "shortName": "B",
          "color": "#8B572A",
          "type": "AUTO"
        },
        {
          "code": "CJK_12",
          "typeCode": "XFNL_5",
          "name": "C级客",
          "shortName": "C",
          "color": "#7ED321",
          "type": "AUTO"
        },
        {
          "code": "DJK",
          "typeCode": "XFNL_5",
          "name": "D级客",
          "shortName": "D",
          "color": "#BD10E0",
          "type": "AUTO"
        },
        {
          "code": "GJHY",
          "typeCode": "DK",
          "name": "高级会员",
          "shortName": "高",
          "color": "#50E3C2",
          "type": "MANUAL"
        }
    ],
     "actionType": [
        {
           "code": "SERVICE",
           "name": "到店记录",
           "icon": null,
           "shortName": "到",
           "isPending": "N"
        },
        {
           "code": "CONSUME",
           "name": "消费记录",
           "icon": null,
           "shortName": "消",
           "isPending": "N"
        },
        {
           "code": "BIRTH",
           "name": "生日",
           "icon": null,
           "shortName": "生",
           "isPending": "Y"
        },
        {
           "code": "CALL",
           "name": "电话回访",
           "icon": null,
           "shortName": "电",
           "isPending": "Y"
        },
        {
           "code": "SMS",
           "name": "短信回访",
           "icon": null,
           "shortName": "短",
           "isPending": "Y"
        },
        {
           "code": "SERVICE_CYCLE",
           "name": "到店周期",
           "icon": null,
           "shortName": "到",
           "isPending": "Y"
        },
        {
           "code": "SERVICE_WARN",
           "name": "长时间未到店",
           "icon": null,
           "shortName": "长",
           "isPending": "N"
        },
        {
           "code": "SERVICE_DANGER",
           "name": "超长时间未到店",
           "icon": null,
           "shortName": "超",
           "isPending": "N"
        },
        {
           "code": "YYLD",
           "name": "预约到店",
           "icon": "sdf",
           "shortName": "预",
           "isPending": "Y"
        },
        {
           "code": "HZSR",
           "name": "孩子生日",
           "icon": "esse officia",
           "shortName": "sit",
           "isPending": "Y"
        }
     ],
     "tagType": [
        {
           "code": "FZ",
           "name": "肤质"
        },
        {
           "code": "JK",
           "name": "健康"
        },
        {
           "code": "FS",
           "name": "肤色"
        }
     ],
     "classifyType": [
        {
           "code": "STAGE",
           "name": "会员阶段",
           "type": "DEFAULT"
        },
        {
           "code": "XFNL_5",
           "name": "消费能力",
           "type": "AUTO"
        },
        {
           "code": "DK",
           "name": "会员阶段",
           "type": "MANUAL"
        }
     ],
     "tag": [
        {
           "code": null,
           "name": "干性",
           "typeCode": "FZ"
        },
        {
           "code": null,
           "name": "健康",
           "typeCode": "JK"
        },
        {
           "code": null,
           "name": "油性",
           "typeCode": "FZ"
        },
        {
           "code": null,
           "name": "白色",
           "typeCode": "FS"
        },
        {
           "code": null,
           "name": "黄色",
           "typeCode": "FS"
        },
        {
           "code": null,
           "name": "中性",
           "typeCode": "FZ"
        },
        {
           "code": null,
           "name": "亚健康",
           "typeCode": "JK"
        },
        {
           "code": null,
           "name": "黑色",
           "typeCode": "FS"
        }
     ],
     "source": [
        {
           "code": "DZDP",
           "name": "大众点评"
        },
        {
           "code": "GoI5G",
           "name": "员工带客"
        },
        {
           "code": "CS",
           "name": "测试"
        },
        {
           "code": "MT",
           "name": "美团"
        },
        {
           "code": "KDK",
           "name": "客带客"
        },
        {
           "code": "SMKR",
           "name": "上门客人"
        }
     ],
     "logTpl": [
        {
           "code": "HFRZ_13",
           "title": "回访日志",
           "isVisible": "N"
        },
        {
           "code": "HLRZ_14",
           "title": "护理日志",
           "isVisible": "N"
        },
        {
           "code": "DXH2F_15",
           "title": "短信回2访",
           "isVisible": "N"
        }
     ],
     "qureyConfig": []
  }
}
// metadata
export const getMetadata = (req: Request, res: Response) => {
  res.json(metedata)
}


// 顾客概要数据
const classItemCon:Array<IClasses> = [
  {
    classifyTypeCode: 'STAGE',
    detail:[
      {
        count: 28,
        classifyCode: 'MEMBER',
      },
      {
        count: 61,
        classifyCode: 'DANGER',
      },
      {
        count: 31,
        classifyCode: 'POTENTIAL',
      },
      {
        count: 65,
        classifyCode: 'TRIAL',
       }
    ]
  },
  {
    classifyTypeCode: 'XFNL_5',
    detail:[
      {
        count: 28,
        classifyCode: 'BJK_11',
      },
      {
        count: 61,
        classifyCode: 'CJK_12',
      },
      {
        count: 309,
        classifyCode: 'DJK',
       }
    ]
  },
  {
    classifyTypeCode: 'DK',
    detail:[
      {
        
        count: 26,
        classifyCode: 'CJHY_5',
        
      },
      {
        
        count: 42,
        classifyCode: 'ZJHY',
        
      },
      {
        
        count: 419,
        classifyCode: 'GJHY',
        
      }
    ]
  },
  // {
  //   classifyTypeCode: '手动分类项2',
  //   detail:[
  //     {
        
  //       count: 4,
  //       classifyCode: 'MEMBER',
        
  //     },
  //     {
        
  //       count: 48,
  //       classifyCode: 'DANGER',
        
  //     },
  //     {
        
  //       count: 81,
  //       classifyCode: '绝',
        
  //     },
  //     {
        
  //       count: 82,
  //       classifyCode: '豪',
        
  //     }
  //   ]
  // },
]

const metaTs:IMetaTs = {
  user: faker.random.number(32),
  property: faker.random.number(128),
  config: faker.random.number(18)
}
// 顾客概要统计
export const getSummary = (req: Request, res: Response) => {

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
// 提交的用户信息集合
const customerMap:Array<IRequestMemberInfo> = []
let _content:Array<ImemberItem> = []
const _responeCount = customerMap.length+1
for(let i = 0; i < _responeCount; i++) {
  let j = faker.random.number(4) || 1
  let _detail:Array<ImemberDetail>=[]
  for(let _j = 0; _j < j; _j++) {
    _detail.push({
      classifyCode: faker.name.firstName(1),
      count: faker.random.number(9) || 1
    })
  }
  _content.push({
    classifyTypeCode: faker.random.number().toString(),
    detail: _detail
  })
}
// 新增会员
export const addCustomer = (req: Request, res: Response) => {
  // console.log('run here ---------------', req.body, 'req.query', req.query);
  const {shopId, name, no, mobile} = req.query
  let code:number = 200
  let message:string = 'success'
  if(customerMap.some(item => item.mobile === req.body.mobile)) {
    code = -1
    message = '手机号已存在！'
  }
  else {
    customerMap.push(Object.assign(req.body, {id: customerMap.length}))
  }

  return res.json({
    code: code,
    message:message,
    success: code===200,
    content: _content
  })
}


const custromerList:Array<ICustomerListItem> = []
const custromerListCount:number = 100
const oneday:number = 1000 * 3600 * 24
for(let i = 0; i < custromerListCount; i++) {
  custromerList.push({
    id: 1000 + i,
    customerName: faker.name.findName('','',3),
    property: 'D2020' + faker.random.number(5),
    customerNo: 'D2020' + faker.random.number(5),
    customerTag: faker.name.firstName(1).toString(),
    mobile:faker.phone.phoneNumberFormat(11).toString(),
    gender: faker.random.arrayElement(['S', 'M']),
    shopName: faker.random.arrayElement(['慧来客云谷一店', '慧来客云谷二店']),
    consumeTotal: faker.random.number(998) || 998,
    consumeTimes: faker.random.number(99) || 1,
    lastServiceTime: faker.date.between(moment(Date.now()).subtract(1, 'month').format('YYYY-MM-DD'), new Date()).getTime().toString(),
    firstConsumeTime: faker.date.between(moment(Date.now()).subtract(1, 'month').format('YYYY-MM-DD'), new Date()).getTime().toString()
  })
}
export const getCustomer = (req: Request, res: Response) =>  {
  const {
    pageNum:page,
    pageSize:limit,
    sort
  } = req.query
  console.log(page, limit, 'xxxx')
  const pageList =  custromerList.filter((_, i) => i < limit * page && i >= limit * (page - 1))
 
  res.json({
    code: 'SUCCESS',	
    message: '',	
    success: true,
    content: pageList,
    total: custromerListCount
  })
}

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