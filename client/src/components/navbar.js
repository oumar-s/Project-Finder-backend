import { React, useState } from 'react';

import { useAuth } from "../context/authContext";
import { Link } from 'react-router-dom';
import Navlinks from './Navlinks';
import Avatar from './Avatar';
import AuthButton from './AuthButton';




import { ReactComponent as ThreeBars } from '../assets/images/three-bars.svg';
import { ReactComponent as X } from '../assets/images/x.svg';


const Navbar = ({ page }) => {
  const [showNav, setShowNav] = useState(false);
  const [showLeftNav, setshowLeftNav] = useState(false);
  const [showRightNav, setshowRightNav] = useState(false);
  const [ShowAddMenu, setShowAddMenu] = useState(false);

  const auth = useAuth();


  const handleNav = () => {
    setShowNav(!showNav);
  }

  const handleLeftNav = () => {
    setshowLeftNav(!showLeftNav);
  }

  const handleRightNav = () => {
    setshowRightNav(!showRightNav);
  }

  const handleAddMenu = () => {
    setShowAddMenu(!ShowAddMenu);
  }

  if (!auth.isAuthenticated) {
    return (
      <div className=''>
        <div className="flex items-center font-mono-sans text-white bg-black1 sticky top-0 h-16 border border-black1">
          <div className="flex flex-row  w-full justify-between  mx-4 md:mx-2 ">
            <div className="md:order-3">
              <AuthButton />
            </div>
            <div className="flex items-center gap-8 md:order-1">
              <Link className=" bg-slate-500 py-1 px-2 font-semibold rounded-sm" to="/">Synergy</Link>
              <div className="hidden md:flex md:order-2">
                <Navlinks type='navbar' />
              </div>
            </div>
            <button onClick={handleNav} className="md:hidden">
              {showNav ? <X fill="white" /> : <ThreeBars fill="white" />}
            </button>
          </div>
        </div>
        {showNav &&
          <div className="flex flex-col items-end absolute top-16 right-0 z-10 w-full h-32 bg-black1 text-white pr-8 md:hidden">
            <Navlinks type='navbar' />
          </div>
        }
      </div>
    )
  }

  return (
    <div className=''>
      <div className="flex items-center justify-between bg-white1 h-16 px-4 md:px-2">
        
        {/* left nav */}
        <div className="flex flex-row items-center gap-4  ">
          <button onClick={handleLeftNav} className="border p-2 rounded-md">
            <ThreeBars />
          </button>
          <Link className=" bg-black text-white1 py-1 px-2 font-semibold rounded-sm" to="/">
            Synergy
          </Link>
          <div>
            <h1 className='text-sm font-semibold'>{page}</h1>
          </div>
        </div>

        {/* right nav */}
        <div className="flex flex-row items-center gap-2">
          <button className="border px-4" onClick={handleAddMenu}>
            +
          </button>
          <button onClick={handleRightNav} className="">
            <Avatar type='1' />
          </button>
        </div>
      </div>

      {showNav &&
        <div className="flex flex-col items-end absolute top-16 right-0 z-10 w-full min-h-32 bg-black1 text-white p-8 md:hidden">
          <Navlinks type='rightnav' />
        </div>
      }
      {showRightNav &&
        <div className="flex flex-col absolute top-0 right-0 z-10 w-80 h-full rounded-l-2xl bg-black1 text-white p-8">

          <Navlinks type='rightnav' rightNavHandler={handleRightNav} />
        </div>
      }

      {showLeftNav &&
        <div className="flex flex-col absolute top-0 z-10 w-80 h-full rounded-r-2xl bg-black1 text-white p-8">
          <Navlinks type='leftnav' leftNavHandler={handleLeftNav} />
        </div>
      }

      {ShowAddMenu &&
        <div className="flex flex-col absolute top-16 right-10 z-10 w-48 h-60 rounded-2xl shadow-xl bg-white text-sm  p-2 border">
          <div className='flex flex-col'>
            <Link to='/post' onClick={handleAddMenu} className="p-2   rounded-lg hover:bg-white1" >
              New project
            </Link>
            <Link to='/add-team' onClick={handleAddMenu} className="p-2 rounded-lg hover:bg-white1">
              New team
            </Link>
          </div>
        </div>
      }
    </div>
  )

}

export default Navbar;