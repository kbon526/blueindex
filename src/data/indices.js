// 基础指数 + 更丰富的结构化数据（演示）
export const COUNTRIES = { THA:'Thailand', IDN:'Indonesia', MYS:'Malaysia', VNM:'Vietnam', SGP:'Singapore' }

export const COLOR = { THA:'#2563eb', IDN:'#10b981', MYS:'#f59e0b', VNM:'#ef4444', SGP:'#8b5cf6', DEFAULT:'#cbd5e1' }

export const INDICES = {
  THA:{ overall:75, market:72, consumer:70, media:68, competitor:60 },
  IDN:{ overall:90, market:88, consumer:82, media:76, competitor:74 },
  MYS:{ overall:70, market:73, consumer:68, media:66, competitor:62 },
  VNM:{ overall:80, market:84, consumer:72, media:65, competitor:58 },
  SGP:{ overall:65, market:62, consumer:77, media:70, competitor:66 },
}

export const TRENDS = {
  THA:[65,66,67,68,69,70,71,72,73,74,75,75],
  IDN:[70,72,74,76,78,80,82,84,86,88,89,90],
  MYS:[55,57,59,61,63,64,65,66,67,68,69,70],
  VNM:[50,53,56,58,60,62,65,68,71,74,77,80],
  SGP:[60,60,61,61,62,62,63,63,64,64,65,65],
}

// 购物平台份额（%）
export const PLATFORM_SHARE = {
  THA:[{name:'Shopee', value:42},{name:'Lazada', value:30},{name:'TikTok Shop', value:18},{name:'Others', value:10}],
  IDN:[{name:'Shopee', value:45},{name:'Tokopedia', value:28},{name:'TikTok Shop', value:17},{name:'Others', value:10}],
  MYS:[{name:'Shopee', value:50},{name:'Lazada', value:30},{name:'TikTok Shop', value:12},{name:'Others', value:8}],
  VNM:[{name:'Shopee', value:55},{name:'Lazada', value:22},{name:'Tiki', value:15},{name:'Others', value:8}],
  SGP:[{name:'Shopee', value:35},{name:'Lazada', value:30},{name:'Qoo10', value:15},{name:'Others', value:20}],
}

// 支付方式偏好（%）
export const PAYMENT_PREF = {
  THA:[{k:'电子钱包',v:45},{k:'银行卡',v:35},{k:'货到付款',v:10},{k:'其他',v:10}],
  IDN:[{k:'电子钱包',v:55},{k:'银行转账',v:25},{k:'货到付款',v:10},{k:'其他',v:10}],
  MYS:[{k:'电子钱包',v:40},{k:'银行卡',v:45},{k:'货到付款',v:5},{k:'其他',v:10}],
  VNM:[{k:'电子钱包',v:35},{k:'银行卡',v:25},{k:'货到付款',v:30},{k:'其他',v:10}],
  SGP:[{k:'银行卡',v:60},{k:'电子钱包',v:35},{k:'其他',v:5}],
}

// 广告成本Benchmarks（示例）
export const MEDIA_COST = {
  THA:{ CPM:1.8, CPC:0.09, CPI:1.5 },
  IDN:{ CPM:1.2, CPC:0.06, CPI:1.1 },
  MYS:{ CPM:1.6, CPC:0.08, CPI:1.3 },
  VNM:{ CPM:1.1, CPC:0.05, CPI:1.0 },
  SGP:{ CPM:3.0, CPC:0.20, CPI:2.8 },
}

// 物流与履约（示例）
export const LOGISTICS = {
  THA:{ leadDays:3, freeShipRate:0.6, returnRate:0.08 },
  IDN:{ leadDays:4, freeShipRate:0.55, returnRate:0.07 },
  MYS:{ leadDays:3, freeShipRate:0.62, returnRate:0.06 },
  VNM:{ leadDays:4, freeShipRate:0.50, returnRate:0.09 },
  SGP:{ leadDays:2, freeShipRate:0.70, returnRate:0.05 },
}

// 节假日（简化示例）
export const HOLIDAYS = {
  THA:['Songkran（4月中）','Loy Krathong（11月）','国庆日（12/5）'],
  IDN:['斋月/开斋节（变动）','独立日（8/17）','圣诞节（12/25）'],
  MYS:['开斋节（变动）','国庆日（8/31）','屠妖节（10-11月）'],
  VNM:['春节（农历）','国庆（9/2）','中秋（农历8月）'],
  SGP:['春节（农历）','国庆（8/9）','屠妖节（10-11月）'],
}

// 关键词趋势（Top5 示例）
export const KEYWORDS = {
  THA:['skin care','korean fashion','snacks','gadgets','home deco'],
  IDN:['hijab','smartphone','gaming','skincare','fashion pria'],
  MYS:['smartwatch','cosmetics','home storage','fashion','supplement'],
  VNM:['ao phong','shoes','phone case','bag','beauty'],
  SGP:['ipad','laptop','sneakers','wireless earbuds','office chair'],
}

// 竞对（示例）
export const COMPETITORS = {
  THA:[{brand:'Brand A', strength:'低价 + 网红带货', risk:'同质化严重'}],
  IDN:[{brand:'Brand B', strength:'社媒矩阵 + 粉丝量大', risk:'站内评价一般'}],
  MYS:[{brand:'Brand C', strength:'物流快 + 售后好', risk:'价格偏高'}],
  VNM:[{brand:'Brand D', strength:'本地化强 + 活动多', risk:'供应不稳定'}],
  SGP:[{brand:'Brand E', strength:'高端定位 + 复购高', risk:'获客成本高'}],
}
