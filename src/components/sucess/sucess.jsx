import { IoCheckmark } from "react-icons/io5";
import './style.css'

function Sucess({ children}) {
    return (
        <div className="container-welcome">
            <IoCheckmark className="icon"/>
            {children}
        </div>
    )
}

export default Sucess