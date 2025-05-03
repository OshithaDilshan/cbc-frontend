import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
    return (
        <div className="bg-red-500">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>

        </div>
    )
}