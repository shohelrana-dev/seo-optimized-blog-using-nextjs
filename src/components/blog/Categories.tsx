import Category from "@/components/blog/Category";
import { slug as slugger } from "github-slugger";

interface Props {
    categories: string[]
    currentSlug: string
}

export default function Categories({ categories, currentSlug }: Props) {
    return (
        <div className=" px-0 md:px-10 sxl:px-20 mt-10 border-t-2 text-dark dark:text-light border-b-2 border-solid border-dark dark:border-light py-4 flex items-start flex-wrap font-medium mx-5 md:mx-10">
            {categories.map((cat) => (
                <Category
                    key={cat}
                    link={`/categories/${cat}`}
                    name={cat}
                    active={currentSlug === slugger(cat)}
                />
            ))}
        </div>
    )
}
