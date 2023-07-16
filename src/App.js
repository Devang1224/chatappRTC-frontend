import React, { useContext } from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { userContext } from "./contextApi/Usercontext";
import ErrorPage from "./pages/Error404page/ErrorPage";
import { ToastContainer } from "react-toastify";
// import Videocall from "./pages/VideoCall/Videocall";

function App() {


  const {data} = useContext(userContext);

console.log(data.Username,data.UserId)

const ProtectedRoute = ({ children }) => {
  if (!data.Username || typeof data.Username === "undefined") {
    return <Navigate to="login" />;
  }
  return children;
};


  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
           <Route path="/">
            <Route index element={
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>} />
          <Route path="login" element={<Login/>}/>
         <Route path="register" element={<Register/>}/>
         <Route path="*" element={<ErrorPage/>}/>
      </Route>

     </Routes>
 </BrowserRouter>

 <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div> 
  );
}

export default App;
