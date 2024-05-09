import React ,{useState}from 'react'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {FaBarsStaggered, FaXmark} from "react-icons/fa6";
import key from 'react-dom';
const Navbar = () => {
    const [isMenuOpen,seIstMenuOpen]=useState(false);
    const handleMenuToggler =()=>{
        setIsMenuOpen(!isMenuOpen)
    };
    const navItems=[
        //{path:"/",title:"Search "},
        {path:"/gestion-demandes",title:"Gestion des demandes"},
        {path:"/chat",title:"Communication"},
        {path:"/offre-job",title:"Offre a job "},
        {path:"/myoffers",title:"my offers "},
    ]
  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        <nav className='flex justify-between items-center py-6'>
            <a href="/" className='flex items-center gap-2 text-2xl text-black'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width="29"
                  height="30"
                  viewBox='0 0 29 30'
                  fill='none'
                  >
                    <circle
                    cx="12.0143"
                    cy="12.5143"
                    r="12.0143"
                    fill='#3575E2'
                    fillOpacity="0.4"
                    />
                    <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2"/>
                    </svg>
                    <span>Entreprise</span>
                  
            </a>
            {/*nav items for large devices */}
            <ul className="hidden md:flex gap-12">
                {
                    navItems.map(({path,title})=>(
                        <li key={path} className="text-base text-primary">
                             <NavLink
                    to={path}
                    className={({ isActive}) =>
                      isActive
                        ? "active"
                        : ""
                    }
                  >
                    {title}
                  </NavLink>
                            
                        </li>
                    ))
                }
            </ul>
            
            {/*signup and login btn*/}
           {/* <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
                <Link to="/login" className="py-2 px-5 border rounded ">Log in</Link>
                <Link to="/sign-up" className="py-2 px-5 border rounded bg-blue text-white">Sign Up</Link>
            </div>*/}
           
        </nav>
        
    </header>
  )
}

export default Navbar