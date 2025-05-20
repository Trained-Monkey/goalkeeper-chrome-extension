import React from "react"
import "./List.css";

export interface ListInput {
  // List items
  children: React.ReactNode,

  // Title to display
  title: string
}

function List(prop: ListInput): React.JSX.Element {
  const { children, title } = prop;

  return <div className="list-container">
    <div className="list-header">
      <h1>{title}</h1>
    </div>

    <ul className="list-content list-group">
      {children}
    </ul>
  </div>
}

export default List;