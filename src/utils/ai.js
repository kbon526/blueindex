import { INDICES, COUNTRIES } from '../data/indices'
export function generateReport({ industry='电商', markets=['THA','IDN','MYS','VNM','SGP'], goal='增长', priority='平衡' }){
  const w = priority==='成本优先' ? {market:0.25,consumer:0.25,media:0.40,competitor:0.10}
    : priority==='增长优先' ? {market:0.40,consumer:0.30,media:0.20,competitor:0.10}
    : {market:0.30,consumer:0.30,media:0.30,competitor:0.10}
  const scored = markets.map(code=>{
    const x = INDICES[code] || {overall:40,market:40,consumer:40,media:40,competitor:40}
    const score = x.market*w.market + x.consumer*w.consumer + x.media*w.media + x.competitor*w.competitor
    return { code, score: Math.round(score), detail:x }
  }).sort((a,b)=>b.score-a.score)
  const top = scored[0]
  const reco = [
    `核心目标市场：${COUNTRIES[top.code]}（综合得分 ${top.score}）`,
    `行业概况指数 ${top.detail.market}｜消费者画像指数 ${top.detail.consumer}｜媒介指数 ${top.detail.media}｜竞对指数 ${top.detail.competitor}`,
    `建议路径：先在 ${COUNTRIES[top.code]} 试水→放量→扩张；素材聚焦本地热门风格；投放以高性价比渠道为主。`
  ]
  const mix = priority==='成本优先' ? [{ch:'TikTok',pct:40},{ch:'Meta',pct:35},{ch:'Google',pct:25}]
    : priority==='增长优先' ? [{ch:'Meta',pct:40},{ch:'TikTok',pct:35},{ch:'Google',pct:25}]
    : [{ch:'Meta',pct:35},{ch:'TikTok',pct:35},{ch:'Google',pct:30}]
  return { scored, top, reco, mix }
}
