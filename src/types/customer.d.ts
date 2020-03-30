
// 顾客相关接口定义

/******************************** 顾客概要 **************************/
// 顾客概要
interface IMetaTs {
  user            : number
  property        : number
  config          : number
}
interface IclassItems {
  id              : number
  classifyCode    : string
  count           : number
  color           : string
}
interface IClasses {
  classifyType    : string
  detail          : Array<IclassItems>
}

interface ISummary {
  content: Array<IclassItems>
  metats: IMetaTs
}
// 动态
interface IAction {
  icon            : string  // 图标
  shortName       : string  // 简称
  id              : string  // 动态id
  type            : string  // 类型
  remark          : string  // 备注
}
// 待办事项
interface IActionTodo {
  customerId      : number
  field_30        : string   // 顾客名称
  stage           : number   // 会员阶段
  classifyCode    : string   // 会员维度code
  classifySubCode : string   // 会员第二维度code
  classifyThdCode : string   // 会员第三维度code
  action          : Array<IAction>
}

// 顾客信息
interface IRequestMemberInfo {
  shopId          : number    // 门店Id
  mobile          : string    // 手机号
  name            : string    // 姓名
  no              : string    // 档案号
  departmentNo    : string    // 部门号
  birth_year      : string    // 生日年份
  birth_day       : string    // 生日日期
  birth_type      : string    // L:农历  s: 阳历
  gender          : string    // 性别
  sourceCode      : string    // 来源
  remark          : string    // 备注
  id             ?: number
}
interface ImemberItem{
  classifyTypeCode: string
  detail          : Array<ImemberDetail>
}
interface ImemberDetail{
  classifyCode    : string
  count           : number
}
// 新增用户 返回数据
interface IResponseMemberInfo{
  content        : Array<ImemberItem>
  metaTs        ?: IMetaTs
}

/******************************** 顾客概要 end **************************/
/******************************** 动态 action **************************/
// 日动态
interface IActionDay {
  type            : string
  remark          : string
  actionTime      : number    // 动态时间
  isPending       : string    // 是否待办事项 Y:是 N:否
  actionStatus    : string    // 事项完成状态FINISHEDD: 已完成，UNFINISHED：未完成
}

// 月动态 action
interface IActionMon {
  actionDay       : string,   // 2020-01-01
  isConsume       : boolean   // 是否有消费
}

// 月动态缩略 action
interface IActionMonExt {
  actionTimes     : number,   // 动态次数
  actionMonth     : string,   // 2020-01-01
  isConsume       : boolean   // 是否有消费
}

// 月动态
export interface IActionMonItem{
  coustomer       : ICustomerItem
  actions          : Array<IActionMon|IActionMonExt>
}
// 月动态缩略
export interface IActionMonListExt{
  coustomer       : Array<ICustomerItem>
  actions          : Array<IActionMonExt>
}

// 顾客信息
interface ICustomerInfo {
  name            : string      // 资产名称
  leaveTime       : number      // 剩余次数
}
export interface ICustomerItem {
  id              : string
  name            : string
  mobile          : string
  stage           : string // 会员阶段 -> POTENTIAL：潜客; TRIAL：体验客; MEMBER：会员; DANGER：临界会员; 
  items           : Array<ICustomerInfo>
}

// 新增动态请求参数
export interface IRequestActionAdd{
  merchantId  : number   // 商户id
  type        : string   // 动态类型
  remark      : string
  rule        : {
      day     : number   // 间隔天数
      cycles  : string   // 循环次数
    }
}

// 修改动态请求参数
export interface IRequestActionUpdate{
  remark          : string
  status          : string   // 状态
  actionStatus    : string   // 事项状态
  feedBack        : string   // 反馈内容
  finishUser      : string   // 完成人
}

// 顾客高级查询搜索器
export interface IRequestAdvSearch{
  merchantId      :number
  shopId          :number
  userId          :number
}
export interface IResponseAdvSearch{
  configs         :Array<IAdvSearchItem>
}
export interface IAdvSearchItem{
  queryName       :string  // 搜索器名称
  detail          :string  // 搜索条件详情
  isMobileEnable  :string  // 是否手机可用 y/n
  id              :string
}
// 搜索器新增
export interface IAdvSearchAdd{
  merchantid      :number
  shopId          :number
  userId          :number
  detail          :number
  isMobileEnable  :string
}
// 搜索器修改
export interface IAdvSearchIMutify{
  id              :number
  newName         : string
  detail          : string
}