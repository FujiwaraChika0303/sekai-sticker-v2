import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';

import { MantineProvider } from '@mantine/core';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import MainPage from './pages/MainPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
]);

function App() {
    return (
        <MantineProvider>
            <RouterProvider router={router} />
        </MantineProvider>
    )
}

export default App
