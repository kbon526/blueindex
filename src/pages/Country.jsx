import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { COUNTRIES, INDICES, TRENDS, COLOR, PLATFORM_SHARE, PAYMENT_PREF, MEDIA_COST, LOGISTICS, HOLIDAYS, KEYWORDS, COMPETITORS } from '../data/indices'
import { Card, CardHeader, CardContent, CardTitle, Badge } from '../components/UI.jsx'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, Radar, PieChart, Pie, Cell } from 'recharts'

export default function Country(){
  const { code } = useParams()
  const name = COUNTRIES[code] || '未知国家'
  const idx = INDICES[code]
  if (!idx) return (<div className='mx-auto max-w-4xl px-4 py-10'><div className='text-sm mb-4'><Link className='underline' to='/'>← 返回首页</Link></div><div className='text-2xl font-semibold mb-2'>{name}</div><div className='text-slate-600'>该国家暂未收录详细指数。</div></div>)

  const radar=[{k:'行业概况',v:idx.market},{k:'消费者画像',v:idx.consumer},{k:'媒介',v:idx.media},{k:'竞对',v:idx.competitor}]
  const pie = PLATFORM_SHARE[code]
  const pay = PAYMENT_PREF[code]
  const cost = MEDIA_COST[code]
  const lg = LOGISTICS[code]

  return (<div className='mx-auto max-w-7xl px-4 py-10'>
    <div className='text-sm mb-4'><Link className='underline' to='/'>← 返回首页</Link></div>
    <div className='flex items-center gap-3 mb-2'>
      <div className='w-3 h-3 rounded-full' style={{background: COLOR[code]}}></div>
      <h1 className='text-2xl font-semibold'>{name} · 国家详情</h1>
      <Badge>电商行业（演示）</Badge>
    </div>
    <p className='text-slate-600 mb-6'>四维指数、平台份额、支付偏好、广告成本、物流、节假日、关键词与竞对等。</p>

    <div className='grid md:grid-cols-2 gap-6'>
      <Card><CardHeader className='pb-2'><CardTitle>四维指数雷达</CardTitle></CardHeader><CardContent className='h-72'>
        <ResponsiveContainer width='100%' height='100%'><RadarChart data={radar}><PolarGrid/><PolarAngleAxis dataKey='k'/><Radar dataKey='v' stroke={COLOR[code]} fill={COLOR[code]} fillOpacity={0.35}/></RadarChart></ResponsiveContainer>
      </CardContent></Card>

      <Card><CardHeader className='pb-2'><CardTitle>近12个月热度趋势</CardTitle></CardHeader><CardContent className='h-72'>
        <ResponsiveContainer width='100%' height='100%'><LineChart data={TRENDS[code].map((v,i)=>({m:`M${i+1}`, v}))}><XAxis dataKey='m'/><YAxis domain={[40,100]}/><Tooltip/><Legend/><Line type='monotone' dataKey='v' name='热度指数' stroke={COLOR[code]} dot={false}/></LineChart></ResponsiveContainer>
      </CardContent></Card>
    </div>

    <div className='grid md:grid-cols-2 gap-6 mt-6'>
      <Card><CardHeader className='pb-2'><CardTitle>购物平台份额</CardTitle></CardHeader><CardContent className='h-72'>
        <ResponsiveContainer width='100%' height='100%'><PieChart><Pie data={pie} dataKey='value' nameKey='name' outerRadius={90} label>{pie.map((e,i)=>(<Cell key={i} fill={['#1d4ed8','#0ea5e9','#60a5fa','#93c5fd'][i%4]}/>))}</Pie><Tooltip/></PieChart></ResponsiveContainer>
      </CardContent></Card>

      <Card><CardHeader className='pb-2'><CardTitle>支付方式偏好</CardTitle></CardHeader><CardContent className='h-72'>
        <ResponsiveContainer width='100%' height='100%'><BarChart data={pay}><XAxis dataKey='k'/><YAxis/><Tooltip/><Legend/><Bar dataKey='v' name='占比(%)' fill={COLOR[code]} /></BarChart></ResponsiveContainer>
      </CardContent></Card>
    </div>

    <div className='grid md:grid-cols-2 gap-6 mt-6'>
      <Card><CardHeader className='pb-2'><CardTitle>广告成本 Benchmarks</CardTitle></CardHeader><CardContent>
        <div className='kv'>
          <div>CPM（$）：<b>{cost.CPM}</b></div>
          <div>CPC（$）：<b>{cost.CPC}</b></div>
          <div>CPI（$）：<b>{cost.CPI}</b></div>
        </div>
        <p className='text-xs text-slate-500 mt-2'>* 以上为示例数据，实际需以平台实时价格与素材/人群策略为准。</p>
      </CardContent></Card>

      <Card><CardHeader className='pb-2'><CardTitle>物流与履约</CardTitle></CardHeader><CardContent>
        <div className='kv'>
          <div>履约时效（天）：<b>{lg.leadDays}</b></div>
          <div>包邮率：<b>{Math.round(lg.freeShipRate*100)}%</b></div>
          <div>退货率：<b>{Math.round(lg.returnRate*100)}%</b></div>
        </div>
        <p className='text-xs text-slate-500 mt-2'>建议结合平台满减与包邮政策，在大促节点前拉高履约能力。</p>
      </CardContent></Card>
    </div>

    <div className='grid md:grid-cols-2 gap-6 mt-6'>
      <Card><CardHeader className='pb-2'><CardTitle>节假日与活动节点</CardTitle></CardHeader><CardContent>
        <ul className='list-disc pl-5 text-sm space-y-1'>{(HOLIDAYS[code]||[]).map((h,i)=>(<li key={i}>{h}</li>))}</ul>
      </CardContent></Card>

      <Card><CardHeader className='pb-2'><CardTitle>关键词趋势（Top 5）</CardTitle></CardHeader><CardContent>
        <ul className='list-disc pl-5 text-sm space-y-1'>{(KEYWORDS[code]||[]).map((k,i)=>(<li key={i}>{k}</li>))}</ul>
      </CardContent></Card>
    </div>

    <div className='mt-6'>
      <Card><CardHeader className='pb-2'><CardTitle>竞对速览</CardTitle></CardHeader><CardContent>
        <table className='table'>
          <thead><tr><th>品牌</th><th>优势</th><th>潜在风险</th></tr></thead>
          <tbody>
            {(COMPETITORS[code]||[]).map((c,i)=>(<tr key={i}><td>{c.brand}</td><td>{c.strength}</td><td>{c.risk}</td></tr>))}
          </tbody>
        </table>
      </CardContent></Card>
    </div>
  </div>)
}
