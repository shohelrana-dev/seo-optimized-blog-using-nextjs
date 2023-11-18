import React, { PropsWithChildren, ReactNode } from 'react'
interface Props extends HTMLDivElement {

}
export default function Container({ children, ...rest }: PropsWithChildren) {
    return (
        <div className="px-5 sm:px-10 md:px-24 sxl:px-32" {...rest}>
            {children}
        </div>
    )
}
