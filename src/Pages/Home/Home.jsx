import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Featured from "../Product/Featured/Featured";
import TrandingProduct from "../Product/TrandingProduct/TrandingProduct";



const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Tech Verse | Home</title>
      </Helmet>
      <Banner></Banner>
      <Featured></Featured>
      <TrandingProduct></TrandingProduct>
      
      

    </div>
  );
};

export default Home;