import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./style.css";

function ButtonBack({ to, children, onClick, ...props }) {
  const navegate = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (to) navegate(to);
  };

  return (
    <div {...props}>
      <IoChevronBackOutline className="icon" onClick={handleClick} />
      {children}
    </div>
  );
}

export default ButtonBack;
