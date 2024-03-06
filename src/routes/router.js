import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RenderTiming from "../render/RenderTiming";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/render",
        element: <RenderTiming />
    }
]);

export default router;