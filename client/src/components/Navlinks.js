import { React } from 'react';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';
import Avatar from './Avatar';
import { ReactComponent as RightNavX } from '../assets/images/x.svg';
import { ReactComponent as LeftNavX } from '../assets/images/x.svg';



const Navlinks = ({ type, rightNavHandler, leftNavHandler }) => {

  if (type === 'navbar') {
    return (
      <div className="flex flex-col gap-y-8 md:flex-row md:gap-x-8">
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
      <div className="flex flex-col gap-y-8 md:gap-x-8">
        <div className='flex justify-between'>
          <Avatar type='2' />
          <button onClick={rightNavHandler}>
            <RightNavX fill="white" />
          </button>
        </div>

        <div className="">
          <Link className="nav-link text-xl font-semibold md:text-base md:font-normal" to="/profile">Profile</Link>
        </div>
        <div className="">
          <Link className="nav-link text-xl font-semibold md:text-base md:font-normal" to="/home">Projects</Link>
        </div>
        <div className="">
          <Link className="nav-link text-xl font-semibold md:text-base md:font-normal" to="/home">Teams</Link>
        </div>
        <div className="">
          <Link className="nav-link text-xl font-semibold md:text-base md:font-normal" to="/requests">Requests</Link>
        </div>
        <div className="">
          <Link className="nav-link text-xl font-semibold md:text-base md:font-normal" to="/account">Account</Link>
        </div>

        <div className="">
          <Link className="nav-link text-xl font-semibold md:text-base md:font-normal" to="/"><AuthButton /></Link>
        </div>

      </div>
    )
  }

  if (type === 'leftnav') {
    return (
      <div className="flex flex-col gap-y-8 md:gap-x-8">
        <div className='flex justify-between'>
          <Link className=" bg-white1 text-black  py-1 px-2 font-semibold rounded-sm" to="/">
            Synergy
          </Link>
          <button onClick={leftNavHandler}>
            <LeftNavX fill="white" />
          </button>
        </div>
        <div className="">
          <Link className="nav-link text-xl font-semibold md:text-base md:font-normal" to="/dashboard">Home</Link>
        </div>
        <div className="">
          <Link className="nav-link text-xl font-semibold md:text-base md:font-normal" to="/home">Projects</Link>
        </div>
        <div className="">
          <Link className="nav-link text-xl font-semibold md:text-base md:font-normal" to="/home">Teams</Link>
        </div>
        <div className="">
          <Link className="nav-link text-xl font-semibold md:text-base md:font-normal" to="/home">Explore</Link>
        </div>
      </div>
    )
  }




}

export default Navlinks;