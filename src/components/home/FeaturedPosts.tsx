import BlogLayoutOne from '@/components/blog/BlogLayoutOne'
import BlogLayoutThree from '@/components/blog/BlogLayoutThree'
import BlogLayoutTwo from '@/components/blog/BlogLayoutTwo'
import { sortBlogs } from '@/utils'
import { Blog } from 'contentlayer/generated'

export default function FeaturedPosts({ blogs }: { blogs: Blog[] }) {
    const sortedBlogs = sortBlogs(blogs)

    return (
        <section className="w-full mt-16 sm:mt-24 md:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center">
            <h2 className="inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">Featured Posts</h2>

            <div className="mt-10 sm:mt-16 article-conatiner grid grid-cols-2 grid-rows-2 gap-6">
                <article className="relative col-span-2 lg:col-span-1 row-span-2">
                    <BlogLayoutOne blog={sortedBlogs[1]} />
                </article>
                <article className="two col-span-2 md:col-span-1">
                    <BlogLayoutTwo blog={sortedBlogs[2]} />
                </article>
                <article className="three col-span-2 md:col-span-1">
                    <BlogLayoutThree blog={sortedBlogs[3]} />
                </article>
            </div>
        </section>
    )
}
