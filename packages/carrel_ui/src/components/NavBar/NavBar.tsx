import React from 'react';
import { navBar, navBarTitle } from './NavBar.css';
import clsx from "clsx";
import {lightTheme} from "../../styles/light.css";



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
    <div className={clsx(navBar, "flex space-x-8 px-8")}>
      <div className={navBarTitle}>{title}</div>
      <div className="flex space-x-4">{menuBarItems}</div>
    </div>
  );
}
