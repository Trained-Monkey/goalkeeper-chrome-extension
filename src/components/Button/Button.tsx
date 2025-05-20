import React from "react";

interface ButtonInput {
  onClick: any,

  content: string,

  isDanger?: boolean
}

function Button(prop: ButtonInput) {
  const {onClick, content, isDanger} = prop;

  let classNames: string[] = ["btn"];

  if (isDanger) {
    classNames.push("btn-danger");
  } else {
    classNames.push("btn-primary");
  }

  return <>
    <button className={classNames.join(" ")} onClick={onClick}>
      {content}
    </button>
  </>
}

export default Button;