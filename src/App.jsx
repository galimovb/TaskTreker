import React from 'react';
import {BrowserRouter as Router, Outlet, Route, Routes} from 'react-router-dom';
import {Layout} from 'antd';
import {AppSider} from "./components/layout/AppSider.jsx";
import {AppContent} from "./components/layout/AppContent.jsx";
import {LoginPage} from "./pages/loginPage/LoginPage.jsx";
import {RegistrPage} from "./pages/registrPage/RegistrPage.jsx";
import {MainPage} from "./pages/mainPage/MainPage.jsx";
import {FilterRoute} from "./components/route-check/FilterRoute.jsx";
import {ProjectTasksPage} from "./pages/projectTasksPage/ProjectTasksPage.jsx";
import {MyTasksPage} from "./pages/my-tasks/MyTasksPage.jsx";


export function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage/>}

                />
                <Route path="/reg" element={<RegistrPage/>}/>


                <Route
                    path="/*"
                    element={
                        <FilterRoute>
                            <Layout className="text-base min-h-screen">
                                <Layout hasSider>
                                    <AppSider />
                                    <AppContent>
                                        <Outlet />
                                    </AppContent>
                                </Layout>
                            </Layout>
                        </FilterRoute>
                    }
                >
                    <Route path="projects" element={<MainPage />} />
                    <Route path="projects/:id" element={<ProjectTasksPage />} />
                    <Route path="tasks" element={<MyTasksPage />} />
                </Route>
            </Routes>
        </Router>
    );
}
