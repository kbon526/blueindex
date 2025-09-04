import React, { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { scaleLinear } from 'd3-scale'
import { useNavigate } from 'react-router-dom'
import { INDICES, COUNTRIES } from '../data/indices'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const NAME_TO_CODE = { Thailand:'THA', Indonesia:'IDN', Malaysia:'MYS', Vietnam:'VNM', Singapore:'SGP' }

export default function WorldMap(){
  const navigate = useNavigate()
  const [hover, setHover] = useState({ name:'', code:'', val:null, x:0, y:0 })
  const color = scaleLinear().domain([40,60,80,100]).range(['#e2e8f0','#93c5fd','#60a5fa','#1d4ed8'])
  const getKey = (geo)=>{
    const name = geo.properties?.NAME || geo.properties?.name || ''
    const a3 = geo.properties?.ISO_A3 || geo.id || null
    const code = (a3 && INDICES[a3] ? a3 : NAME_TO_CODE[name]) || null
    return { name, code }
  }
  const onMove = (e,geo)=>{ const {name,code}=getKey(geo); const val = code? INDICES[code]?.overall ?? null : null; setHover({name,code:code||'',val,x:e.clientX+12,y:e.clientY+12}) }
  const onLeave = ()=> setHover({name:'',code:'',val:null,x:0,y:0})
  const onClick = (geo)=>{ const {code}=getKey(geo); if(code && INDICES[code]) navigate(`/country/${code}`) }
  return (<div className='relative'>
    <div className='rounded-2xl border bg-white overflow-hidden'>
      <ComposableMap projectionConfig={{ scale:145 }} style={{ width:'100%', height:'520px' }}>
        <Geographies geography={geoUrl}>{({geographies})=> geographies.map(geo=>{
          const { code } = getKey(geo)
          const idx = code ? INDICES[code]?.overall : null
          const fill = idx ? color(idx) : '#e5e7eb'
          const cursor = code ? 'pointer' : 'default'
          return (<Geography key={geo.rsmKey} geography={geo} onMouseMove={(e)=>onMove(e,geo)} onMouseLeave={onLeave} onClick={()=>onClick(geo)} style={{ default:{fill,outline:'none',cursor}, hover:{fill: idx? '#0ea5e9':'#e5e7eb',outline:'none',cursor}, pressed:{fill,outline:'none',cursor} }} />)
        })}</Geographies>
      </ComposableMap>
    </div>
    <div className='absolute right-3 top-3 bg-white/90 border px-3 py-2 rounded-xl text-xs'><div className='font-semibold mb-1'>出海指数</div><div className='flex items-center gap-2'><span className='w-3 h-3 rounded' style={{background:'#e2e8f0'}}></span><span>40</span><span className='w-3 h-3 rounded' style={{background:'#93c5fd'}}></span><span>60</span><span className='w-3 h-3 rounded' style={{background:'#60a5fa'}}></span><span>80</span><span className='w-3 h-3 rounded' style={{background:'#1d4ed8'}}></span><span>100</span></div></div>
    {hover.name && (<div className='pointer-events-none fixed z-50 bg-white border rounded-xl px-3 py-2 text-xs shadow-sm' style={{ left:hover.x, top:hover.y }}><div className='font-semibold'>{hover.name}</div><div className='text-slate-600'>出海指数：{hover.val ?? 'N/A'}</div>{hover.code? <div className='text-[10px] text-slate-500'>点击查看详情</div> : <div className='text-[10px] text-slate-400'>暂未收录</div>}</div>)}
  </div>)
}
