import { IAttendanceRecord } from './../types/attendance';
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
        },
        list: []
    })
}
/**
 * @param {number} dayCount 月份的天数
 */
function getAttendanceList(dayCount):Array<IAttendanceRecord> {
    let res:Array<IAttendanceRecord> = []
    for(let i = 0; i<dayCount; i++) {
        // console.log(queryMonthDate,'=====================')
        let workDate = queryMonthDate.add(i, 'd').valueOf()
        res.push({
            id: 1000+i,
            merchantId: 81,
            shopId: 41,
            shopName: '直属一店',
            workDate: workDate,
            goWorkTime: faker.random.arrayElement(['09:'+faker.random.number({min:10, max: 30}), '09:'+faker.random.number({min:31,max:59})]),
            outWorkTime: faker.random.arrayElement(['18:30', '19:'+faker.random.number({min:10, max: 59})]),
            scheduleShiftId: faker.random.arrayElement([1, 2, 3]),
            status: faker.random.arrayElement(['normal', 'exception']),
            workStatus: faker.random.arrayElement(['normal', 'late', 'early', 'lateEarly']),
            remark: faker.name.firstName(3)+'的备注',
            createTs: workDate,
            lastUpdateTs: workDate,
            lastUpdateUser: '老苏'
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