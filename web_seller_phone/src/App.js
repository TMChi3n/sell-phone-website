import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import DefaultLayout from './Components/Layouts/DefautLayout';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slides/userSlice';

import { getDetailUserRequest } from './apiService/apiService';

function App() {
    const dispatch = useDispatch();

    const handleToken = (access_token) => {
        if (access_token) {
            try {
                const token = access_token;
                const decoded = jwtDecode(token);
                if (decoded) {
                    const fetchApi = async () => {
                        try {
                            const resultUser = await getDetailUserRequest(decoded?.id_user, access_token);
                            console.log(resultUser);
                            dispatch(setUser({ ...resultUser.data, access_token: token }));
                        } catch (e) {
                            alert('Error when login');
                        }
                    };

                    fetchApi();
                }
            } catch (decodeError) {
                console.error('Error decoding token:', decodeError);
            }
        } else {
            console.log('No access token received');
        }
    };
    useEffect(() => {
        let storageData = localStorage.getItem('access_token');
        if (storageData) {
            console.log(typeof storageData);
            handleToken(storageData);
        }
    }, []);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
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
                            ></Route>
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
