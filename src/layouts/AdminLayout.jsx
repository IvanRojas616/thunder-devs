import AdminSideBar from 'components/admin/AdminSideBar'
import AdminSideBarResponsive from 'components/admin/AdminSideBarResponsive'
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import { retrieveDataUser } from 'utils/apiUsers';
import { useUserInfo } from 'context/userInfoContext';

const AdminLayout = ({ children }) => {
    const { setUserInfo } = useUserInfo();
    const { isAuthenticated, isLoading, getAccessTokenSilently, error, loginWithRedirect, logout } = useAuth0();
    const [loadingUserInformation, setLoadingUserInformation] = useState(false);
    
    useEffect(() => {
        const fetchAuth0Token = async () => {
            setLoadingUserInformation(true);
            const accessToken = await getAccessTokenSilently({
                audience:"https://authtokenthunder/",
            });
            console.log(accessToken);
            localStorage.setItem('token', accessToken);

            await retrieveDataUser(
                (response) => {
                    console.log(response);
                    setLoadingUserInformation(false);
                    setUserInfo(response.data);
                },
                (error) => {
                    setLoadingUserInformation(false);
                    console.log("state error(rejected): ",error);
                    logout({returnTo:"https://afternoon-forest-65625.herokuapp.com/"});
                }
            );
        };

        
        if (isAuthenticated) {
            fetchAuth0Token();
        }
    }, [getAccessTokenSilently, isAuthenticated, setUserInfo, logout]);

    if(isLoading || loadingUserInformation) return (
        <main className="flex h-screen w-screen overflow-y-scroll bg-gray-100 items-center justify-center">
        <ReactLoading type="spin" color="#000000" height={500}/>
    </main>
    );

    if(error) return <div>{ error }</div>

    if (!isAuthenticated) {
        return loginWithRedirect();
    }
    return (
        <div className="flex w-screen h-screen flex-col lg:flex-row ">
            <AdminSideBarResponsive/>
            <AdminSideBar/>
            <main className="flex h-full w-full justify-center items-center overflow-y-scroll bg-gray-100">
                { children }
            </main>
        </div>
    )
}

export default AdminLayout
