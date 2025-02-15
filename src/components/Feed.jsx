import axios from "axios";
import { API_URL } from "../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice.js";
import { useEffect } from "react";
import UserData from "./UserData.jsx";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(API_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      if(err.response.status === 401){
        navigate("/login");
      }
     

    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;

  if (feed.length === 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return ( 
    feed && (
      <div className="flex justify-center my-10">
        <UserData user={feed[0]} />
      </div>
    )
  );
};
export default Feed;