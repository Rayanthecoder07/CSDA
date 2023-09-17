import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import IndicatorContext from "../../Data/IndicatorsData"

function ProvinceTheme() {
    const { theme_index, geocode } = useParams()
    const { themes, indicators } = useContext(IndicatorContext)
    const theme = themes[theme_index]
    const navigate = useNavigate()
    const {specificThemeIndicator, setSpecificThemeIndicator} = useContext(IndicatorContext)
    const [filteredIndicators, setFilteredIndicators] = useState([]); // State to store the filtered indicators
    console.log(filteredIndicators)
    useEffect(() => {
        // Flatten the nested arrays and filter the indicators
        const flatFilteredIndicators = indicators
            .flat() // Flatten the nested arrays
            .filter(item => item.themes.includes(theme.theme_id) && item.geo_code === Number(geocode)); // with geo code filter so no ranking yet :(

        setFilteredIndicators(flatFilteredIndicators); // Update the state with filtered indicators
        console.log(flatFilteredIndicators);
    }, [theme.theme_id, geocode, indicators]);

    console.log(filteredIndicators)

    return (
        <div className="h-full w-full">
          <p className="text-2xl">{theme.label}</p>
          {filteredIndicators.length > 0 && (
            <p>results found {filteredIndicators.length}</p>
          )}
          {filteredIndicators.length == 0 && (
              <div className="flex flex-col items-center justify-center h-screen">
              <p className="text-2xl ">results found (0)</p>
              </div>
              
            )}
          <div className="grid grid-cols-3 gap-4 m-2">
            {/* Adjust the number of columns (grid-cols-X) as needed */}
            {filteredIndicators.map((indicator, index) => (
              <div key={index} className="border p-4 shadow flex flew-row gap-2 justify-between rounded-md">
              <div>
                <div className="text-lg font-semibold">{indicator.title.en}</div>
                <div className="text-xl font-bold">{indicator.value.en}</div>
                
                {indicator.growth_rate && indicator.growth_rate.growth.en !== undefined ? (
                  <div className="text-sm text-gray-500 ">
                  
                    {Number(indicator.growth_rate.growth.en) < 0 ? "↘︎" : "↗︎"}{" "}
                    {indicator.growth_rate.growth.en}
                    <p>{indicator.growth_rate.details.en}</p>
                  


                  </div>
                ) : null}
                </div>

                <button className="btn btn-circle btn-outline" onClick={() => {
                  setSpecificThemeIndicator(indicator)
                  navigate(`/${geocode}/${theme_index}/${index}`)
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" fill-rule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></svg>
                </button>
                
              </div>
            ))}
          
          </div>
        </div>
      );
}

export default ProvinceTheme
