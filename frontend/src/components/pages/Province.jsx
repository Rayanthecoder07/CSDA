import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import IndicatorContext from "../../Data/IndicatorsData"


//display data by themes see miro
function Province() {
    const { geocode } = useParams()
    const { indicators ,data,themes} = useContext(IndicatorContext)
    const [provinceName, setProvinceName] = useState("")
    const [themeResult, setThemeResult] = useState([])


    const [loading, setLoading] = useState(true);
 
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [themeIndexes, setThemeIndexes] = useState([]) // Store original indexes

    const getProvinceNameGeoCode = (geo_code) => {
        switch (Number(geo_code)) {
            case 1:
                return'Newfoundland and Labrador';
                break;
            case 2:
                return'Prince Edward Island';
                break;
            case 3:
                return'Nova Scotia';
                break;
            case 4:
                return'New Brunswick';
                break;
            case 5:
                return'Quebec';
                break;
            case 6:
                return'Ontario';
                break;
            case 7:
                return'Manitoba';
                break;
            case 8:
                return'Saskatchewan';
                break;
            case 9:
                return'Alberta';
                break;
            case 10:
                return'British Columbia';
                break;
            case 11:
                return'Yukon';
                break;
            case 12:
                return'Northwest Territories';
                break;
            case 13:
                return'Nunavut';
                break;
            default:
                return'Unknown'; // Default case for unknown geo_codes
        }
    }

    const searchData = () => {
        const filteredThemes = themes.filter((theme, index) =>
            theme.label.toLowerCase().includes(search.toLowerCase())
        );
        setThemeResult(filteredThemes);

        // Store original indexes
        const indexes = filteredThemes.map((theme) => themes.indexOf(theme));
        setThemeIndexes(indexes);
    }

    useEffect(() => {
        setProvinceName(getProvinceNameGeoCode(geocode))
    }, [])
    
    useEffect(() => {
        searchData()
    }, [search]);



    return (
        <div className="w-full">
            <p className="text-3xl">{provinceName}</p>


            <div className="m-2 flex flex-row gap-2">
            <div className="form-control">
  <div className="input-group">
    <input type="text" placeholder="Search…" className="input input-bordered" onChange={(e) => setSearch(e.target.value)}/>
    <button className="btn btn-square" onClick={() =>  searchData()}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
  </div>
</div>
          
            </div>

        
      <div className="grid grid-cols-3 gap-4 p-2">
        {themeResult.map((theme,index) => (
          <div
            key={theme.id}
            onClick={() => navigate(`/${geocode}/${themeIndexes[index]}`)}
            className=" p-2 bg-base-200 rounded-lg text-white h-24 flex flex-col items-center justify-center cursor-pointer"
          >
            <p>{theme.label}</p>
          </div>
        ))}
      </div>

      {themeResult.length === 0 && (
        <p className="bg-base-300 rounded-md p-2">No results found</p>
      )}
    </div>
    );
    
}

export default Province
