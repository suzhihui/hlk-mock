import { formatDays } from './../src/utils/index';
import { ICustomer } from './../src/types/index.d';
import faker from 'faker'
faker.locale = "zh_CN";
let memberList:ICustomer[] = []

const dayTimes = 24*60*60*1000
const curDataTime = new Date().getTime()
const datePrvied = curDataTime - (15 * dayTimes)
const dateNext = curDataTime + (15 * dayTimes)

memberList.push({
  id:1,
  merchant_id: 10000 + 1,
  shop_id: 20000 + 1,
  name: faker.name.findName(),
  pinyin: faker.name.findName(),
  mobile: faker.name.findName(),
  gender: faker.name.findName(),
  avatar: faker.name.findName(),
  no: faker.name.findName(),
  actionList: []
})


const dates = faker.date.between(new Date(datePrvied), new Date(dateNext))
const sD = new Date(datePrvied)
const eD = new Date(dateNext)
const dList = []
for(let i = 0; i< 15; i++) {
  let d = faker.date.between(sD, eD)
  const {
    year,
    month,
    day
  } = formatDays(d)
  dList.push(`${year}-${month}-${day}`)
}
const typs = faker.random.arrayElement(['SERVICE', 'CONSUME', 'SERVICE_CYCLE', 'CONSUME_CYCLE', 'SMS', 'CALL', 'BIRTH'])
console.log(typeof typs)

console.log(typeof '2'.padStart(0), '___', new Date('2020-3-3').getTime())

for(let i = 12; i > 0; i--) {
  console.log(i)
}
// console.log(dates, [...new Set(dList)])
// '2'.padStart(0)