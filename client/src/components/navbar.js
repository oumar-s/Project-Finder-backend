import { React, useState, useEffect, useRef } from 'react';
import { UserCircle } from 'lucide-react';
import ErrorMessage from './ErrorMessage';
import { useAuth } from '../context/authContext';
import { useGetUserByIdQuery } from '../features/api/apiSlice';
import { Link } from 'react-router-dom';
import Navlinks from './Navlinks';
import Avatar from './Avatar';
import AuthButton from './AuthButton';
import { Plus, ChevronDown } from 'lucide-react';
import { ReactComponent as ThreeBars } from '../assets/images/three-bars.svg';
import { ReactComponent as X } from '../assets/images/x.svg';
import { ReactComponent as Logo } from '../assets/images/logo.svg';

const Navbar = ({ page }) => {
  const [showNav, setShowNav] = useState(false);
  const [showLeftNav, setshowLeftNav] = useState(false);
  const [showRightNav, setshowRightNav] = useState(false);
  const [ShowAddMenu, setShowAddMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const auth = useAuth();
  const { data: user, error: userError, isLoading: userLoading } = useGetUserByIdQuery(
    auth?.user?.id,
    {
      skip: !auth.isAuthenticated
    }
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (auth.isAuthenticated && (userLoading || userError)) {
    return <ErrorMessage loading={userLoading} error={userError} />;
  }

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
        <div className="flex items-center font-mono-sans text-gray-700 bg-white1 sticky top-0 h-16 border-b">
          <div className="flex flex-row  w-full justify-between  mx-4 md:mx-2 ">
            <button onClick={handleNav} className="md:hidden">
              {showNav ? <X /> : <ThreeBars />}
            </button>
            <div className="flex items-center gap-8 md:order-1">
              {/* make logo white */}
              <div className="brand flex items-center gap-1">
                <Logo />
                <Link className="text-xl font-semibold" to="/">Synergy</Link>
              </div>
              <div className="hidden md:flex md:order-2 ">
                <Navlinks type='navbar' user={user} />
              </div>
            </div>
            <div className="md:order-3">
              <AuthButton />
            </div>
          </div>
        </div>
        {showNav &&
          <div className="flex flex-col absolute pt-4 pl-4 top-16 right-0 z-10 w-full h-64 bg-white1 border-b rounded-lg md:hidden">
            <Navlinks type='navbar' user={user} />
          </div>
        }


      </div>
    )
  }

  return (
    <div className=''>
      <div className={`flex items-center justify-between bg-gray-50 h-16 px-4 md:px-2 relative z-50`}>

        {/* left nav */}
        <div className="flex flex-row items-center gap-4  ">
          {/* <button onClick={handleLeftNav} className="border p-2 rounded-md">
            <ThreeBars />
          </button> */}
          <Link className="" to="/dashboard">
            <Logo />
          </Link>
          <div>
            <h1 className='text-sm font-semibold'>{page}</h1>
          </div>
        </div>

        {/* right nav */}
        {/* <div className="flex flex-row items-center gap-2">
          <button className="border px-4" onClick={handleAddMenu}>
            +
          </button>
          <button onClick={handleRightNav} className="">
            <Avatar type='1' />
          </button>
        </div> */}
        {/* Right section: Add button and Profile */}
        <div className="flex items-center gap-4">
          {/* Custom Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4" />
              Add New
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <Link
                  to="/new-project"
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  New Project
                </Link>
                <Link
                  to="/add-team"
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  New Team
                </Link>
              </div>
            )}
          </div>

          {/* Profile Image */}
          <div className="relative">
            <button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={handleRightNav}>
            {auth?.user?.profilePic ? (
                  <div className='rounded-full border-2 border-blue-200'><img
                    src={user.profilePic}
                    alt={user.firstName}
                    className="w-10 h-10 rounded-full object-cover"
                  /></div>
                ) : (
                  <div className='rounded-full'>
                    <div className='rounded-full'>
                    <UserCircle
                    className="w-10 h-10 rounded-full object-cover bg-gray-50 text-gray-600"
                    />
                  </div>
                  </div>
                )}
            </button>
          </div>
        </div>
      </div>

      {showNav &&
        <div className="flex flex-col items-end absolute top-16 right-0 z-10 w-full min-h-32 bg-black1 text-white p-8 md:hidden">
          <Navlinks type='rightnav' user={user} />
        </div>
      }

      {/* {showRightNav &&
        <div className="flex flex-col absolute top-0 right-0 z-10 w-80 h-full rounded-l-2xl bg-black1 text-white p-8">

          <Navlinks type='rightnav' rightNavHandler={handleRightNav} />
        </div>
      } */}
      {showRightNav &&
        <>
          {/* Shadow overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-[60]"
            onClick={handleRightNav}
          />
          <div className="flex flex-col absolute top-0 right-0 z-[70] w-80 h-full rounded-l-2xl bg-white p-8 shadow-2xl">
            <Navlinks type='rightnav' rightNavHandler={handleRightNav} user={user} />
          </div>
        </>
      }

      {/* {showLeftNav &&
        <div className="flex flex-col absolute top-0 z-10 w-80 h-full rounded-r-2xl bg-black1 text-white p-8">
          <Navlinks type='leftnav' leftNavHandler={handleLeftNav} />
        </div>
      } */}

      {/*showLeftNav &&
        <>
          <div
            className="fixed inset-0 bg-black/30 z-10"
            onClick={handleLeftNav}
          />
          <div className="flex flex-col absolute top-0 left-0 z-20 w-80 h-full rounded-r-2xl bg-white p-8 shadow-">
            <Navlinks type='leftnav' leftNavHandler={handleLeftNav} />
          </div>
        </>
      */}

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