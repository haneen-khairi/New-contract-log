import React from 'react'
import Image from "next/image"
import { Grid } from '@chakra-ui/react'
import Link from 'next/link'
export default function BlogCard({
  blog,
  reverse = false
}: IBlogCardProps) {
  return <div className="blogs__card">
    <Link href={`en/blogs/details?blogId=${blog?.id}`}>
      {(() => {
        if (reverse) {
          return <Grid templateColumns='repeat(2, 1fr)' alignItems={'center'} gap={'24px'}>
            <Image className='blogs__card--image' src={blog.image} width={250} height={240} alt='blog image' />
            <div className="">
              <span className="blogs__card--time">{`Best Practices • 1 Jan 2024`}</span>
              <h2 className="blogs__card--header">{`Maximizing Collaboration in Contract Management with CaDas`}</h2>
              <p className="blogs__card--description">How do Maximizing Collaboration in Contract Management with CaDas you create compelling...</p>

            </div>
          </Grid>
        }
        return <>
          <Image className='blogs__card--image' src={blog.image} width={250} height={240} alt='blog image' />
          <span className="blogs__card--time">{`Best Practices • 1 Jan 2024`}</span>
          <h2 className="blogs__card--header">{`Maximizing Collaboration in Contract Management with CaDas`}</h2>
          <p className="blogs__card--description">How do Maximizing Collaboration in Contract Management with CaDas you create compelling...</p>
        </>
      })()}
    </Link>

  </div>
}
