import { MenuItem } from "@chakra-ui/react";
import { GiBee } from "react-icons/all";
import { Link } from "react-router-dom";
import { LeftMenuItem } from "../../../core/nav/LeftMenu/components/LeftMenuItem/LeftMenuItem";
import { FireflyKeeperPageRoutes } from "../routes/firefly-keeper-page-routes";


export function FireflyKeeperMenu() {


    return (
      <>
        <Link to={FireflyKeeperPageRoutes.home.absolutePath}>
          <LeftMenuItem>Keeper's house </LeftMenuItem>
        </Link>

        <Link to={FireflyKeeperPageRoutes.fireflies.absolutePath}>
          <LeftMenuItem>Fireflies</LeftMenuItem>
        </Link>

      </>
    );
}
