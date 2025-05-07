import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import NewCropCard from '../components/NewCropCard'
import TopCropCard from '../components/TopCropCard'
import RestCropCards from '../components/RestCropCards'
import '../util/config'
import getCropDetails from "../util/CropDetails";
import { FaInstagram, FaTwitter } from 'react-icons/fa'; 
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import url from '../url';
import homeBG from '../assets/home_BG.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();
  const [username, setUsername] = useState("");
  const [iid, setIid] = useState('');
  const { t } = useTranslation();
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        // navigate("/login");
      }
      const tok = cookies.token

      const { data } = await axios.post(
        `${url}`,
        {tok},
        { withCredentials: true }
      );
      const { status, user, id, language } = data;
      setUsername(user);
      setIid(id);
      window.config.id = id;
      window.config.name = user;
      Cookies.set('id', id);
      Cookies.set('language', language);
      Cookies.set('username', user);
      if (!status) {
        removeCookie("token");
        window.config.resetId();
        window.config.resetName();
        Cookies.remove('id');
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  useEffect(() => {
    if (window.config.id) {
      axios.post(`${url}/Cropfetch`, { id: window.config.id })
        .then(response => {
          const { Crop1, Crop2, Crop3, Crop4, Crop5 } = response.data;
          const cropNames = [Crop1, Crop2, Crop3, Crop4, Crop5];
          const cropDetailsArray = [];

          for (const cropName of cropNames) {
            const cropDetails = getCropDetails(cropName);
            cropDetailsArray.push(cropDetails);
          }

          setCrops(cropDetailsArray);
        })
        .catch(error => {
          console.error('Error fetching crops:', error);
        });
    }
  }, [window.config.id]);

  return (
    <>
      <div className="home_page" style={{ backgroundImage: `url(${homeBG})` }}>
        <div className="new_card">
          {crops.length > 0 && (
            <div className="crop-details-container">
              <NewCropCard crop={crops[0]} crops={crops} />
            </div>
          )}
        </div>
        
        <div className="card_container">
          {crops.length > 0 && (
            <div className="crop-details-container">
              <TopCropCard crop={crops[0]} />
              <RestCropCards crops={crops} />
            </div>
          )}
        </div>
      </div>
      
      <ToastContainer />
    </>
  );
};

export default Home;