import { useContext, useState } from "react";
import { set } from "react-hook-form";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ChatBar from "./big_components/ChatBar";
import  {LeftSideBar}  from "./big_components/LeftSideBar";
import Login from "./big_components/Login";
import {RightSideBar} from "./big_components/RightSideBar";
import { GlobalContext} from "./context/GlobalContext";
import { RoomDetailProvider } from "./context/RoomDetailContext";

function App() {
  const {user} = useContext(GlobalContext)
  const [showSidebar, setshowSidebar] = useState(true)
  const onShowSidebar = () => {
      setshowSidebar(!showSidebar)
  }

  return (
        <div className="flex h-screen">
          {
            (!user)
            ?<Login/>
            :
            // <RoomDetailProvider>

            <BrowserRouter>
              {/* <button className="focus:outline-none lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </button> */}
              <LeftSideBar showSidebar={showSidebar} onShowSidebar={onShowSidebar} />
              <Switch>

                <Route path="/rooms/:roomId">
                 <ChatBar onShowSidebar={onShowSidebar} />
                  {/* <RightSideBar/> */}
                </Route>

                <Route exact path="/">
                  <ChatBar onShowSidebar={onShowSidebar} />
                </Route>

              </Switch>
            </BrowserRouter>

            // </RoomDetailProvider>
          
          }
        </div>
  );
}

export default App;
