
export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}

/** member */
export interface ICommonJson{
  id: number,
  name: string,
  [key:string]: any
}

// 顾客动态表
export interface IMemberCoustomeAction{
  id: number,
  merchant_id: number,
  shop_id: number,
  customer_id: number,
  action_time: string | number,
  is_history: boolean,
  is_pending: boolean,
  type: string,
  batch_serial: boolean,
  remark: ICommonJson | null,
  amount: number,
  cash_amount: number,
  noncash_amount: number,
  ext: ICommonJson | null,
  status: number,
  action_status: number,
  create_user: ICommonJson | null,
  create_ts: string | number,
  last_update_ts: string | number,
  last_update_user: ICommonJson | null
}

// 顾客表
export interface ICustomer{
  id: number,
  merchant_id: number,
  shop_id: number,
  name: string,
  pinyin: string,
  mobile: string,
  gender: string,
  avatar: string,
  no: string,
  actionList: IMemberCoustomeAction[] | any
}

export interface ITransactionData {
  orderId: string
  timestamp: string | number
  username: string
  price: number
  status: string
}

/************ 顾客表 ********/

// 顾客概要统计 start
interface ITypeCountItem {
  type: string,       // 会员类型
  typeCount: string   // 类型统计
}
interface IActionsItem{
  customerName: string, // 会员名称
  actionTag: string,    // 事项标签
  customerTag: string,  // 会员标签
  action: string        // 事项详情
}
export interface ICustomerTypeCount {
  customerTypeCount: Array<ITypeCountItem>,
  actions: Array<IActionsItem>,
  allocation: number, // 新分配顾客数量
  customerTotal: string, // todo ?
}
// 顾客概要统计 end
// 顾客动态 start

// 日动态
interface ICustomerInfo{
  name: string, // 资产名称
  leaveTime: number, // 剩余次数
}
// 日动态 action
interface IActionDay {
  type: string,
  remark: string,
  actionTime: number, // 动态时间
  isPending: string, // 是否待办事项 Y:是 N:否
  actionStatus: string, // 事项完成状态FINISHEDD: 已完成，UNFINISHED：未完成
}
// 月动态 action
interface IActionMon {
  actionDay: string, // 2020-01-01
  isConsume: boolean // 是否有消费
}
// 月动态缩略 action
interface IActionMonExt {
  actionTimes: number, // 动态次数
  actionDay: string, // 2020-01-01
  isConsume: boolean // 是否有消费
}
// 顾客信息
export interface ICustomerItem {
  id: string,
  name: string,
  mobile: string,
  stage: string, // 会员阶段 -> POTENTIAL：潜客; TRIAL：体验客; MEMBER：会员; DANGER：临界会员; 
  items: Array<ICustomerInfo>,
  

}
// 日动态
export interface IActionDayItem {
  coustomer: ICustomerItem, // 顾客信息
  action: Array<IActionDay>// 顾客动态
}

export interface IActionMonList{
  coustomer: Array<ICustomerItem>,
  action: Array<IActionMon>
}

export interface IActionMonListExt{
  coustomer: Array<ICustomerItem>,
  action: Array<IActionMonExt>
}

export interface IRequestActionAdd{
  merchantId: number, // 商户id
  type: string, // 动态类型
  remark: string,
  rule: {
    day: number, // 间隔天数
    cycles: string, // 循环次数
  }
}
export interface IRequestActionUpdate{
  remark: string,
  status: string,
  actionStatus: string, // 事项状态
  feedBack: string, // 反馈内容
  finishUser: string, // 完成人
}
// 顾客动态 end