import React from 'react'
import { Card, CardHeader, CardContent, CardTitle, Badge } from '../components/UI.jsx'
import { INDICES, COUNTRIES, MEDIA_COST } from '../data/indices'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

export default function Benchmarks(){
  const bar = Object.keys(INDICES).map(code=>({ country: COUNTRIES[code], overall: INDICES[code].overall }))
  const cost = Object.keys(MEDIA_COST).map(code=>({ country: COUNTRIES[code], ...MEDIA_COST[code] }))
  return (<div className='mx-auto max-w-7xl px-4 py-10'>
    <div className='flex items-center gap-3 mb-2'><h1 className='text-2xl font-semibold'>跨国对比 · Benchmarks</h1><Badge>演示</Badge></div>
    <p className='text-slate-600 mb-6'>整体出海指数与广告成本对比，便于评估预算与节奏。</p>
    <div className='grid md:grid-cols-2 gap-6'>
      <Card><CardHeader className='pb-2'><CardTitle>整体出海指数对比</CardTitle></CardHeader><CardContent className='h-72'>
        <ResponsiveContainer width='100%' height='100%'><BarChart data={bar}><XAxis dataKey='country'/><YAxis domain={[40,100]}/><Tooltip/><Legend/><Bar dataKey='overall' name='出海指数' fill='#2563eb'/></BarChart></ResponsiveContainer>
      </CardContent></Card>
      <Card><CardHeader className='pb-2'><CardTitle>广告成本对比（示例，$）</CardTitle></CardHeader><CardContent className='h-72'>
        <ResponsiveContainer width='100%' height='100%'><BarChart data={cost}><XAxis dataKey='country'/><YAxis/><Tooltip/><Legend/><Bar dataKey='CPM' fill='#10b981'/><Bar dataKey='CPC' fill='#f59e0b'/><Bar dataKey='CPI' fill='#ef4444'/></BarChart></ResponsiveContainer>
      </CardContent></Card>
    </div>
  </div>)
}
