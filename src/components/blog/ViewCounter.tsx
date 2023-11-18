"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"

const supabase = createClientComponentClient()

interface Props {
    slug: string
    noCount?: boolean
    showCount?: boolean
}

export default function ViewCounter({ slug, noCount = false, showCount = true }: Props) {
    const [views, setViews] = useState(0)

    useEffect(() => {
        async function incrementView() {
            try {
                const { error } = await supabase.rpc('increment', { slug_text: slug })

                if (error) {
                    console.error('Error incrementing view count inside try block', error)
                }
            } catch (error) {
                console.error('An error has occured while incrementing the view count:', error)
            }
        }

        if (!noCount) {
            incrementView()
        }
    }, [slug, noCount])

    useEffect(() => {
        async function getViews() {
            try {
                let { data, error } = await supabase
                    .from('views')
                    .select('count')
                    .match({ slug })
                    .single()

                if (error) {
                    console.error('Error gettting views inside try block', error)
                } else {
                    setViews(data?.count ?? 0)
                }

            } catch (error) {
                console.error('An error has occured while getting views:', error)
            }
        }

        getViews()
    }, [slug])

    if (!showCount) return null

    return (
        <div>{views}</div>
    )
}