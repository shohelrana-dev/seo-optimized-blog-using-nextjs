"use client"
import ViewCounter from '@/components/blog/ViewCounter'
import { Blog } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { slug as slugger } from "github-slugger"

export default function BlogDetails({ blog }: { blog: Blog }) {
    const { publishedAt, readingTime, tags, slug } = blog
    const firstTag = tags?.length ? tags[0] : ""

    return (
        <div className="px-2  md:px-10 bg-accent dark:bg-accentDark text-light dark:text-dark py-2 flex items-center justify-around flex-wrap text-lg sm:text-xl font-medium mx-5  md:mx-10 rounded-lg">
            <time className="m-3">
                {format(parseISO(publishedAt), "LLLL d, yyyy")}
            </time>
            <span className="m-3">
                <ViewCounter slug={slug} />
            </span>
            <div className="m-3">{readingTime.text}</div>
            <Link href={`/categories/${slugger(firstTag)}`} className="m-3">
                #{firstTag}
            </Link>
        </div>
    )
}
