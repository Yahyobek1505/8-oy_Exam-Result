import { IoPlaySharp } from "react-icons/io5";
import { IoPause } from "react-icons/io5";
import { GrInstallOption } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { useEffect } from "react";
import Back from "../assets/Back.png";
import Next from "../assets/Next.png";
import Ellips from "../assets/Ellipse.png";
import Union from "../assets/Union.svg";
import { useParams } from "react-router-dom";
import { getToken } from "../components/utils";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../redux/authSlice";
import { useState } from "react";

const Musics = () => {
  const { id } = useParams();
  const [played, setPlayed] = useState(false);
  const [topMix, setTopMix] = useState([]);
  const [track, setTraack] = useState([]);
  const dispatcn = useDispatch();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (token) {
      fetch(`${import.meta.env.VITE_API_TOP_MIX}playlists/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTopMix(data);
          setTraack(data.tracks.items);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getToken()
        .then((res) => {
          dispatcn(create(res));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);
  return (
    <div className="w-full bg-[#121212]">
      <div className="top-home w-full py-4 bg-[#b4c721]">
        <div className="div mx-auto flex gap-2 w-[94%] ">
          <img src={Back} alt="" className="cursor-pointer" />
          <img src={Next} alt="" className="cursor-pointer" />
        </div>
      </div>
      <div className="infoMusic w-full ">
        <div className="imgInfo w-[94%] mx-auto py-5 flex items-center gap-4">
          <div>
            {topMix.images && topMix.images.length > 0 && (
              <img
                className="rounded-lg h-[200px] object-cover"
                src={topMix.images[0].url}
                alt="Playlist Cover"
              />
            )}
          </div>
          <div className="infoName">
            <p className="text-white">PUBLIC PLAYLIST</p>
            {topMix.name && topMix.name.length > 0 && (
              <h1 className="font-bold text-4xl text-white my-8">
                {topMix.name}
              </h1>
            )}
            <p className="text-white opacity-40">
              Julia Wolf, ayokay, Khalid and more
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-white opacity-40">Made for </span>
              <span className="text-white font-semibold">davedirect3</span>
              <img src={Ellips} alt="" />{" "}
              <span className="text-white opacity-40 ">
                34 songs, 2hr 01 min
              </span>
            </div>
          </div>
        </div>
        <div className="musicAlbum bg-[#121212] w-full min-h-[100vh]">
          <div className="albumContainer w-[94%] mx-auto flex items-center pt-4 justify-between">
            <div className="customOrder flex items-center   gap-6">
              <div className="bg-[#65d36e] rounded-full text-center py-3 px-3">
                {played ? (
                  <IoPause />
                ) : (
                  <IoPlaySharp className="text-2xl  cursor-pointer" />
                )}
              </div>
              <CiHeart className="text-white text-4xl cursor-pointer" />
              <GrInstallOption className="text-white text-3xl cursor-pointer" />
              <div className="ellips flex items-center gap-1 cursor-pointer">
                <img src={Ellips} alt="" />
                <img src={Ellips} alt="" />
                <img src={Ellips} alt="" />
              </div>
            </div>
            <div className="search flex items-center gap-4">
              <IoSearch className="text-white text-2xl cursor-pointer" />
              <form>
                <select className="bg-transparent text-white outline-none">
                  <option value="Custom_order">Custom order</option>
                </select>
              </form>
            </div>
          </div>
          <div className="track-table max-w-[98%] mx-auto mt-8">
            <div className="truck-thead flex justify-around text-white opacity-40">
              <div className="flex gap-4 ">
                <p>#</p>
                <p>TITLE</p>
              </div>
              <div></div>
              <div></div>
              <div>
                <p>ALBUM</p>
              </div>
              <div className="flex gap-2">
                <p>DATA</p> <p>ADDED</p>
              </div>
              <div>
                <img src={Union} alt="" />
              </div>
            </div>
            {track.length > 0 &&
              track.slice(0, 50).map((el, index) => {
                return (
                  <div
                    key={index}
                    className="table-data cursor-pointer max-w-[94%] px-4 py-2 rounded-md mx-auto flex items-center justify-between gap-10 hover:bg-slate-800 mt-4 bg-gray-900">
                    <div className="img-name flex items-center gap-4">
                      <p className="text-white">{index + 1}</p>
                      <img
                        className="rounded-md"
                        src={el.track.album.images[2].url}
                        alt=""
                      />
                      <div className="flex flex-col">
                        <h3 className="text-white w-[200px] font-semibold">
                          {el.track.name}
                        </h3>
                        <h4 className="text-white opacity-30 text-sm">
                          {el.track.artists[0].name}
                        </h4>
                      </div>
                    </div>
                    <div className="album">
                      <h3 className="text-white opacity-30">{el.track.name}</h3>
                    </div>
                    <div className="album">
                      <h3></h3>
                    </div>
                    <div className="flex gap-4 ">
                      <CiHeart  className="text-white text-xl cursor-pointer" />
                      <p className="text-white font-semibold">
                        {Math.floor(el.track.duration_ms / 60 / 1000)}:
                        {Math.floor(el.track.duration_ms / 60 / 100)}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Musics;
