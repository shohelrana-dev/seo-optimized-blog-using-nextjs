import BlogLayoutThree from "@/components/blog/BlogLayoutThree"
import Categories from "@/components/blog/Categories"
import { allBlogs } from "contentlayer/generated"
import { slug as slugger } from "github-slugger"
import { Metadata } from "next"

export async function generateStaticParams() {
    return allBlogs.map((blog) => ({ slug: blog.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    return {
        title: `${params.slug.replaceAll("-", " ")} Blogs`,
        description: `Learn more about ${params.slug === "all" ? "web developement" : params.slug} throw our blogs`
    }
}

export default function SingleCategoryPage({ params }: { params: { slug: string } }) {
    const allCategories = ["all"]
    const blogs = allBlogs.filter((blog) => {
        return blog?.tags?.some((tag) => {
            const slugified = slugger(tag)
            if (!allCategories.includes(slugified)) {
                allCategories.push(slugified)
            }
            if (params.slug === "all") {
                return true
            }
            return slugified === params.slug
        })
    })

    return (
        <article className="mt-12 flex flex-col text-dark dark:text-light">
            <div className=" px-5 sm:px-10  md:px-24  sxl:px-32 flex flex-col">
                <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">#{params.slug}</h1>
                <span className="mt-2 inline-block">
                    Discover more categories and expand your knowledge!
                </span>
            </div>
            <Categories categories={allCategories} currentSlug={params.slug} />

            <div className="grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 grid-rows-2 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32">
                {blogs.map((blog, index) => (
                    <article key={index} className="col-span-1 row-span-1 relative">
                        <BlogLayoutThree blog={blog} />
                    </article>
                ))}
            </div>
        </article>
    )
}
