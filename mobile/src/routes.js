import { createAppContainer, createSwitchNavigator } from "react-navigation";

import List from "./pages/List";
import Book from "./pages/Book";
import Login from "./pages/Login";

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    List,
    Book,
  })
);

export default Routes;
