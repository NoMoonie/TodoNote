import IRoute from "../Interfaces/pages/route";
import HomePage from "../Pages/Home";

const routes: IRoute[] = [
    {
        path: "/",
        name: "Home Page",
        component: HomePage,
        exact: true,
    },
];

export default routes;
