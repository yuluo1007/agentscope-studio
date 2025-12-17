import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import ChatPage from '@/pages/FridayPage/ChatPage';
import SettingPage from '@/pages/FridayPage/SettingPage';

import { RouterPath } from '@/pages/RouterPath.ts';
import { FridayAppRoomContextProvider } from '@/context/FridayAppRoomContext.tsx';
import { FridaySettingRoomContextProvider } from '@/context/FridaySettingRoomContext.tsx';

const FridayPage = () => {

    return (
        <div className="w-full h-full">
            <Routes>
                <Route
                    path={RouterPath.FRIDAY_CHAT}
                    element={
                        <FridayAppRoomContextProvider>
                            <ChatPage />
                        </FridayAppRoomContextProvider>
                    }
                />
                <Route
                    path={RouterPath.FRIDAY_SETTING}
                    element={
                        <FridaySettingRoomContextProvider>
                            <SettingPage />
                        </FridaySettingRoomContextProvider>
                    }
                />
                <Route
                    path="*"
                    element={
                        <FridayAppRoomContextProvider>
                            <ChatPage />
                        </FridayAppRoomContextProvider>
                    }
                />
            </Routes>
        </div>
    );
};

export default memo(FridayPage);
