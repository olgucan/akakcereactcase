import React from 'react'
import { useLocation } from 'react-router-dom'
import { json } from "@remix-run/node";
import { useLoaderData, Links ,Scripts } from "@remix-run/react";
import stylesheet from "../../tailwind.css";
import { Link ,  useNavigate, } from "react-router-dom";
import Rating from '@mui/material/Rating';
export const links = () => [
  { rel: "stylesheet", href: stylesheet },
];
export let loader = async (code) => {
  const response = await fetch(`https://mocki.io/v1/1a1fb542-22d1-4919-914a-750114879775?code=${code}`);
  const data = await response.json();
 
  return json(data);
};
const _index = () => {
  const location = useLocation()
  const { from } = location.state
  const navigate = useNavigate();

  const horizontaldata = useLoaderData(from);
console.log(horizontaldata,'singledata')
  console.log(from,'blogtan geleln')
  return (
    <div className="" style={{display:"flex",alignItems:"center",
    gap: "1rem",margin:"50px auto",width:"80%",flexDirection:'column'}}
    >
           <div  style={{alignSelf:"flex-start",width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
           <div>
            <p style={{color:"blue",fontSize:"11px"}}>{horizontaldata.result.mkName}</p>
           <small className="text-blue-300">{horizontaldata.result.productName}</small>
           
            <p className="text-sm text-gray-500">{horizontaldata.result.badge}</p>
           </div>
            <div style={{float:"right"}}>
            
             <Rating name="read-only" value={   horizontaldata.result.rating} readOnly />
           </div>
           </div>
          <div className="w-1/2 relative">
          <img src={horizontaldata.result.imageUrl} alt="" className="h-40 w-full   cursor-pointer hover:scale-105 ease-in-out duration-300" />
        
          </div>
         <div style={{textAlign:"center"}}>
         <p> Kapasite Seçenekleri</p>
         <div style={{display:"flex",gap:"15px"}}>
          {horizontaldata.result.storageOptions.map(a=>(
            <button style={{width:"150px",height:"40px",border:"1px solid"}}>{a}</button>
          ))}
          </div>
         <p className="font-bold my-4 text-[18px]">{horizontaldata.result.price} TL</p>
            <p className="text-sm text-gray-500">{horizontaldata.result.countOfPrices} satıcı   </p>
          {horizontaldata.result.freeShipping && <p style={{color:"green"}}>Ücretsiz Kargo</p>}
          <p style={{fontSize:"11px",color:"grey"}}>Son güncelleme {horizontaldata.result.lastUpdate}</p>
         </div>
           <button className='px-8 py-4 text-black bg-white rounded-lg absolute top-12 left-4' onClick={() => navigate(-1)}>Go back</button>

         </div>
  )
}

export default _index
