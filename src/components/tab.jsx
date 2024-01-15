import { Link } from "react-router-dom";
import "./tab.css";
import { useLocation } from "react-router-dom";

const Tab = ({ name, link }) => {
  const location = useLocation();
  return (
    <Link
      to={link}
      className={
        location.pathname.substring(1) == link ? "selected tab" : "tab"
      }
    >
      <span>{name}</span>
    </Link>
  );
};

export default Tab;
