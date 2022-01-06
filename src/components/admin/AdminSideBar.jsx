import { useAuth0 } from '@auth0/auth0-react';
import PrivateComponent from 'components/PrivateComponent';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import OptionSideBar from '../OptionSideBar';


const AdminSideBar = () => {
    const { logout, user } = useAuth0();

    const closeSession = () => {
        localStorage.clear();
        logout({ returnTo: "https://afternoon-forest-65625.herokuapp.com/" });
    }
    return (
        <nav className="hidden lg:flex lg:w-72 border border-gray-300 h-full flex-col bg-gray-200 p-2">

            <Link to='/admin'>
                <Logo />
            </Link>

            <div className="flex flex-col w-full">

                <OptionSideBar icon="point_of_sale" route="/admin" label="Sales" />

                <PrivateComponent roleList={["admin"]}>
                <OptionSideBar icon="inventory_2" route="/admin/products" label="Products" />

                <OptionSideBar icon="people" route="/admin/users" label="Users" />
                </PrivateComponent>
                
                <LogoutProfileButton executeWhenClick={ closeSession } user={user}/>                
            </div>


        </nav>
    )
}


const LogoutProfileButton = ({ executeWhenClick, user }) => {
    return (
        <div className="flex justify-between p-1 bg-gray-500 w-5/5 hover:scale-150 flex items-center text-white rounded-lg shadow-lg absolute bottom-0 w-56 mb-3" >
            <div className="flex items-center">
            <img className="w-10 h-10 mr-2" src={user ? user.picture : ""} alt="profile" />
            { user.name } 
            </div>
            <button type="button" className="bg-red-400 mr-3 rounded-lg hover:bg-red-700" onClick={() => { executeWhenClick() }}>
            <span className="material-icons m-1 ">
                        logout
                    </span>
            </button>
        </div>
    )
}

export default AdminSideBar;
