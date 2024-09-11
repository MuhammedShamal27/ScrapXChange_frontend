import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/user/userRoutes.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <Toaster closeButton postion="bottom-right" />
      <RouterProvider router={appRouter} />
    </Provider>
);
