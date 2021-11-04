import IRoute from "../Interfaces/route";
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
