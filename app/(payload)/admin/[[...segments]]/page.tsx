import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Props = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = (args: Props) => generatePageMetadata({ ...args, config })
export default function Page(args: Props) { return RootPage({ ...args, config, importMap }) }
