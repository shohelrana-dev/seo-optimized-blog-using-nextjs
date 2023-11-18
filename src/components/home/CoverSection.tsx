import Tag from '@/components/elements/Tag'
import { sortBlogs } from '@/utils'
import { Blog } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'

export default function CoverSection({ blogs }: { blogs: Blog[] }) {
    const sortedBlogs = sortBlogs(blogs)
    const { title, description, image, imageUrl, tags, url } = sortedBlogs[0] || {}

    return (
        <div className="w-full inline-block">
            <article className="flex flex-col items-start justify-end mx-10 relative min-h-[85vh]">
                <div className="absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0" />
                <Image
                    src={imageUrl}
                    placeholder="blur"
                    blurDataURL={image?.blurhashDataUrl}
                    alt={title}
                    fill
                    className="w-full h-full object-center object-cover rounded-3xl -z-10"
                />
                <div className="w-full md:w-3/4 p-16 flex flex-col items-start justify-center z-0 text-light">
                    {tags?.map(tag => (
                        <Tag key={tag} tag={tag} />
                    ))}
                    <Link href={url} className="mt-6">
                        <h1 className="capitalize text-light text-4xl">
                            <span className="bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 dark:to-accentDark/50 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                                {title}
                            </span>
                        </h1>
                    </Link>
                    <p className="inline-block mt-4 text-xl font-in">
                        {description}
                    </p>
                </div>
            </article>
        </div >
    )
}
