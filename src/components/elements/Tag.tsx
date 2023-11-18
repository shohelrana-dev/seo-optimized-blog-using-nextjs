import Link from 'next/link'
import { slug as slugger } from 'github-slugger'

export default function Tag({ tag }: { tag: string }) {
    return (
        <Link
            key={tag}
            href={`/categories/${slugger(tag)}`}
            className="inline-block py-3 px-10 bg-dark text-light rounded-full capitalize font-semibold border-2 border-solid border-light hover:scale-105 transition-all ease duration-200"
        >
            {tag}
        </Link>
    )
}
