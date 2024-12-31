import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dropzone/styles.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Suspense, lazy } from "react";

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import LoadingPage from './components/common/LoadingPage';

const MainPage = lazy(() => import('./pages/MainPage'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
]);

function App() {
    return (
        <MantineProvider>
            <Suspense fallback={<LoadingPage />}>
                <Notifications />
                <RouterProvider router={router} />
            </Suspense>
        </MantineProvider>
    )
}

export default App
