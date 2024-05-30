import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter,
         RouterProvider,
 } from 'react-router-dom';
import './index.css';
import Root, { 
  loader as rootLoader,
  action as rootAction,
 } from './routes/root.jsx';
import ErrorPage from "./error-page";
import Contact, 
  { loader as contactLoader } from './routes/contact';
import EditContact, { action as editAction} from './routes/edit.jsx';
import { action as destroyAction } from './routes/destroy.jsx';
import Index from './routes/index.jsx';
/**
 import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="dashboard" element={<Dashboard />} />
      ... etc. 
      </Route>
    )
  );
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
 */

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
//: is turning segment into a "dynamic" with 'URL Params'
// name of segment is :contactId so value will be passed
// as "params.contactId" and used to find a record
        path:"/contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div style={{textAlign:'center'}}>
          There was an error</div>,
      },
      { //"index:true" has given an error 'null page'
        // index: true,
        path: "",
        element: <Index />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
