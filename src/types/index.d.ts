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