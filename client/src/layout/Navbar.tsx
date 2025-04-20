import { ColorModeButton } from "@/components/ui/color-mode";
import { Button } from "@chakra-ui/react/button";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link to="/">Foundry Companion</Link>
                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Button variant="ghost">Change Character Sheet</Button>
                        </li>
                    </ul>
                    <ColorModeButton />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
