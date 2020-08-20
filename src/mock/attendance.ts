import { IAttendanceRecord, IClassList, IAttendRecord, ISchedules, IAttendanceRecords } from './../types/attendance';
// 考勤相关api
import { Response, Request } from 'express';

import faker from 'faker'
import moment from 'moment'
import { IAttendanceList } from 'src/types/attendance';
import { workerData } from 'worker_threads';
faker.locale = 'zh_CN'

/**
 * 1、今天所在月份
 * 2、组装月份第一天到今天的考勤数据
 * daysInMonth() 获取当月的天数。
 */
// 考勤列表
const attendanceList:Array<IAttendanceList> = []
const now = Date.now()
// 100个员工
let attendanceCount:number = 100
let queryMonthDate = null
for(let i = 0; i<attendanceCount; i++) {
    attendanceList.push({
        userInfo: {
            userId: 1000+i,
            userName: '老'+faker.name.firstName(3),
            avatar: '',
            gender: faker.random.arrayElement(['F', 'M'])
        },
        list: []
    })
}

let classList:Array<IClassList> = []

/**
 * @param {number} dayCount 月份的天数
 */
function getAttendanceList(dayCount):Array<IAttendanceRecord> {
    let res:Array<IAttendanceRecord> = []
    // console.log(curDate.format('YYYY-MM-DD'),'=====================', dayCount)
    for(let i = 0; i<dayCount; i++) {
        const _firstDay = queryMonthDate.format('YYYY-MM-DD')
        let workDate = moment(_firstDay).add(i, 'd').valueOf()
        res.push({
            id: 1000+i,
            merchantId: 81,
            shopId: 41,
            shopName: '直属一店',
            workDate: workDate,
            goWorkTime: faker.random.arrayElement(['09:'+faker.random.number({min:10, max: 30}), '09:'+faker.random.number({min:31,max:59})]),
            outWorkTime: faker.random.arrayElement(['18:30', '19:'+faker.random.number({min:10, max: 59})]),
            scheduleShiftId: faker.random.arrayElement([0, 1, 2, 3]),
            status: faker.random.arrayElement(['normal', 'exception']),
            workStatus: faker.random.arrayElement(['normal', 'late', 'early', 'lateEarly', 'noWork']),
            remark: faker.name.firstName(3)+'的备注',
            createTs: workDate,
            lastUpdateTs: workDate,
            lastUpdateUser: '老苏',
        })
    }
    return res
}
// 给每个员工加考勤记录
function convertAttendList(dayCount){
    attendanceList.forEach(item => {
        item.list = getAttendanceList(dayCount)
    })
}
// 获取考勤列表
export const getAtteList = (req: Request, res: Response) => {
    const {
        year,
        month,
        pageNum: page,
        pageSize: limit,
    } = req.query
    // 请求参数
    if(year && month) {
        queryMonthDate = moment(`${year}-${month}-01`)
        // 请求的月份有多少天
        let dayCount:number = queryMonthDate.daysInMonth()
        console.log('-------------', dayCount)
        // 根据请求的参数取数据
        convertAttendList(dayCount)
        res.json({
            code: 'SUCCESS',
            message: '操作成功',
            content: attendanceList,
            total: attendanceCount
        })

    } else {
        res.json({
            code: 'FIAL',
            message: '请传入年份和月份'
        })
    }
}

// 获取个人考勤列表
export const getAttePerson = (req: Request, res: Response) => {
    const {
        startTime,
        endTime,
        userId,
    } = req.query
    // 找到当前员工
    const _user = attendanceList.filter(item => item.userInfo.userId == userId)
    let user = null
    if(_user.length) {
        user = _user[0]
    } else {
        res.json({
            code: 'FIAL',
            message: '当前员工不存在!'
        })
    }
    if(!startTime||!endTime) {
        res.json({
            code: 'FIAL',
            message: '请求参数不合法!'
        })
    }
    console.log('startTime', startTime, 'endTime', endTime)
    queryMonthDate = moment(Number(startTime))
    let eTime = moment(Number(endTime))
    let diff =  eTime.diff(queryMonthDate, 'days')
    console.log(diff, 'diff')
    user.list = getAttendanceList(diff)
    res.json({
        code: 'SUCCESS',
        message: '操作成功',
        content: user,
        total: diff
    })
    // 返回时间段内的考勤
    
}
// 获取所有员工
export const getAtteAll = (req: Request, res: Response) => {
    let users = attendanceList.map(item => item.userInfo)
    res.json({
        code: 'SUCCESS',
        message: '操作成功',
        content: users
    })
}

//  *********************************  yapi 接口mock *************************************/
const attendanceMap:Array<IAttendRecord> = []
const recordCount: number = 100 //100个员工
for (let i = 0; i < recordCount; i++) {
    const uId = 1000 + i
    const uName = '老'+faker.name.firstName(1).toString()
    const uNo = (1000 + i).toString()
    attendanceMap.push({
        userId: uId,
        userName: uName,
        userNo: uNo,
        attendanceRecords: _getAttendancedList(uId, uName, uNo, i),
        schedules: _getSchedulesList(uId, uName, uNo, i)
    })
}
function _getSchedulesList(...arg): Array<ISchedules> {
    let res: Array<ISchedules> = []
    if (arg[0] < 1003) {
        
    }
    return res
}
// 加三条历史数据
function _getAttendancedList(...arg):Array<IAttendanceRecords> {
    let res:Array<IAttendanceRecords> = []
    if (arg[0] < 1003) {
        let checkInTime = Date.now() + (3600 * 8)
        let checkOutTime = Date.now()
        let shift = JSON.stringify({ name: '早班', shortName: '早', checkInTime, checkOutTime })
        res.push({
            id: 2000+arg[3],
            merchantId: 288880,
            shopId: 103,
            userName: arg[1],
            checkDate: Date.now(),
            checkInTime,
            checkOutTime,
            userId: arg[0],
            shiftId: 2000+arg[3], 
            shift,
            status: faker.random.arrayElement(['NORMAL', 'XCEPTION', 'ABSENCE']),
            checkStatus: faker.random.arrayElement(['NORMAL', 'LATE', 'EARLY', 'LATE_EARLY']),
            remark: arg[1]+'的备注'
        })
    }
    return res
}
// 动态加排班信息
function addSchedules() {}
// TODO　获取门店所有员工/指定员工 排班和考勤记录
export const attendanceRecord = (req: Request, res: Response) => {
    const {
        shopId,
        userId, 
        startTime,   // 开始时间 时间戳
        endTime,     // 结束时间 时间戳
        calculated,  // 是否统计
        scheduled,   // 是否获取排班
        pageNum: page,
        pageSize: limit,
    } = req.query
    let pageList: any[] = []
    pageList = attendanceMap
    // 1) 有分页
    if(page&&limit) {
        pageList = attendanceMap.filter((_, i) => i < limit * page && i >= limit * (page - 1))
    }
    // 2) 要获取排班
    if (scheduled) {
    }
    // 3）要获取统计
    if (calculated) {}
    // 4) 只获取考勤
    // pageList = attendanceMap.filter(item => item.attendanceRecords && item.attendanceRecords.length)
    console.log(page, limit, 'xxxx')
    console.log(pageList, '---', attendanceMap.length)
    res.json({
        code: 'SUCCESS',
        message: '操作成功',
        content: pageList,
        total: recordCount
    })
}

// 添加班次设置
export const addConfig=(req: Request, res: Response) => {
    const {configList} = req.body
    let _count = classList.length
    if(configList.length) {
        configList.forEach((item, i) => {
            classList.push({
                id: _count+i+1,
                name: item.name,
                shopId: 103,
                checkInTime: item.checkInTime,
                checkOutTime: item.checkOutTime,
                merchantId: 288880,
                // status: faker.random.arrayElement(['NORMAL', 'DELETED']),
                status: faker.random.arrayElement(['NORMAL']),
                shortName: item.name.substring(0,1)
            })
        })
        res.json({
            code: 'SUCCESS',
            message: '操作成功'
        })
    }
    else {
        res.json({
            code: 'FIAL',
            message: '请求参数不合法!'
        })
    }
}
// 获取门店班次设置
export const queryConfig=(req: Request, res: Response) => {
    const {shopId} = req.query
    let code:string = 'SUCCESS'
    let message:string = '操作成功'
    console.log('classList', classList);
    // let _list = classList?classList.filter(item => item.shopId == shopId):classList
    res.json({
        code,
        message,
        content: classList
    })
}
// 获取门店班次设置
export const deleteConfig=(req: Request, res: Response) => {
    const { id }:any = req.params
    let code:string = 'SUCCESS'
    let message: string = '操作成功'
    console.log(id, ' -----', req.params)
    let _index = classList.findIndex(item => item.id == id)
    let _dObj = null
    if (_index > -1) {
        // _dObj = classList.splice(_index,1)
        // 软删除
        classList[_index]['status'] = 'DELETED'
        res.json({
            code,
            message,
            content: _dObj
        })
    } else {
        res.json({
            code: 'FIAL',
            message: '传参无效'
        })
    }
}
// todo 保存/修改员工排班设置
export const modifyShift=(req: Request, res: Response) => {
    const { shifts } = req.body
    if (shifts && shifts.length) {
        // 1：userId 找到对应的员工
        // 2: shfitId和shift没传则删除， 反之修改
        // 3: 
    } else {
        res.json({
            code: 'FIAL',
            message: '传参无效'
        })
    }
}

// todo 考勤打卡
export const addRecord = (req: Request, res: Response) => {

}

// todo 修改考勤记录
export const modifyRecord = (req: Request, res: Response) => {

}