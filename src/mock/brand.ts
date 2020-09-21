// 品牌相关api
import { Response, Request } from 'express';
import faker from 'faker'
import moment from 'moment'
import { cloneDeep } from 'lodash';
import { iStore } from 'src/types/brand';
faker.locale = 'zh_CN'

const storeList:Array<iStore> = []
const ts = Date.now()
const storeCount:number = 100;
for(let i = 0; i< storeCount; i++) {
    storeList.push({
        shopId: 1000+i,
        merchantId: 81,
        name: `直属${i+1}店`,
        isVisible: 'Y',
        photos: ['upload/81/103/4f9e135a6a76493887eb030b00bb6d31.jpg', 'upload/81/103/0fe690284b944789a8c5274306624bc6.jpg'],
        phone: (1380013800+i)+'',
        areaTag: '标签'+faker.name.firstName(3),
        address: faker.address.city(3),
        longitude: 30.499165,
        latitude: 114.418707,
        seqNo: 1,
    })
}
// 查询门店

export const getStoreList = (req: Request, res: Response) => {
    const { pageNum: page, pageSize: limit} = req.query
    let pageList: Array<iStore> = storeList
    if(page&&limit) {
        pageList = storeList.filter((_, i) => i < limit * page && i >= limit * (page - 1))
    }
    res.json({
        code: 'SUCCESS',
        message: '操作成功',
        content: pageList,
        total: storeCount
    })
}