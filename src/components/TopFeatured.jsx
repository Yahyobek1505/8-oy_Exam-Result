import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from './utils';
import { create } from '../redux/authSlice';
import RingLoader from "react-spinners/RingLoader";
import { useNavigate } from 'react-router-dom';

const TopFeatured = () => {
  const [topMix, setTopMix] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let currentToken = token;
        
        if (!currentToken) {
          currentToken = await getToken();
          dispatch(create(currentToken));
        }

        const response = await fetch(`${import.meta.env.VITE_API_TOP_MIX}browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTopMix(data.playlists.items);
      } catch (error) {
        console.error('Error fetching top mix:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, dispatch]);

  const handleRedirect = (playlistId) => {
    navigate(`/playlist/${playlistId}`); // Redirect to playlist page with ID
  };

  return (
    <div className='w-[96%] mx-auto pt-4'>
      <div className="card-wrapper w-full flex gap-4 flex-wrap justify-center">
        {isLoading ? (
          <RingLoader color="#8136d7" className='mt-16 w-96' />
        ) : (
          topMix.length > 0 && topMix.slice(0, 6).map((el, index) => (
            <div key={index} className='flex flex-wrap gap-8 justify-between'>
              <div className="cursor-pointer">
                <div onClick={() => handleRedirect(el.id)} className="card-top flex items-center w-full">
                  <img src={el.images[0].url} alt={el.name} className="rounded-l-md w-[80px] h-[82px]" />
                  <div className="card-title w-[310px] rounded-r-md pl-5 py-7 bg-[#3d3d7e]">
                    <h3 className="text-xl text-white font-semibold w-full">{el.name}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopFeatured;


// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getToken } from './utils';
// import { create } from '../redux/authSlice';
// import RingLoader from "react-spinners/RingLoader";
// import { useNavigate } from 'react-router-dom';
// const TopFeatured = () => {
//   const [topMix, setTopMix] = useState([])
//   const [isLoading, setIsloading] = useState(false)
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const token = useSelector(state => state.auth.token)
//   useEffect(() =>{
//     setIsloading(true)
//   if (token) {
//     fetch(`${import.meta.env.VITE_API_TOP_MIX}browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists`, {
//       method: "GET",
//       headers:{
//         Authorization: `Bearer ${token}`,
//       },

//     })
//     .then(res => res.json())
//     .then(data =>{
//       console.log(21, data);
//       setTopMix(data.playlists.items)
//       setIsloading(false)
//     })
//     .catch(error =>{
//       console.log(error);
//     })
//   }else{
//     getToken()
//     .then(res =>{
//       dispatch(create(res))
//     })
//     .catch(error =>{
//       console.log(error);
//     })
//   }
//   }, [token])
//   const  handleRedirect = (playlistId) =>  {
//     navigate(`playlist/${playlistId}`);
//   }
//   return (
//     <div className='w-[96%]  mx-auto pt-4'>
//      <div className="card-wrapper w-full flex gap-4 flex-wrap justify-center">
//       {
//       isLoading ? <RingLoader color="#8136d7"height={100} width={10} className='mt-16 w-96'/> : topMix.length > 0 && topMix.slice(0,6).map((el, index) =>{
//         return (
//           <div key={index} className='flex flex-wrap gap-8 justify-between'>
//             <div  className="cursor-pointer">
//             <div onClick={handleRedirect} className="card-top flex  items-center w-full">
//               <img src={el.images[0].url} alt="" className="rounded-l-md w-[80px] h-[82px]" />
//               <div className="card-title w-[310px] rounded-r-md pl-5 py-7 bg-[#3d3d7e]">
//                 <h3 className="text-xl text-white font-semibold  w-full">{el.name}</h3>
//               </div>
//             </div>
//           </div>
//           </div>
//         )
//        })
//       }
      
//       </div> 
//     </div>
//   )
// }

// export default TopFeatured
