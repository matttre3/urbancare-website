/* eslint-disable @next/next/no-img-element -- Satori renders this self-contained social image. */
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { socialImage } from './social-image'

export const runtime = 'nodejs'
export const alt = socialImage.alt
export const size = { width: socialImage.width, height: socialImage.height }
export const contentType = 'image/png'

function Neighbourhood() {
  return <svg width="510" height="520" viewBox="0 0 510 520" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="facade" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#34446e"/><stop offset="1" stopColor="#151f38"/></linearGradient>
      <linearGradient id="roof" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#b1a9ff"/><stop offset="1" stopColor="#625fc3"/></linearGradient>
      <linearGradient id="lit" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ffe5a6"/><stop offset="1" stopColor="#d2ad66"/></linearGradient>
    </defs>
    <path d="M80 205L300 43L520 205V520H80Z" fill="#9690ef" opacity=".045"/>
    <path d="M81 204L300 42L519 204" stroke="#a49af1" strokeWidth="2" fill="none" opacity=".18"/>
    <path d="M12 337L90 295L168 337" fill="#303950"/>
    <rect x="26" y="337" width="128" height="174" fill="#172239"/>
    {[0,1,2].map(row => [0,1,2].map(col => <rect key={`left-${row}-${col}`} x={43+col*35} y={355+row*46} width="18" height="27" fill={(row+col)%3===0?'#ad956c':'#334365'}/>))}
    <rect x="365" y="259" width="112" height="252" fill="#1c2945"/>
    <path d="M350 259L421 220L492 259Z" fill="#4b4b7c"/>
    {[0,1,2,3].map(row => [0,1].map(col => <rect key={`right-${row}-${col}`} x={384+col*49} y={280+row*48} width="25" height="30" fill={(row+col)%3===0?'#d3b57b':'#3c4d70'}/>))}
    <rect x="139" y="175" width="225" height="336" fill="url(#facade)"/>
    <rect x="168" y="116" width="21" height="47" fill="#565d96"/>
    <path d="M118 177L251 105L386 177L381 185H124Z" fill="url(#roof)"/>
    <path d="M137 170L251 111L367 170" fill="none" stroke="#c1b9ff" strokeWidth="2"/>
    <circle cx="251" cy="151" r="12" fill="url(#lit)"/>
    <path d="M251 139V163M239 151H263" stroke="#6b626c" strokeWidth="2"/>
    {[0,1,2,3].map(row => [0,1,2,3].map(col => <g key={`${row}-${col}`}>
      <rect x={160+col*49} y={201+row*58} width="29" height="38" rx="1" fill={(row*3+col)%4<2?'url(#lit)':'#101a2b'}/>
      <path d={`M${174.5+col*49} ${201+row*58}v38`} stroke="#526084" strokeWidth="2"/>
      <rect x={157+col*49} y={239+row*58} width="35" height="3" fill="#7681a8"/>
    </g>))}
    {[0,1,2].map(row => <g key={`balcony-${row}`}>
      <path d={`M127 ${251+row*58}H377M127 ${266+row*58}H377`} stroke="#9b9cbf" strokeWidth="2"/>
      {Array.from({length:26},(_,i)=><path key={i} d={`M${128+i*10} ${251+row*58}v15`} stroke="#9b9cbf" strokeWidth="1"/>)}
      <rect x="126" y={268+row*58} width="252" height="5" fill="#505b83"/>
    </g>)}
    <rect x="224" y="437" width="55" height="74" rx="26" fill="#0c1525" stroke="#697399" strokeWidth="3"/>
    <path d="M251 438V511" stroke="#697399" strokeWidth="2"/>
    <circle cx="244" cy="480" r="2" fill="#e2c68d"/>
    <rect x="139" y="503" width="225" height="8" fill="#657095"/>
    <rect x="0" y="511" width="510" height="9" fill="#283753"/>
    <path d="M0 519H510" stroke="#5b6085"/>
    <rect x="333" y="399" width="7" height="33" fill="#414e6c"/>
    <circle cx="336" cy="390" r="18" fill="#49695f"/>
    <circle cx="349" cy="394" r="13" fill="#3f6059"/>
  </svg>
}

export default async function OpenGraphImage() {
  const svg = (await readFile(path.join(process.cwd(), 'public/horizontal-logo.svg'), 'utf8')).replace(/fill="url\(#[^)]+\)"/g, 'fill="white"')
  const logo = 'data:image/png;base64,' + (await sharp(Buffer.from(svg)).resize(530,128).png().toBuffer()).toString('base64')
  return new ImageResponse(<div style={{ width:'100%',height:'100%',display:'flex',position:'relative',overflow:'hidden',background:'linear-gradient(115deg, #08111f 0%, #101a30 68%, #252742 100%)',color:'#f4f5fc',fontFamily:'sans-serif' }}>
    <div style={{display:'flex',position:'absolute',right:-8,bottom:68}}><Neighbourhood /></div>
    <div style={{display:'flex',position:'absolute',left:64,top:54}}><img src={logo} width={265} height={64} alt="Urbancare" /></div>
    <div style={{display:'flex',position:'absolute',left:65,top:163,fontSize:15,letterSpacing:3,color:'#a8b5d0'}}>AMMINISTRAZIONE CONDOMINIALE</div>
    <div style={{display:'flex',flexDirection:'column',position:'absolute',left:60,top:221,fontSize:79,fontWeight:700,lineHeight:1.06,letterSpacing:-4}}>
      <div style={{display:'flex'}}>Più ordine.</div>
      <div style={{display:'flex',color:'#aaa3ff',marginTop:8}}>Meno pensieri.</div>
    </div>
    <div style={{display:'flex',position:'absolute',left:65,top:434,fontSize:24,color:'#bac6db'}}>Garbagnate Milanese e dintorni</div>
    <div style={{display:'flex',position:'absolute',left:64,right:64,bottom:72,height:1,background:'#8291b5',opacity:0.3}} />
    <div style={{display:'flex',position:'absolute',left:65,bottom:30,fontSize:18,color:'#b3bfd5'}}>urbancare-amministrazioni.com</div>
    <div style={{display:'flex',position:'absolute',right:65,bottom:30,fontSize:15,color:'#b3bfd5',letterSpacing:2}}>IL TUO CONDOMINIO, CON CURA.</div>
  </div>, size)
}
