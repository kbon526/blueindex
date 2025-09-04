export function Button({className='', ...props}){ return <button className={`btn ${className}`} {...props} /> }
export function ButtonGhost({className='', ...props}){ return <button className={`btn-ghost ${className}`} {...props} /> }
export function Card({children, className=''}){ return <div className={`card ${className}`}>{children}</div> }
export function CardHeader({children, className=''}){ return <div className={`card-h ${className}`}>{children}</div> }
export function CardContent({children, className=''}){ return <div className={`card-c ${className}`}>{children}</div> }
export function CardTitle({children, className=''}){ return <div className={`font-semibold ${className}`}>{children}</div> }
export function Badge({children, className=''}){ return <span className={`badge ${className}`}>{children}</span> }
export function Input(props){ return <input className='h-11 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300 w-full' {...props}/> }
export function Select({options=[],...props}){ return <select className='h-11 px-3 rounded-xl border border-slate-300 w-full' {...props}>{options.map(o=><option key={o} value={o}>{o}</option>)}</select> }
