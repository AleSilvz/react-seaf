import { useNavigate } from "react-router-dom";

function ButtonNav({ to, children, onClick ,...props }) {
  const navegate = useNavigate();

  const handleCick = (e) => {
    if (onClick) onClick(e);
    if (to) navegate(to);
  };

  return (
    <button {...props} onClick={handleCick}>
      {children}
    </button>
  );
}

export default ButtonNav;
