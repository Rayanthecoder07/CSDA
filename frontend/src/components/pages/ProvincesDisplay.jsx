import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import IndicatorContext from "../../Data/IndicatorsData";
import ExchangeRate from "../ExchangeRate";
//display data by themes see miro
function ProvincesDisplay(){
    const {data} = useContext(IndicatorContext)

    const {setIndicators} = useContext(IndicatorContext)
    const {provinces} = useContext(IndicatorContext)
    const navigate = useNavigate()
 const specificProvince = (geocode) => {
        navigate(`/${geocode}`)
    }
    return (
        <div className='w-full h-full  '>
        
          <div className='flex flex-row flex-wrap'>

      {provinces.map((province) => {
        console.log(province)
        // Render your province data here
        return (
          <div className="card card-compact w-96 bg-base-100 shadow-xl mx-4 my-4 relative" key={province.geo_code}>
          { (Number(province.geo_code) === 11 || Number(province.geo_code) === 12 || Number(province.geo_code) === 13) && (
    <div className="bg-orange-400  text-xs uppercase font-bold rounded-full p-2 absolute top-0 ml-2 mt-2" >
     <span>less data</span>
    </div>
)}

            <figure>
              {province.flagUrl && <img src={province.flagUrl} alt={`${province.label.en} Flag`} />}
            </figure>
            <div className="card-body">
              <h2 className="card-title">{province.label.en}</h2>
              <p>Howdy a province</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={() => specificProvince(province.geo_code)}>Check Data</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    
        </div>
      );
}

export default ProvincesDisplay