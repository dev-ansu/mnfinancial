import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./contexts/AuthContext";

const App = ()=>{
  return(
    <>
      <AuthProvider>
        <RouterProvider router={routes} />
        <ToastContainer autoClose={3000} position="top-right" />
      </AuthProvider>
    </>
  )
}

export default App;