import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './Components/Layouts/DefautLayout';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slides/userSlice';
import { useSelector } from 'react-redux';
import AdminLayout from './Components/Layouts/AdminLayout';
import { getDetailUserRequest } from './apiService/apiService';
import { QueryClient, QueryClientProvider } from 'react-query'; 
import {isJson} from './utils/utils'
const queryClient = new QueryClient();
function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const handleToken = async (access_token) => {
                try {
                    const token = access_token;
                    const decoded = jwtDecode(token);
                    if (decoded) {
                       
                        const resultUser = await getDetailUserRequest(decoded?.payload.userId, token);
                        console.log(resultUser);
                        dispatch(setUser({ ...resultUser.data, access_token: token }));
                           

                    }
                } catch (decodeError) {
                    console.error('Error decoding token:', decodeError);
                }
            
        };
        let storageData = localStorage.getItem('access_token');
        if (storageData && isJson(storageData)) {
            handleToken(JSON.parse(storageData));
        }
    }, []);
    
    

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Layout = route.layout === null ? Fragment : route.layout || DefaultLayout;
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        {user.isAdmin === 'ADMIN' &&
                            privateRoutes.map((route, index) => {
                                const Layout = route.layout || AdminLayout;
                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                    </Routes>
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
