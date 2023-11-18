"use client"
import Link from 'next/link'
import Logo from '@/components/header/Logo'
import { cx } from '@/utils'
import { FaLinkedin as LinkedinIcon } from "react-icons/fa"
import { FaTwitter as TwitterIcon } from "react-icons/fa"
import { FaGithub as GithubIcon } from "react-icons/fa"
import { FaDribbble as DribbbleIcon } from "react-icons/fa"
import { MdSunny as SunIcon } from "react-icons/md"
import { LuMoonStar as MoonIcon } from "react-icons/lu"
import siteMetaData from '@/utils/siteMetadata'
import useThemeSwitch from '@/hooks/useThemeSwitch'
import { useState } from 'react'


export default function Header() {
  const [mode, setMode] = useThemeSwitch()
  const [click, setClick] = useState(false)

  function toggle() {
    setClick(!click)
  }

  return (
    <header className="w-full p-4 px-5 sm:px-10 flex items-center justify-between">
      <Logo />

      <button className="inline-block sm:hidden z-50" onClick={toggle} aria-label="Hamburger Menu">
        <div className="w-6 cursor-pointer transition-all ease duration-300">
          <div className="relative">
            <span className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
              style={{
                transform: click ? "rotate(-45deg) translateY(0)" : "rotate(0deg) translateY(6px)"
              }}

            >&nbsp;</span>
            <span className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
              style={{
                opacity: click ? 0 : 1
              }}
            >&nbsp;</span>
            <span className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
              style={{
                transform: click ? "rotate(45deg) translateY(0)" : "rotate(0deg) translateY(-6px)"
              }}
            >&nbsp;</span>
          </div>

        </div>
      </button>

      <nav className=" w-max py-3 px-6 sm:px-8 border border-solid border-dark rounded-full font-medium capitalize  items-center flex  sm:hidden
        fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50
        transition-all ease duration-300
        "
        style={{
          top: click ? "1rem" : "-5rem"
        }}

      >
        <Link href="/" className="mr-2">Home</Link>
        <Link href="/about" className="mx-2">About</Link>
        <Link href="/contact" className="mx-2">Contact</Link>
        <button onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={cx("w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1", mode === "light" ? "bg-dark text-light" :
            "bg-light text-dark")}
          aria-label="theme-switcher"
        >
          {
            mode === "light" ? <MoonIcon className={"fill-dark"} /> : <SunIcon className={"fill-dark"} />
          }
        </button>
      </nav>


      <nav className="w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize  items-center hidden sm:flex
        fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50">
        <Link href="/" className="mr-2">Home</Link>
        <Link href="/about" className="mx-2">About</Link>
        <Link href="/contact" className="mx-2">Contact</Link>
        <button onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={cx("w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1", mode === "light" ? "bg-dark text-light" :
            "bg-light text-dark")}
          aria-label="theme-switcher"
        >
          {mode === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
        </button>
      </nav>

      <div className="hidden sm:flex items-center">
        <a href={siteMetaData.linkedin} className="inline-block w-6 h-6 mr-4 duration-300 hover:scale-125">
          <LinkedinIcon size={25} className="dark:text-white" />
        </a>
        <a href={siteMetaData.twitter} className="inline-block w-6 h-6 mr-4 duration-300 hover:scale-125">
          <TwitterIcon size={25} className="dark:text-white" />
        </a>
        <a href={siteMetaData.github} className="inline-block w-6 h-6 mr-4 duration-300 hover:scale-125">
          <GithubIcon size={25} className="dark:text-white" />
        </a>
        <a href={siteMetaData.dribbble} className="inline-block w-6 h-6 mr-4 duration-300 hover:scale-125">
          <DribbbleIcon size={25} className="dark:text-white" />
        </a>
      </div>
    </header>
  )
}
