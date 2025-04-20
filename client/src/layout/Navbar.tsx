import { ColorModeButton } from "@/components/ui/color-mode";
import { IRootState } from "@/main";
import { openDrawer } from "@/slices/characterSheetSelectDrawerOpenSlice";
import { Button } from "@chakra-ui/react/button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();
    const sheetUuid = useSelector((state: IRootState) => state.sheetUuid.value);
    const hasSheet = sheetUuid != "";

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link to="/">Foundry Companion</Link>
                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        {hasSheet && (
                            <li className="nav-item">
                                <Button variant="ghost" onClick={() => dispatch(openDrawer(true))}>
                                    Change Character Sheet
                                </Button>
                            </li>
                        )}
                    </ul>
                    <ColorModeButton />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
