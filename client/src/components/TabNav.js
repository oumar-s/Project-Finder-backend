import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TabNav = (props) => {
    const location = useLocation();
    
    const handleTabChange = (tab) => {
        console.log(tab);
    }

    return (
        <div className="bg-gray-50 flex gap-6 pl-6 flex-wrap text-base text-gray-600 min-h-10 border-b">
            {props.tabs.map((tab) => (
                <Link key={tab.id} to={tab.link}>
                    <button
                        onClick={() => handleTabChange(tab.name)}
                        className={`px-2 py-1  transition-all duration-200 
                            ${location.pathname === tab.link 
                                ? "border-b-2 border-blue-500 text-blue-600" 
                                : "hover:bg-slate-200 hover:text-gray-800"}`}
                    >
                        {tab.name}
                    </button>
                </Link>
            ))}
        </div>
    );
}

export default TabNav;