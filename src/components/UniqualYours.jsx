
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "./utils";
import { create } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const UniqualYours = () => {
  const [topMix, setTopMix] = useState([]);
  const [seeAll, setSeeAll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          const newToken = await getToken();
          dispatch(create(newToken));
        } else {
          const response = await fetch(`${import.meta.env.VITE_API_TOP_MIX}browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists`, 
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setTopMix(data.playlists.items);
        }
      } catch (error) {
        console.error("Error fetching top mix:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, dispatch]);

  const handleRedirect = (playlistId) => {
    navigate(`playlist/${playlistId}`);
  };

  const handleSeeAllClick = () => {
    setSeeAll(!seeAll);
  };

  return (
    <div className="w-[96%] mx-auto pt-4">
      <div className="flex justify-between w-full my-4">
        <h2 className="text-white font-semibold text-2xl">UNIQUELY YOURS</h2>
        <button onClick={handleSeeAllClick} className="text-white opacity-40">
          {seeAll ? "SHOW LESS" : "SEE ALL"}
        </button>
      </div>
      <div className="card-wrapper w-full flex gap-4 flex-wrap justify-center">
        {(
          topMix.length > 0 && (
            (seeAll ? topMix : topMix.slice(0, 4)).map((el, index) => (
              <div
                onClick={() => handleRedirect(el.id)}
                key={index}
                className="card w-[200px] cursor-pointer hover:shadow-2xl duration-300 bg-[#1b1b1b] p-5 rounded-md"
              >
                <img
                  src={el.images[0].url}
                  alt=""
                  className="w-full h-[55%] rounded-md object-cover"
                />
                <h2 className="name text-white text-xl mt-6 mb-2 truncate">
                  {el.name}
                </h2>
                <p className="description text-white text-sm opacity-40 truncate">
                  {el.description}
                </p>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default UniqualYours;
