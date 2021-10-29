import { createContext, useContext } from 'react';

export const UserInfoContext = createContext(null);

export const useUserInfo = () => {
  return useContext(UserInfoContext);
};