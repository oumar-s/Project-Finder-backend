import { React } from 'react';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';
import Avatar from './Avatar';
import { ReactComponent as RightNavX } from '../assets/images/x.svg';
import { ReactComponent as LeftNavX } from '../assets/images/x.svg';
import { ReactComponent as Logo } from '../assets/images/logo.svg';




const Navlinks = ({ type, rightNavHandler, leftNavHandler }) => {

  if (type === 'navbar') {
    return (
      <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-8">
        <div className="">
          <Link className="nav-link text-xl font-semibold md:text-base md:font-normal" to="/home">Explore</Link>
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
        <div className='flex justify-between mb-8'>
          <Avatar type='2' />
          <button onClick={rightNavHandler}>
            <RightNavX fill="" />
          </button>
        </div>
        <div className="flex flex-col gap-y-4 md:gap-x-8 text-base font-normal">
        <div className="">
          <Link className="" to="/profile">Profile</Link>
        </div>
        <div className="">
          <Link className="" to="/profile/projects">Projects</Link>
        </div>
        <div className="">
          <Link className="" to="/profile/teams">Teams</Link>
        </div>
        <div className="">
          <Link className="" to="/profile/requests">Requests</Link>
        </div>
        <div className="">
          <Link className="" to="/account">Account</Link>
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