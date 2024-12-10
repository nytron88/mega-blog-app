import React from "react";
import { Link } from "react-router-dom";

function HeaderBtn({ name, slug = "/", ...props }) {
  return (
    <Link to={slug} className='px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 text-white font-medium shadow-lg hover:shadow-purple-500/25' {...props}>
      {name}
    </Link>
  )
}

export default HeaderBtn;