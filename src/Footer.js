import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { BsFacebook ,BsTwitter} from "react-icons/bs";
import { ImGooglePlus } from "react-icons/im";

function Footer() {
  return (
    <div className='bg-nav'>

<div className='d-flex justify-content-center fs-1 mx-auto '>
  <a href='https://www.google.com/'><FcGoogle className='p-2'/></a>
  <a href='https://www.facebook.com/'><BsFacebook className='text-white p-2'/></a>
  <a href='https://www.twitter.com/'><BsTwitter className='p-2'/></a>
  <a href='https://www.gmail.com/'><ImGooglePlus  className='text-white p-2' /></a>
</div>
    </div>
  )
}

export default Footer
