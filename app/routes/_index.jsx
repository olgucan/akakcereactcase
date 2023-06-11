
import {Outlet, LiveReload} from "@remix-run/react"
import { useLoaderData, Links ,Scripts } from "@remix-run/react";
//import { json } from 'remix-utils';
import { useState, useEffect } from 'react';
import { json } from "@remix-run/node";
import axios from 'axios';
import { Link } from "react-router-dom";


export let loader = async () => {



  const response = await fetch('https://mocki.io/v1/59906f35-d5d5-40f7-8d44-53fd26eb3a05');
  const data = await response.json();
 
  return json(data);
};
export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const child   = { width: `30em`, height: `100%`}
  const parent  = { width: `60em`, height: `100%`}
  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let nextUri = 'https://mocki.io/v1/59906f35-d5d5-40f7-8d44-53fd26eb3a05';
      let newData = [];
    
      while (nextUri ) {
        try {
          const response = await axios.get(nextUri);
       //   console.log(response.data,'data')
          newData = newData.concat(response.data.result.products);
          nextUri = response.data.result.nextUrl;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      setData(newData);
      
    };

    fetchData();
  }, []);
  //console.log(data)
  useEffect(()=> {
         
  },[data])
  const horizontaldata = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  
  return (
    <>
  
    <div className='relative flex items-center w-4/5 mx-auto my-8'>
      
        <div
          id='slider'
          className='w-full h-full overflow-x-scroll scroll  scroll-smooth scrollbar-hide flex '
        >
          {horizontaldata.result.horizontalProducts.map((item) => (
         <div key={item.index} className="flex items-center justify-end h-[250px]   gap-2 w-[400px] shrink-0">
          <div className="w-1/2 relative">
          <Link to={`/blog`} state={{ from: item.code }}>
          <img src={item.imageUrl} alt="" className="h-40 w-full   cursor-pointer hover:scale-105 ease-in-out duration-300" />
          </Link>
          <div className="absolute w-12 h-12 flex justify-center items-center -right-2 top-0 rounded-full bg-[red] text-[white] text-[12px]">
             %{item.dropRatio}
           </div>
          </div>
         
           <div className="w-1/2">
            <small className="text-blue-300">{item.name}</small>
            <p className="font-bold my-4 text-[18px]">{item.price} TL</p>
            <p className="text-sm text-gray-500">{item.countOfPrices} satıcı &gt;  </p>
            <p className="text-sm text-gray-500">{item.followCount}+ takip</p>
           </div>
         </div>
          ))}
        </div>
     
      </div>
      <div className="container mx-auto w-4/5 mt-8 mb-24">
        <div className="grid grid-cols-2 gap-4 mx-auto">
        {currentItems.map(item=>
            <div key={item.index} className="flex flex-col items-center justify-end h-[350px]   gap-2  ">
            <div className="w-1/2 relative">
            <Link to={`/blog`} state={{ from: item.code }}>
          <img src={item.imageUrl} alt="" className="h-40 w-full   cursor-pointer hover:scale-105 ease-in-out duration-300" />
          </Link>
           {item.dropRatio &&  <div className="absolute w-12 h-12 flex justify-center items-center -left-12 top-0 rounded-full bg-[red] text-[white] text-[12px]">
               %{item.dropRatio}
             </div>}
            </div>
           
             <div className="w-1/2">
              <small className="text-blue-600">{item.name}</small>
              <p className="font-bold my-4 text-[18px]">{item.price} TL</p>
              <p className="text-sm text-gray-500">{item.countOfPrices} satıcı &gt;  </p>
              <p className="text-sm text-gray-500">{item.followCount}+ takip</p>
             </div>
           </div>)}
          </div>
         <div className="w-full flex justify-center gap-4">
         <button onClick={previousPage} >1.sayfa</button>
          <button onClick={nextPage}>2. sayfa</button>
         </div>
         <Outlet />
  
   
  <Links />
  
   {/* <LiveReload/> */}
   <Scripts/>
      </div>
  
   </>
  
 
  )
}
