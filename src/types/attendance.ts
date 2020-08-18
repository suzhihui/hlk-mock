import { IAttendanceRecord } from './attendance';
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

// 班次列表
export interface IClassList{
    id:number, // 主键
    merchantId: number,
    shopId:number,
    name: string,
    shortName: string,
    checkInTime: string,
    checkOutTime: string,
    status: string, // 状态 NORMAL; DELETED
}

export interface IAttendRecord{
    userId  : number,
    userName: string,
    userNo  : string,    // 员工编号/工号
    schedules?:Array<ISchedules>, // 排班
    attendanceRecords: Array<ISchedules>, // 考勤
    summary?:Array<ISummary>
}
// 排班
export interface ISchedules{
    id          : number,
    merchantId  : number,
    shopId      : number,
    userId      : number,
    shiftId     : number,  // 排班班次
    shift       : string,  // 班次快照
    shiftDate   : number,  // 排班日期
    field_22    : string,  // 类型： NORMAL
}
// 考勤
export interface IAttendanceRecords{
    id              : number, 
    merchantId      : number,
    shopId          : number,
    userId          : number,
    userName        : string,  // 员工名称
    checkDate       : number,  // 打卡工作日期
    checkInTime     : number,  // 上班打卡时间
    checkOutTime    : number,  // 下班打卡时间
    shiftId         : string,  // 排班班次
    shift           : string,  // 班次快照
    status          : string,  // 状态  NORMAL：正常EXCEPTION：异常 ABSENCE:缺勤
    checkStatus     : string,  // 工作状态 NORMAL：正常LATE：迟到EARLY：早退LATE_EARLY：迟到早退
    remark          : string,  // 备注
}

export interface ISummary{
    normal      : number, // 统计合计
    late        : number,  // 正常
    early       : number,  // 迟到
    absence     : number,  // 缺勤
    exception   : number,  // 异常
    leave       : number,  // 休假
}