// 考勤表
export interface IAttendanceRecord{
    id                      :number     // 考勤ID
    merchantId              :number     // 商户ID
    shopId                  :number     // 门店ID
    shopName                :string     // 门店名称
    // userId                  :number     // 员工ID
    // userName                :string     // 员工名称
    workDate                :number     // 打卡工作日期
    goWorkTime              :string     // 上班打卡时间
    outWorkTime             :string     // 下班打卡时间
    scheduleShiftId         :number     // 排班ID
    status                  :string     // 状态: normal, exception, 正常， 异常 
    workStatus              :string     // 工作状态: normal, late, early, lateEarly > 正常，迟到，早退， 迟到早退
    remark                  :string     // 备注 
    createTs                :number     // 创建时间
    lastUpdateTs            :number     // 最后更新时间
    lastUpdateUser          :string     // 最后更新用户
}
// 员工信息
interface IUserInfo{
    userId                  :number     // 员工ID
    userName                :string     // 员工名称
    avatar                  :string     // 员工头像
    gender                  :string     // 员工性别
}
// 考勤列表
export interface IAttendanceList{
    list     :Array<IAttendanceRecord>
    userInfo :IUserInfo

}