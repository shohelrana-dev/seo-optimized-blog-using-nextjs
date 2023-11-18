import { makeSource, defineDocumentType } from '@contentlayer/source-files'
import GithubSlugger from "github-slugger"
import readingTime from "reading-time"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"

const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: '**/*.mdx',
    contentType: "mdx",
    fields: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        image: { type: 'image' },
        author: { type: 'string', required: true },
        tags: { type: "list", of: { type: "string" } },
        isPublished: { type: 'boolean', default: true },
        publishedAt: { type: 'date', required: true },
        updatedAt: { type: 'date', required: true }
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (doc) => `/blogs/${doc._raw.flattenedPath}`
        },
        slug: {
            type: 'string',
            resolve: (doc) => doc._raw.flattenedPath
        },
        imageUrl: {
            type: 'string',
            resolve: (doc) => doc.image?.filePath.replace("../public", "")
        },
        readingTime: {
            type: "json",
            resolve: (doc) => readingTime(doc.body.raw)
        },
        toc: {
            type: "json",
            resolve: async (doc) => {
                const regulrExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g
                const slugger = new GithubSlugger()
                const headings = Array.from(doc.body.raw.matchAll(regulrExp)).map(({ groups }) => {
                    const flag = groups?.flag
                    const content = groups?.content

                    return {
                        level: flag?.length == 1 ? "one" : flag?.length == 2 ? "two" : "three",
                        text: content,
                        slug: content ? slugger.slug(content) : undefined
                    }

                })


                return headings
            }
        }
    },
}))

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Blog],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behaviour: "append" }],
            [rehypePrettyCode, { theme: "github-dark", grid: false }]
        ]
    }
})