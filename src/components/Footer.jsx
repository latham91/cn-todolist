import "./Footer.css";
import { LuHeart, LuCoffee } from "react-icons/lu";

export default function Footer() {
    return (
        <footer>
            Made with <LuHeart className="heart" size={20} /> and <LuCoffee className="coffee" size={20} /> by{" "}
            <a href="https://github.com/latham91">Aaron Latham</a>
        </footer>
    );
}
