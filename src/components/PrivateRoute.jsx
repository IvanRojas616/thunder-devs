import { useUserInfo } from 'context/userInfoContext';
import React from 'react';

const PrivateRoute = ({ roleList, children }) => {
    const { userInfo } = useUserInfo();

    console.log("user info: ", userInfo);
    if (roleList.includes(userInfo.role)) {
        return children;
    }

    return (
    <section className="flex items-center flex-col justify-center">
        <h1 className="text-7xl text-bolder mb-8" >Not Authorized '_'</h1>
        <img src="https://image.flaticon.com/icons/png/512/827/827301.png" alt="estepicursor" className="w-72 h-72" />
    </section>
    );
}

export default PrivateRoute;
