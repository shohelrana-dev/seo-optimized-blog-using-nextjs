import BlogDetails from '@/components/blog/BlogDetails'
import RenderMdx from '@/components/blog/RenderMdx'
import Tag from '@/components/elements/Tag'
import siteMetaData from '@/utils/siteMetadata'
import { allBlogs } from 'contentlayer/generated'
import { Metadata } from 'next'
import Image from 'next/image'

export async function generateStaticParams() {
    return allBlogs.map((blog) => ({ slug: blog.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | null> {
    const blog = allBlogs.find((blog) => blog.slug === params.slug)

    if (!blog) return null

    const publishedTime = new Date(blog.publishedAt).toISOString()
    const modifiedTime = new Date(blog.updatedAt || blog.publishedAt).toISOString()

    let imageList = [siteMetaData.socialBanner]

    if (blog.imageUrl) {
        imageList = [siteMetaData.siteUrl + blog.imageUrl]
    }

    const ogImages = imageList.map((image) => ({ url: image.includes("http") ? image : siteMetaData.siteUrl + image }))
    const authors = blog.author ? [blog.author] : siteMetaData.author

    return {
        title: blog.title,
        description: blog.description,
        openGraph: {
            title: blog.title,
            description: blog.description,
            url: siteMetaData.siteUrl + blog.url,
            siteName: siteMetaData.title,
            type: "article",
            publishedTime,
            modifiedTime,
            images: ogImages,
            authors,
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: blog.description,
            images: ogImages,
        },
    }
}

export default function SingleBlogPage({ params }: { params: { slug: string } }) {
    const blog = allBlogs.find(blog => blog.slug === params.slug)

    const { title, image, imageUrl, tags, toc } = blog || {}
    const firstTag = tags?.length ? tags[0] : ""

    return (
        <article>
            <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
                <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Tag tag={firstTag} />
                    <h1
                        className="inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl !leading-normal relative w-5/6"
                    >
                        {title}
                    </h1>
                </div>
                <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60 dark:bg-dark/40" />
                <Image
                    src={imageUrl!}
                    placeholder="blur"
                    blurDataURL={image?.blurhashDataUrl!}
                    alt={title!}
                    width={image?.width}
                    height={image?.height}
                    className="aspect-square w-full h-full object-cover object-center"
                    priority
                    sizes="100vw"
                />
            </div>
            <BlogDetails blog={blog!} />

            <div className="grid grid-cols-12  gap-y-8 lg:gap-8 sxl:gap-16 mt-8 px-5 md:px-10">
                <div className="col-span-12  lg:col-span-4">
                    <details
                        className="border-[1px] border-solid border-dark dark:border-light text-dark dark:text-light rounded-lg p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto"
                        open
                    >
                        <summary className="text-lg font-semibold capitalize cursor-pointer">
                            Table Of Content
                        </summary>
                        <ul className="mt-4 font-in text-base">
                            {toc.map((heading: any) => {
                                return (
                                    <li key={`#${heading.slug}`} className="py-1">
                                        <a
                                            href={`#${heading.slug}`}
                                            data-level={heading.level}
                                            className="data-[level=two]:pl-0  data-[level=two]:pt-2
                                       data-[level=two]:border-t border-solid border-dark/40
                                       data-[level=three]:pl-4
                                       sm:data-[level=three]:pl-6
                                       flex items-center justify-start
                                       "
                                        >
                                            {heading.level === "three" ? (
                                                <span className="flex w-1 h-1 rounded-full bg-dark mr-2">
                                                    &nbsp;
                                                </span>
                                            ) : null}

                                            <span className="hover:underline">{heading.text}</span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </details>
                </div>

                <RenderMdx blog={blog!} />

            </div>
        </article>
    )
}
