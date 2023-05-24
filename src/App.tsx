import 'bootstrap/dist/css/bootstrap.min.css';
import "flatpickr/dist/flatpickr.css";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Toast, { ToastPros } from "./Components/Toast";
import RenderRouters from "./routes";

export const AppContext = React.createContext<any>(null);

const App = () => {
  const [toast, setToast] = useState<ToastPros>({ open: false, message: '', type: 'info' });

  return <>
    <AppContext.Provider value={{ setToast: setToast }}>
      <BrowserRouter>
        <RenderRouters />
      </BrowserRouter>
    </AppContext.Provider>

    <Toast open={toast?.open}
      message={toast?.message}
      type={toast?.type}
      onClose={() => setToast({ open: false, message: '' })}
    />
  </>
}

export default App;
