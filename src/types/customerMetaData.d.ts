/******************************** 顾客metadate **************************/
// 顾客分类类型
interface IClassifyType {
  code            : string   //  
  name            : string   //  "会员阶段"
  type            : string    //  "DEFAULT" //MANUAL：自定义手动分类维度;AUTO：自定义自动分类维度;DEFAULT:系统默认
}
// 顾客分类
interface IClassify {
  code            : string   //  
  name            : string   //  "会员阶段"
  typeCode        : string  //  顾客分类类型code
  type            : string   // MANUAL：自定义手动分类维度;AUTO：自定义自动分类维度;DEFAULT:系统默认
}
// 标签分类
interface ITagType {
  code            : string  //
  name            : string   //
}
interface ITag {
  code            : string  //
  name            : string   //
  typeCode        : string   // 标签分类code
}
// 动态类型
interface IActionType {
  code            : string  //
  name            : string  // eg: 到店记录
  icon            : string  // 图标
  shortName       : string  // 简称
  isPending       : string   // 是否待办事项Y：是N：否
}
// 模板
interface ILogTpl {
  id              : string  //
  title           : string  // 模板标题
  isHidden        : string   // 是否隐藏 Y:隐藏；N:显示
}
// 未处理事项
interface ICustomerConfig {
  timeoutActionColor        :string // 未处理事项颜色
  enablePolling             :string // 是否启用公海客N：否 Y：是 
  thresholdTrialPolling     :string // 体验客？月未成交，分配到公海客
  thresholdMemberPolling    :string // 会员？月未到店（消耗），分配到公海客
  thresholdServiceWarn      :string // 顾客？天未到店（消耗），生成警告待办事项
  thresholdServiceDanger    :string // 顾客？天未到店（消耗），生成危险待办事项
}
// 搜索器
interface IQueryConfig {
  id                        :number
  name                      :number
  shopId                    :number
  userId                    :number
  detail                    :number  // 搜索过虑条件
  isMobileEnable            :number
}