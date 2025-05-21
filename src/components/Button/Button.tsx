import React from "react";

interface ButtonInput {
  onClick: any,

  content: string,

  isDanger?: boolean,

  type?: "submit" | "button" | "reset" 
}

function Button(prop: ButtonInput) {
  const { onClick, content, isDanger, type } = prop;

  let classNames: string[] = ["btn"];

  if (isDanger) {
    classNames.push("btn-danger");
  } else {
    classNames.push("btn-primary");
  }

  return <>
    <button
      className={classNames.join(" ")}
      onClick={onClick}
      type={type}
    >
      {content}
    </button>
  </>
}

export default Button;