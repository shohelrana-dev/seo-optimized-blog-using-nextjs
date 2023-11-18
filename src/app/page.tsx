import { allBlogs } from 'contentlayer/generated'
import CoverSection from '@/components/home/CoverSection'
import FeaturedPosts from '@/components/home/FeaturedPosts'
import RecentPosts from '@/components/header/RecentPosts'

export default function HomePage() {

  return (
    <main className="flex flex-col items-center justify-center">
      <CoverSection blogs={allBlogs} />
      <FeaturedPosts blogs={allBlogs} />
      <RecentPosts blogs={allBlogs}/>
    </main>
  )
}
