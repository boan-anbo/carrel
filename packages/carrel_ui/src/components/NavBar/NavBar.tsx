import React from 'react';
import clsx from "clsx";



export interface NavBarProps {
  /**
   * The title of the NavBar, usually the name of the app.
   */ 
  title?: string;

  /**
   * MenuBarItems to be displayed in the NavBar. 
   * ReactElement []
   */
  menuBarItems?: React.ReactNode[];

}

export function NavBar({title = 'Title', menuBarItems= []}: NavBarProps) {
  return (
    <div className={clsx( "flex space-x-8 px-8")}>
      <div >{title}</div>
      <div className="flex space-x-4">{menuBarItems}</div>
    </div>
  );
}
