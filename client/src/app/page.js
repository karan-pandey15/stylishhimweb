  
import Banner1 from "./components/homepage/page";
import Footer from "./components/footer/page"; 
import Navbar from "./components/navbar/page";    
import ThirdBanner from "./components/banner3/page";
import SecondBanner from "./components/banner2/page" 
import  FourthBanner from "./components/banner4/page"
import FifthBanner from "./components/banner5/page"
import SixthBanner from "./components/banner6/page"
import SeventhBanner from "./components/banner7/page"
import EightBanner from "./components/banner8/page"
import Testimonial from "./components/banner9/page"
import NewsBlogpage from "./components/banner10/page"

import './styles/globals.css';
export default function Home() {
  return (
    <main>   
      <div>
        <Navbar />
      </div> 
      <div>
      <Banner1 /> 
      </div>  
      
    <SecondBanner />
      <div>
        <ThirdBanner />
      </div>
      <FourthBanner />
      <FifthBanner />

      <SixthBanner />
      <SeventhBanner />

      <EightBanner />

      <Testimonial />
      <NewsBlogpage />
      <div>
        <Footer />
      </div>
    </main> 
  );
}
