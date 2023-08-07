'use client'
import Cart from "domains/cart/components/cart/cart"
import { usePathname } from "next/navigation"

const PanierPage = () => {
  const pathname = usePathname()
  console.log(pathname)
return (<Cart pathname={pathname}/>)} 

export default PanierPage