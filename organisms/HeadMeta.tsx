import Head from 'next/head'
import { FC } from 'react'

type Props = {
  title?: string
  description?: string
  ogpImage?: string
  path?: string
  isTop?: boolean
}

const HeadMeta: FC<Props> = ({ title, description, ogpImage, path, isTop }) => (
  <Head>
    <title>Civichat - {title}</title>
    <meta property="og:title" content={title ? title : 'Civichat'} />
    <meta property="description" content={description ? description : 'Civichat'} />
    <meta property="og:description" content={description ? description : 'Civichat'} />
    <meta name="keywords" content="Civichat" />
    <meta property="og:type" content={isTop ? 'website' : 'article'} />
    <meta
      property="og:url"
      content={
        path ? `${process.env.NEXT_PUBLIC_BASE_URL}${path}` : `${process.env.NEXT_PUBLIC_BASE_URL}`
      }
    />
    <meta
      property="og:image"
      content={
        ogpImage
          ? `${process.env.NEXT_PUBLIC_BASE_URL}${ogpImage}`
          : `${process.env.NEXT_PUBLIC_BASE_URL}OGP.png`
      }
    />
    <meta property="og:site_name" content={title ? title : 'Civichat'} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Civichat" />
    <meta
      name="twitter:url"
      content={
        path ? `${process.env.NEXT_PUBLIC_BASE_URL}${path}` : `${process.env.NEXT_PUBLIC_BASE_URL}`
      }
    />
    <meta name="twitter:title" content={title ? title : 'Civichat'} />
    <meta name="twitter:description" content={description ? description : 'Civichat'} />
    <meta
      name="twitter:image"
      content={
        ogpImage
          ? `${process.env.NEXT_PUBLIC_BASE_URL}${ogpImage}`
          : `${process.env.NEXT_PUBLIC_BASE_URL}OGP.png`
      }
    />
    <link
      rel="canonical"
      href={
        path ? `${process.env.NEXT_PUBLIC_BASE_URL}${path}` : `${process.env.NEXT_PUBLIC_BASE_URL}`
      }
    />
    <link rel="shortcut icon" href={`${process.env.NEXT_PUBLIC_BASE_URL}favicon.ico`} />
    <link rel="apple-touch-icon" href={`${process.env.NEXT_PUBLIC_BASE_URL}logo.png`} />
  </Head>
)

export default HeadMeta
