import SelectCharacterSheetDrawer from "@/components/SelectCharacterSheetDrawer";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <SelectCharacterSheetDrawer />
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
