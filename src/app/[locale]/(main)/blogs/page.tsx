"use client"
import React, { useState } from 'react'
import BlogCard from '@/components/blogs/BlogCard'
import { Grid } from '@chakra-ui/react'
import ReactPaginate from 'react-paginate';
import ResponsivePagination from 'react-responsive-pagination';

import 'react-responsive-pagination/themes/classic.css';
export default function Page() {
    const blog = {
        image: "/images/blog1.svg",
        id: 1
    }
    const totalPages = 10;
    const [currentPage, setCurrentPage] = useState(1);
  
    function handlePageChange(page: any) {
      setCurrentPage(page);
      // ... do something with `page`
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
                <BlogCard blog={blog} />
                <BlogCard blog={blog} />
                <BlogCard blog={blog} />
            </Grid>
            {/* <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                // onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={6}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            /> */}
                <ResponsivePagination
      total={totalPages}
      current={currentPage}
      onPageChange={page => handlePageChange(page)}
    />
        </section>
    </section>
}
