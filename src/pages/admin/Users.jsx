import PrivateComponent from 'components/PrivateComponent';
import { useUserInfo } from 'context/userInfoContext';
import { nanoid } from 'nanoid';
import React from 'react'
import { useEffect, useState } from 'react';
import { editUser, retrieveAllUsers } from 'utils/apiUsers';


const Users = () => {
    const [users, setUsers] = useState([]);
    const { userInfo, setUserInfo } = useUserInfo();
    useEffect(() => {
        const fetchUsers = async () => {
            await retrieveAllUsers((res) => {
                console.log("d", res.data);
                setUsers(res.data);
            }, (err) => {
                console.log(err);
            });
        }
        fetchUsers();
    }, []);
    return (

        <PrivateComponent roleList={["admin"]}>

            <table>


                <tbody>

                    {
                        users.map((user) => {
                            return (
                                <tr key={nanoid()}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><RolesSelect user={user} setUserCurrent= {setUserInfo} userCurrent={userInfo} /></td>
                                <td><StateSelect user={user}  /></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </PrivateComponent>
    )
}


const RolesSelect = ({ user, setUserCurrent, userCurrent }) => {
    const [role, setRole] = useState(user.role ?? "");

    useEffect(() => {

        const editUserK = async () => {
            await editUser(user._id, { role }, (res) => {
                console.log(res);
                if(userCurrent._id === user._id){
                    userCurrent.role = role;
                    setUserCurrent(userCurrent);
                }
            }, (err) => {
                console.error(err);;
            });
        }
        if (user.role !== role) {
            editUserK();
        }

    }, [role,user, userCurrent, setUserCurrent]);
    return (
        <select value={role} onChange={(e) => { setRole(e.target.value) }}>
            <option disabled value="">Select a role</option>
            <option value="no role">Without Role</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="inactive">Inactive</option>
        </select>
    )
}


const StateSelect = ({ user }) => {
    //?? si no tiene esa propiedad ponemos ""
    const [state, setState] = useState(user.state ?? "");

    useEffect(() => {

        const editUserState = async () => {
            await editUser(user._id, { state }, (res) => {
                console.log(res);
            }, (err) => {
                console.error(err);
            });
        }
        if (user.state !== state) {
            editUserState();
        }

    }, [state, user]);
    return (
        <select value={state} onChange={(e) => { setState(e.target.value) }}>
            <option className="text-gray-200" disabled value="">Select a state</option>
            <option value="authorized">Authorized</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
        </select>
    )
}

export default Users;
