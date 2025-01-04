import { React } from 'react';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';
import { UserCircle } from 'lucide-react';
import { ReactComponent as RightNavX } from '../assets/images/x.svg';
import { ReactComponent as LeftNavX } from '../assets/images/x.svg';
import { ReactComponent as Logo } from '../assets/images/logo.svg';




const Navlinks = ({ type, rightNavHandler, leftNavHandler, user }) => {
  if (type === 'navbar') {
    return (
      <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-8">
        <div className="">
          <Link className="nav-link text-xl font-semibold md:text-base md:font-normal" to="/teams">Explore</Link>
        </div>
        <div className="">
          <Link className="nav-link text-xl font-semibold md:text-base md:font-normal" to="/about">About</Link>
        </div>
        {/* <div className="">
          <Link className="nav-link" to="/home">Home</Link>
        </div>
        <div className="nav-item">
          <Link className="nav-link" to="/post">Post</Link>
        </div>
        <div className="nav-item">
          <Link className="nav-link" to="/requests">Requests</Link>
        </div>
        <div className="nav-item">
          <Link className="nav-link" to="/account">Account</Link>
        </div>
        <div className="nav-item">
          <Link className="nav-link" to="/profile">Profile</Link>
        </div> */}
      </div>
    )
  }

  if (type === 'rightnav') {
    return (
      <div className="">
        <div className='flex justify-between items-center mb-8'>
          <div className="flex items-center gap-3">
            {user?.profilePic ? (
              <div className='rounded-full border-2 border-blue-200'>
                <img
                src={user.profilePic}
                alt={user.firstName}
                className="w-10 h-10 rounded-full object-cover"
              />
              </div>
            ) : (
              <div className='rounded-full'>
                <div className='rounded-full'>
                  <UserCircle
                    className="w-10 h-10 rounded-full object-cover text-gray-600"
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
          </div>
          <button onClick={rightNavHandler}>
            <RightNavX fill="" />
          </button>
        </div>
        <div className="flex flex-col gap-y-4 md:gap-x-8 text-base font-normal">
          <div className="">
            <Link className="" to="/profile">Profile</Link>
          </div>
          <div className="">
            <Link className="" to="/profile/projects">My projects</Link>
          </div>
          <div className="">
            <Link className="" to="/profile/teams">My teams</Link>
          </div>
          <div className="">
            <Link className="" to="/profile/tasks">My tasks</Link>
          </div>
          <div className="">
            <Link className="" to="/account">Settings</Link>
          </div>

          <div className="">
            <Link className="" to="/"><AuthButton /></Link>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'leftnav') {
    return (
      <div className="">
        <div className='flex justify-between mb-8'>
          <Link className=" " to="/">
            <Logo />
          </Link>
          <button onClick={leftNavHandler}>
            <LeftNavX fill="" />
          </button>
        </div>
        <div className="flex flex-col gap-y-4 text-base font-normal md:gap-x-8">
        <div className="">
          <Link className="" to="/dashboard">Home</Link>
        </div>
        <div className="">
          <Link className="" to="/home">Projects</Link>
        </div>
        <div className="">
          <Link className="" to="/home">Teams</Link>
        </div>
        <div className="">
          <Link className="" to="/home">Explore</Link>
        </div>
        </div>
      </div>
    )
  }




}

export default Navlinks;