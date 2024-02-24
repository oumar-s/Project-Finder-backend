import { React, useState } from 'react';
import { Link } from 'react-router-dom';
//import { NavLink } from 'react-router-dom';

const TabNav = () => {
    const [activeTab, setActiveTab] = useState("Projects");

    const handleTabChange = (tab) => {
        console.log(tab, activeTab);
        setActiveTab(tab);
    }

    const tabs = [
        {id: 1, name: 'Projects'}, {id: 2, name: "Teams"}
    ];
    return (
        <div className="tab-nav flex gap-4 justify-center mb-8 text-slate-500 h-16 md:h-14 border-b">
            {tabs.map((tab) => (
                <Link to={tab.name === 'Projects' ? '/home' : '/teams'}>
                    <button
                        key={tab.id}
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