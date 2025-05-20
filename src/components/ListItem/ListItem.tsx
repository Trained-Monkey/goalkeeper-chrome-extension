import React from "react"
import "./ListItem.css";

export interface ListItemInput {
  children: React.ReactNode,

  // Indicates whether or not to mark the current item as successful
  isSuccess?: boolean
}

function ListItem(prop: ListItemInput): React.JSX.Element {
  const { children, isSuccess } = prop;

  let classNames: string[] = ["list-group-item"];

  if (isSuccess) {
    classNames.push("list-group-item-success");
  }

  return <li className={classNames.join(" ")}>
    {children}
  </li>
}

export default ListItem;