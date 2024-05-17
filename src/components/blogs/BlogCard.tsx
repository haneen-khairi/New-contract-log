import React from 'react'
import Image from "next/image"
export default function BlogCard({
  blog
}: IBlogCardProps) {
  return <div className="blog__card">
    <Image className='blog__card--image' src={blog.image} width={undefined} height={240} alt='blog image'/>
    <span className="blog__card--time">{`Best Practices • 1 Jan 2024`}</span>
    <h2 className="blog__card--header">{`Maximizing Collaboration in Contract Management with CaDas`}</h2>
    <p className="blog__card--description">How do Maximizing Collaboration in Contract Management with CaDas you create compelling...</p>
  </div>
}
