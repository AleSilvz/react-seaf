import { useNavigate } from "react-router-dom";

function ButtonMenu({children, onClick, to, icon: Icon}) {
    const navigate = useNavigate()
    function handleClick(e){
        if(onClick) onClick(e)
        if(to) navigate(to)
    }

  return (
    <div onClick={handleClick}>
      <div className="container-item">
        <div className="item-icon">
          {Icon}
        </div>
        <h3 style={{ fontSize: "15px", fontWeight: "300" }}>{children}</h3>
      </div>
    </div>
  );
}

export default ButtonMenu;
