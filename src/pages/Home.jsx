import React, { useRef, useState } from 'react'
import { Button, Card, CardHeader, CardContent, CardTitle, Badge, Input, Select } from '../components/UI.jsx'
import WorldMap from '../components/WorldMap.jsx'
import { generateReport } from '../utils/ai.js'
import { COUNTRIES, TRENDS, COLOR } from '../data/indices'
import { BarChart2, Download } from 'lucide-react'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts'
import html2canvas from 'html2canvas'
import { Link } from 'react-router-dom'

export default function Home(){
  const [industry, setIndustry] = useState('电商')
  const [priority, setPriority] = useState('平衡')
  const [markets, setMarkets] = useState(['THA','IDN','MYS','VNM','SGP'])
  const [result, setResult] = useState(null)
  const reportRef = useRef(null)

  const onSubmit = (e)=>{ e.preventDefault(); const r = generateReport({ industry, markets, goal:'增长', priority }); setResult(r); setTimeout(()=>document.getElementById('ai-report')?.scrollIntoView({behavior:'smooth'}),50) }
  const downloadReport = async ()=>{ if(!reportRef.current) return; const canvas = await html2canvas(reportRef.current,{backgroundColor:'#fff', scale:2}); const a=document.createElement('a'); a.href=canvas.toDataURL('image/png'); a.download='blue-index-report.png'; a.click() }

  return (<div className='min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900'>
    <header className='sticky top-0 z-40 backdrop-blur bg-white/70 border-b'><div className='mx-auto max-w-7xl px-4 py-3 flex items-center justify-between'>
      <div className='flex items-center gap-2'><div className='h-8 w-8 rounded-xl bg-slate-900 text-white grid place-items-center font-bold'>BI</div><span className='font-semibold'>Blue Index</span><Badge className='ml-2'>AI native</Badge></div>
      <nav className='hidden md:flex items-center gap-6 text-sm'><a href='#map' className='hover:text-slate-600'>地图</a><a href='#qa' className='hover:text-slate-600'>AI 问答</a><Link to='/benchmarks' className='hover:underline'>跨国对比</Link></nav>
    </div></header>

    <section id='map' className='mx-auto max-w-7xl px-4 py-10'><div className='mb-3 flex items-end justify-between'><h1 className='text-2xl md:text-3xl font-semibold tracking-tight'>全球出海指数 · 可交互地图</h1><Badge>悬停看指数，点击进详情</Badge></div><WorldMap/></section>

    <section id='qa' className='bg-slate-50 border-y'><div className='mx-auto max-w-7xl px-4 py-12'>
      <div className='mb-6 flex items-end justify-between'><h2 className='text-xl md:text-2xl font-semibold tracking-tight'>AI 问答 · 一键生成出海报告</h2><Badge>Demo</Badge></div>
      <Card><CardHeader className='pb-2'><CardTitle>填写你的需求</CardTitle></CardHeader><CardContent>
        <form onSubmit={onSubmit} className='grid md:grid-cols-3 gap-4'>
          <div><div className='text-sm mb-1'>行业</div><Input value={industry} onChange={e=>setIndustry(e.target.value)} placeholder='如：电商 / 游戏 / App / 短剧' /></div>
          <div><div className='text-sm mb-1'>优先策略</div><Select options={['平衡','成本优先','增长优先']} value={priority} onChange={e=>setPriority(e.target.value)} /></div>
          <div><div className='text-sm mb-1'>目标市场（多选）</div><div className='flex flex-wrap gap-2'>{['THA','IDN','MYS','VNM','SGP'].map(c=>(<label key={c} className='flex items-center gap-2 text-sm bg-white border rounded-xl px-3 py-1.5'><input type='checkbox' checked={markets.includes(c)} onChange={()=> setMarkets(m=> m.includes(c)?m.filter(x=>x!==c):[...m,c]) }/><span className='w-3 h-3 rounded-full' style={{background: COLOR[c]}}></span>{COUNTRIES[c]}</label>))}</div></div>
          <div className='md:col-span-3 flex items-center gap-3 justify-end'><Button type='submit' className='flex items-center gap-2'><BarChart2 className='w-4 h-4'/> 生成报告</Button></div>
        </form>
      </CardContent></Card>

      {result && (<div id='ai-report' ref={reportRef} className='mt-8'>
        <div className='flex items-center justify-between mb-2'><h3 className='text-lg font-semibold'>出海报告（演示）</h3><Button className='flex items-center gap-2' onClick={downloadReport}><Download className='w-4 h-4'/> 导出PNG</Button></div>
        <Card><CardHeader className='pb-2'><CardTitle>推荐目标市场：{COUNTRIES[result.top.code]}（综合得分 {result.top.score}）</CardTitle></CardHeader>
          <CardContent className='grid md:grid-cols-2 gap-6'>
            <div className='h-64'><ResponsiveContainer width='100%' height='100%'><RadarChart data={[{k:'行业概况',v:result.top.detail.market},{k:'消费者画像',v:result.top.detail.consumer},{k:'媒介',v:result.top.detail.media},{k:'竞对',v:result.top.detail.competitor}]}><PolarGrid/><PolarAngleAxis dataKey='k'/><Radar dataKey='v' stroke='#2563eb' fill='#60a5fa' fillOpacity={0.4}/></RadarChart></ResponsiveContainer></div>
            <div><div className='font-medium mb-2'>建议与说明</div><ul className='list-disc pl-5 text-sm space-y-1'>{result.reco.map((t,i)=>(<li key={i}>{t}</li>))}</ul>
              <div className='font-medium mt-4 mb-2'>推荐渠道配比（演示）</div><div className='h-40'><ResponsiveContainer width='100%' height='100%'><BarChart data={result.mix}><XAxis dataKey='ch'/><YAxis/><Tooltip/><Bar dataKey='pct' fill='#0ea5e9'/></BarChart></ResponsiveContainer></div>
            </div>
          </CardContent>
        </Card>
        <div className='grid md:grid-cols-2 gap-6 mt-6'>
          <Card><CardHeader className='pb-2'><CardTitle>备选市场排名</CardTitle></CardHeader><CardContent><ol className='list-decimal pl-6 text-sm space-y-1'>{result.scored.map(s=>(<li key={s.code}><Link className='underline' to={`/country/${s.code}`}>{COUNTRIES[s.code]}</Link> — 得分 {s.score}</li>))}</ol></CardContent></Card>
          <Card><CardHeader className='pb-2'><CardTitle>趋势对比（Top 1）</CardTitle></CardHeader><CardContent className='h-40'><ResponsiveContainer width='100%' height='100%'><LineChart data={TRENDS[result.top.code].map((v,i)=>({m:`M${i+1}`, v}))}><XAxis dataKey='m'/><YAxis domain={[40,100]}/><Tooltip/><Legend/><Line type='monotone' dataKey='v' name='热度指数' stroke='#ef4444' dot={false}/></LineChart></ResponsiveContainer></CardContent></Card>
        </div>
      </div>)}
    </div></section>
  </div>)
}
