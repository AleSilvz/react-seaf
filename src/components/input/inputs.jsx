import { useState } from "react";
import "./style.css";
import { IoEye, IoEyeOff, IoCheckmark } from "react-icons/io5";

function InputS({
  placeholder,
  icon: Icon,
  i = false,
  c = false,
  numericPassword = false,
  ...props
}) {
  const [see, setSee] = useState(false);

  return (
    <div className="container-component-input">
      <div className="container-input-icon">
        {Icon && <Icon className="icon-icon" />}
        <input
          {...props}
          type={numericPassword ? "text" : "text"}
          inputMode={numericPassword ? "numeric" : undefined}
          pattern={numericPassword ? "[0-9]*" : undefined}
          maxLength={numericPassword ? 6 : undefined}
          style={
            numericPassword
              ? see == false
                ? { WebkitTextSecurity: "disc" }
                : undefined
              : undefined
          }
          placeholder={placeholder}
        />
        {i ? (
          see == false ? (
            <IoEye className="see" onClick={() => setSee(true)} />
          ) : (
            <IoEyeOff className="see" onClick={() => setSee(false)} />
          )
        ) : undefined}
        {
            c == true ? <IoCheckmark className="check"/> : undefined
        }
      </div>
    </div>
  );
}

export default InputS;
