// 门店信息
export interface iStore{
    merchantId  :number             //    商户 ID	
    shopId      :number             //    门店 ID	
    name        :string             //    门店名称	
    photos      :Array<string>      //    门店照片
    isVisible   :string             //    是否显示在小程序Y:是N:否	
    phone	    :string             //    电话	
    areaTag	    :string             //    区域标签	
    address	    :string             //    门店地址	
    longitude	:number             //    经度	
    latitude	:number             //    纬度	
    seqNo       :number            //排序
}