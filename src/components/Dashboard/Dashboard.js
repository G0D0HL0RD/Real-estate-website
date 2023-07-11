import React, { useContext, useState, useEffect } from 'react'
import buildingData from '../../assets/dummyData//buildingData';

import './dashboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import DeleteIcon from '@mui/icons-material/Delete';

import CustomCarousel from '../Carousel/CustomCarousel';
import axios from 'axios';
import Gallery from '../../containers/buying/gallery/Gallery';
import data from '../../assets/dummyData/data';
import { SignInContext } from '../../context/SignInContext';
import { TokenContext } from "../../context/TokenContext";


const Dashboard = () => {
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(SignInContext);
  const [Bookmarks, setBookmarks] = useState([])

  console.log("🚀 ~ file: Dashboard.js:25 ~ Dashboard ~ Bookmarks:", Bookmarks);


  useEffect(() => {

    const getUserBookmarks = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.get(
          `/api/user/bookmarks`,
          config
        );
        console.log(data);
        setBookmarks(data)



      } catch (error) {
        console.log(error)
      }
    }

    getUserBookmarks();
  }, [])



  console.log("🚀 ~ file: Dashboard.js:21 ~ Dashboard ~ user:", user);


  const [openBackdrop, setOpenBackdrop] = useState(true);
  const handleClose = () => {
    setOpenBackdrop(false);
  };
  const handleOpen = () => {
    setOpenBackdrop(true);
  };

  // ** Fetching data
  const [Data, setData] = useState([]);
  const [WasDeleted, setWasDeleted] = useState(false);
  const [WasUpdated, setWasUpdated] = useState(false);

  console.log("🚀 ~ file: Dashboard.js:35 ~ Dashboard ~ WasDeleted:", WasDeleted);

  const handleWasDeleted = () => {
    setWasDeleted(true);
  }

  const handleWasUpdated = () => {
    setWasUpdated(true);
  }

  const fetchData = () => {
    axios
      .get("/api/property/getAll")
      .then((response) => {
        const fetchedData = response.data;
        const filteredData = fetchedData.filter((item) => item.currentOwner._id === user._id);
        setData(filteredData);
        // setData(fetchedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
    if (WasDeleted) {
      console.log("Refetching as property deleted")
      setWasDeleted(false);
    }
    if (WasUpdated) {
      console.log("Refetching as property updated")
      setWasUpdated(false);
    }
  }, [WasDeleted, WasUpdated]);

  console.log("🚀 ~ file: Dashboard.js:30 ~ Dashboard ~ Data:", Data);

  //TODO change to props
  const keyword = "";
  const filteredBuildingData = buildingData.filter((item) => item.address.toLowerCase().includes(keyword.toLowerCase())
  );
  const [active, setActive] = useState(0);
  const handleClick = (e) => {
    setActive(e);
  }
  return (
    <section className='dashboard-container'>

      <div className='dashboard'>
        <div className='dash-header'>
          <h1>DashBoard</h1>
        </div>

        <hr class="dashed-line"></hr>

        <div className='dash-body'>
          <div className='dash-gallery'>
            <h1>
              Property To Sell
            </h1>
            <Gallery
              keyword={""}
              data={Data}
              map={false}
              onClick={handleOpen}
              delete={true}
              update={true}
              wasDeleted={handleWasDeleted}
              wasUpdated={handleWasUpdated}

            />
          </div>
          <div className='dash-bookmarks'>
            <h1>
              Bookmarks
            </h1>
            <Gallery
              keyword={""}
              data={Bookmarks}
              map={false}
              onClick={handleOpen}
              delete={true}
              update={true}
              wasDeleted={handleWasDeleted}
              wasUpdated={handleWasUpdated}

            />
          </div>
          {/* <div className='dash-buttons'>
            <button className={active == 1 ? "bookmark-button-click" : "bookmark-button"} onClick={() => { handleClick(1) }}>
              Bookmarked
              <span className='dash-icon'><FontAwesomeIcon icon={faBookmark} /></span></button>

            <button className={active == 2 ? "bookmark-button-click" : "bookmark-button"} onClick={() => { handleClick(2) }}>
              Recently Viewed
              <span className='dash-icon'><FontAwesomeIcon icon={faClock} /></span></button>

            <button className={active == 3 ? "bookmark-button-click" : "bookmark-button"} onClick={() => { handleClick(3) }}>
              Selling
              <span className='dash-icon'><FontAwesomeIcon icon={faSackDollar} /></span></button>
          </div> */}

          <div className='dash-carousel'>
            <CustomCarousel forMap={false} />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Dashboard
