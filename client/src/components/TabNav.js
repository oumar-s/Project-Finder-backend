import { React, useState } from 'react';
import { Link } from 'react-router-dom';
//import { NavLink } from 'react-router-dom';

const TabNav = (props) => {
    const [activeTab, setActiveTab] = useState("Projects");

    const handleTabChange = (tab) => {
        console.log(tab, activeTab);
        setActiveTab(tab);
    }
    //console.log("tabs");

    return (
        <div className="tab-nav flex gap-4 justify-center mb-8 text-slate-500 h-16 md:h-14 border-b">
            {props.tabs.map((tab) => (
                <Link key={tab.id} to={tab.link}>
                    <button
                        onClick={() => handleTabChange(tab.name)}
                        className={`${activeTab === tab.name ? "border-b-2 border-blue-500" : "hover:border-b-2 hover:border-slate-300"}`}
                    >
                        {tab.name}
                    </button>
                </Link>
            ))}
        </div>
    );
}

export default TabNav;