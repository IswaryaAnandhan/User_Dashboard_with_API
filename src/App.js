import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { AllUsers , UserComments, UserDetails, UserPosts, UserTodos, EditPosts, Comments } from "./Containers"
import { PortalLayout} from "./Components";
import { UserProvider } from "./Components/UserContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<AllUsers />} />      
            <Route path="/" element={<PortalLayout />}>
               <Route path="/user_details/:userId" element={<UserDetails />} />
               <Route path="/posts/:userId" element={<UserPosts />} />
               <Route path="/:userId/posts/:postId/comments" element={<UserComments />} />
               <Route path="/:userId/posts/:postId/edit" element={<EditPosts />} /> 
               <Route path="/Allcomments/:userId" element={<Comments />} />  
               <Route path="/todos/:userId" element={<UserTodos />} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
