import {Outlet, LiveReload} from "@remix-run/react"
import { useLoaderData, Links ,Scripts } from "@remix-run/react";
//import { json } from 'remix-utils';
import { useState, useEffect } from 'react';
import { json } from "@remix-run/node";
import axios from 'axios';

import stylesheet from "~/tailwind.css";
export const links = () => [
  { rel: "stylesheet", href: stylesheet },
];
export let loader = async () => {



  const response = await fetch('https://mocki.io/v1/59906f35-d5d5-40f7-8d44-53fd26eb3a05');
  const data = await response.json();
 
  return json(data);
};
export default function App() {
  // let url = 'https://mocki.io/v1/59906f35-d5d5-40f7-8d44-53fd26eb3a05'
   const child   = { width: `30em`, height: `100%`}
   const parent  = { width: `60em`, height: `100%`}

return (
  <html lang="en">
  <head>
  <title>
    my app
  </title>
  </head>
 
<body>
<Outlet></Outlet>
</body>
    </html>
 
)
  

 
} 