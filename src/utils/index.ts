export const formatDays = data => {
  const year = data.getFullYear()
  const month = data.getMonth() + 1
  const day = data.getDate()
  return {
    year,
    month,
    day
  }
}

export const getDayStr = data => {
  const year = data.getFullYear()
  const month = data.getMonth() + 1
  const day = data.getDate()
  return `${year}-${padZore(month+'')}-${padZore(day+'')}`
}

// 补零
export const padZore = function (str: string) :string {
  let res = ''
  if(str.length < 2) {
    res = '0' + str
  }
  else {
    res = str
  }
  return res
}

// 比较器（排序）
export const compare = function(prop) {
  return function(obj1, obj2) {
    let val1 = obj1[prop]
    let val2 = obj2[prop]
    if(val1<val2) {
      return -1
    } else if(val1>val2) {
      return 1
    } else {
      return 0
    }
  }
}

// 根据对象中的属性进行去重
export const filterArr = function(arr, name) {
  let hash = {};
   return arr.reduce((ss, item) => {// reduce累计器, ss是具体满足条件后返回的数据, item是数组依次循环的每一项
      hash[item[name]] ? '' : hash[item[name]] = true && ss.push(item);
      // 1、判断对象的键值是否存在
      return ss;
  }, []);
}