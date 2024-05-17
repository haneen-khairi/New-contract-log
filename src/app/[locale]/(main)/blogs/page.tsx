"use client"
import BlogCard from '@/components/blogs/BlogCard'
import { Grid } from '@chakra-ui/react'
import React from 'react'

export default function Page() {
    const blog = {
        image: "/images/blog1.svg",
        id: 1
    }
    return <section className=''>
        <section className="blogs__section">
            <h2 className="blogs__header">Recent blog posts</h2>
            <Grid templateColumns='repeat(2, 1fr)' rowGap={'32px'} columnGap={'48px'}>
                <BlogCard blog={blog} />
                <div>
                <BlogCard blog={blog} reverse={true} />
                <BlogCard blog={blog} reverse={true} />

                </div>
            </Grid>
        </section>
        <section className="blogs__section">
            <h2 className="blogs__header">All blogs</h2>
            <Grid templateColumns='repeat(3, 1fr)' rowGap={'32px'} columnGap={'48px'}>
                <BlogCard blog={blog} />
            </Grid>
        </section>
    </section>
}
