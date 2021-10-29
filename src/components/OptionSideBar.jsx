import React from 'react';
import useActiveRoute from 'hooks/useActiveRoute';
import { Link } from 'react-router-dom';

const OptionSideBar = ({ icon, route, label, mod }) => {
    const iFocused = useActiveRoute(route);
    return (
        <Link to={route}>
            <button
                className={`p-1 ${mod} mb-2 bg-${iFocused ? 'green' : 'blue'}-500 hover:bg-green-300 hover:scale-150 flex w-full items-center text-white rounded-lg shadow-lg `}
            >
                <p className="flex items-center m-2 text-center">
                    <span className="material-icons mr-5">
                        {icon}
                    </span>
                    {label}
                </p>
            </button>
        </Link>
    )
}

export default OptionSideBar
