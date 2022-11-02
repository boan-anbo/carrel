import * as React from "react";
import { Link } from "react-router-dom";
import { CgBoard, FcManager } from "react-icons/all";
import { CarrelPageRoutes } from "../routes/carrel-page-routes";
import { Button } from "@chakra-ui/react";
import { LeftMenuItem } from "../../../../ui/layout/nav/LeftMenu/components";

export function CarrelMenu() {
  return (
    <>
      <Link to={CarrelPageRoutes.home.absolutePath}>
        <LeftMenuItem>Manager</LeftMenuItem>
      </Link>
      <Link to={CarrelPageRoutes.board.absolutePath}>
        <LeftMenuItem>Project Boards</LeftMenuItem>
      </Link>
    </>
  );
}
