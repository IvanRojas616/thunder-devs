import { useUserInfo } from 'context/userInfoContext';
import React from 'react'

const PrivateComponent = ({ roleList, children }) => {
    const { userInfo } = useUserInfo();

    console.log("user info: ",userInfo);

    console.log()
    if (roleList.includes(userInfo.role)) {
        return children;
    }

    return <></>;
}

export default PrivateComponent;
