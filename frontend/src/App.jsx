import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import axios from 'axios';
import './App.css';
import { countryToAlpha2, countryToAlpha3 } from "country-to-iso";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ProvincesDisplay from './components/pages/ProvincesDisplay';
import Province from './components/pages/Province';
import Navbar from './components/Navbar';
import { IndicatorProvider } from './Data/IndicatorsData';
import ProvinceTheme from './components/pages/ProvinceTheme';
import ProvinceIndicatorDisplay from './components/pages/ProvinceIndicatorDisplay';
import About from './components/pages/presentation/About';
//display data by themes see miro
function App() {
  //display data by themes see miro
  const [data, setData] = useState([]);
  const [provinces, setProvinces] = useState([]);
  function getFlagUrl(provinceCode) {
    switch (provinceCode) {
      case '1':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Newfoundland_and_Labrador.svg/510px-Flag_of_Newfoundland_and_Labrador.svg.png';
      case '2':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Flag_of_Prince_Edward_Island.svg/510px-Flag_of_Prince_Edward_Island.svg.png';
      case '3':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Nova_Scotia.svg/510px-Flag_of_Nova_Scotia.svg.png';
      case '4':
        return `https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Flag_of_New_Brunswick.svg/510px-Flag_of_New_Brunswick.svg.png`
      case '5':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Flag_of_Quebec.svg/510px-Flag_of_Quebec.svg.png'
      case '6':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Ontario.svg/510px-Flag_of_Ontario.svg.png'
      case '7':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Flag_of_Manitoba.svg/510px-Flag_of_Manitoba.svg.png'
      case '8':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Flag_of_Saskatchewan.svg/510px-Flag_of_Saskatchewan.svg.png'
      case '9':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Flag_of_Alberta.svg/510px-Flag_of_Alberta.svg.png'
      case '10':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Flag_of_British_Columbia.svg/510px-Flag_of_British_Columbia.svg.png'
      case '11':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Flag_of_Yukon.svg/510px-Flag_of_Yukon.svg.png'
      case '12':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Flag_of_the_Northwest_Territories.svg/510px-Flag_of_the_Northwest_Territories.svg.png'
      case '13':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Flag_of_Nunavut.svg/510px-Flag_of_Nunavut.svg.png'
      default:
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/510px-Flag_of_Canada_%28Pantone%29.svg.png';
    }
  }
  useEffect(() => {
    // Check if data has already been fetched
    if (data.length === 0) {
      axios.get(`https://www150.statcan.gc.ca/n1/dai-quo/ssi/homepage/ind-all.json`)
        .then((result) => {
          const data = result.data;
          console.log(data)
          const geo = data.results.geo;

          // Create a new array with the first element removed and add the flagUrl property
          const provinces = geo.slice(1).map((province) => ({
            ...province,
            flagUrl: getFlagUrl(province.geo_code)
          }));
          setProvinces(provinces);
          console.log(provinces)
        })
        .catch((error) => console.log(error));

      
    }
  }, [data]); // Only fetch data if data.length is 0

  return (
<BrowserRouter className="w-full">
<IndicatorProvider>
  <div className='w-full min-h-screen'>
    <Navbar />
    <div className='content  bg-gradient-to-bl from-canada to-black min-h-screen'>
      <Routes>
        <Route element={<ProvincesDisplay />} path='/' />
        <Route element={<Province />} path='/:geocode' />
        <Route element={<ProvinceTheme/>} path='/:geocode/:theme_index'/>
        <Route element={<ProvinceIndicatorDisplay/>} path='/:geocode/:theme_index/:indicator_index'/>
        <Route element={<About/>} path='/about'/>
      </Routes>
    </div>
  </div>
  </IndicatorProvider>
</BrowserRouter>

  );
}

export default App;
