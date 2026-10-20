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

export default async function OpenGraphImage() {
  const svg = (await readFile(path.join(process.cwd(), 'public/horizontal-logo.svg'), 'utf8')).replace(/fill="url\(#[^)]+\)"/g, 'fill="white"')
  const logo = 'data:image/png;base64,' + (await sharp(Buffer.from(svg)).resize(530,128).png().toBuffer()).toString('base64')
  const neighbourhood = 'data:image/png;base64,' + (await sharp(await readFile(path.join(process.cwd(), 'public/social/hero-neighbourhood.svg'))).resize(1320,1200).png().toBuffer()).toString('base64')
  const fonts = await Promise.all([
    { name: 'Urbanist', weight: 700 as const, file: 'Urbanist-700.ttf' },
    { name: 'Urbanist', weight: 800 as const, file: 'Urbanist-800.ttf' },
    { name: 'Schibsted Grotesk', weight: 400 as const, file: 'SchibstedGrotesk-400.ttf' },
    { name: 'Schibsted Grotesk', weight: 600 as const, file: 'SchibstedGrotesk-600.ttf' },
  ].map(async ({ file, ...font }) => ({ ...font, data: await readFile(path.join(process.cwd(), 'public/fonts', file)), style: 'normal' as const })))
  return new ImageResponse(<div style={{ width:'100%',height:'100%',display:'flex',position:'relative',overflow:'hidden',background:'linear-gradient(115deg, #08111f 0%, #101a30 68%, #252742 100%)',color:'#f4f5fc',fontFamily:'Schibsted Grotesk' }}>
    <div style={{display:'flex',position:'absolute',right:-16,bottom:73}}><img src={neighbourhood} width={605} height={550} alt="I condomini e la U della hero Urbancare" /></div>
    <div style={{display:'flex',position:'absolute',left:64,top:54}}><img src={logo} width={265} height={64} alt="Urbancare" /></div>
    <div style={{display:'flex',position:'absolute',left:65,top:169,fontSize:14,fontWeight:600,letterSpacing:2.5,color:'#a8b5d0'}}>AMMINISTRAZIONE CONDOMINIALE</div>
    <div style={{display:'flex',flexDirection:'column',position:'absolute',left:62,top:227,fontFamily:'Urbanist',fontSize:84,fontWeight:700,lineHeight:0.98,letterSpacing:-2.5}}>
      <div style={{display:'flex'}}>Più ordine.</div>
      <div style={{display:'flex',color:'#aaa3ff',fontWeight:800,marginTop:12}}>Meno pensieri.</div>
    </div>
    <div style={{display:'flex',position:'absolute',left:65,top:434,fontSize:24,color:'#bac6db'}}>Garbagnate Milanese e dintorni</div>
    <div style={{display:'flex',position:'absolute',left:64,right:64,bottom:72,height:1,background:'#8291b5',opacity:0.3}} />
    <div style={{display:'flex',position:'absolute',left:65,bottom:30,fontSize:18,color:'#b3bfd5'}}>urbancare-amministrazioni.com</div>
    <div style={{display:'flex',position:'absolute',right:65,bottom:30,fontSize:15,color:'#b3bfd5',letterSpacing:2}}>IL TUO CONDOMINIO, CON CURA.</div>
  </div>, { ...size, fonts })
}
