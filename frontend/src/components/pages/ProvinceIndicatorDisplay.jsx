import { useContext, useState ,useEffect, useRef} from "react"
import IndicatorContext from "../../Data/IndicatorsData"
import { useParams } from "react-router-dom"
import { useScreenshot } from 'use-react-screenshot';
import html2canvas from 'html2canvas';
import {BarChart, Bar,XAxis,YAxis, Tooltip,Legend,CartesianGrid,ResponsiveContainer ,PieChart,Pie,LineChart,Line} from "recharts"

const CHART_TYPES = {
    BAR:"bar",
    PIE:"pie",
    LINE:"line"
  };
  
function ProvinceIndicatorDisplay(){
    const screenRef = useRef(null);


    const {geocode,theme_index} = useParams()
    const {specificThemeIndicator, setSpecificThemeIndicator} = useContext(IndicatorContext)
    const { indicators ,data,themes} = useContext(IndicatorContext)
    const theme = themes[theme_index]
    const [compareProvinces, setCompareProvinces] = useState([])
    const [chartType, setChartType] = useState(CHART_TYPES.BAR)
    const [relatedData, setRelatedData] = useState([])
    console.log(relatedData)
    useEffect(() => {
        const flatFilteredIndicators = indicators
        .flat() // Flatten the nested arrays
        .filter(item => item.title.en ==  specificThemeIndicator.title.en); // with geo code filter so no ranking yet :(
        
        setRelatedData(flatFilteredIndicators)
setCompareProvinces(
  flatFilteredIndicators.map((indicator) => {
    console.log(indicator)
    const value = parseFloat(indicator.value.en.replace('$', '').replace(/,/g, ''));
    const words = indicator.value.en.split(' ');
    const isMoney = indicator.value.en.includes("$");
    const isPercentage = indicator.value.en.includes("%");
    const unit = words[words.length - 1];
    let category = "";
    if(isMoney){
        category  = `${unit}$`
    }

    if(!isMoney){
        category = ''
    }

    if(isPercentage){
        category = '%'
    }
    
    const provinceName = getProvinceNameGeoCode(indicator.geo_code)
    const shortenName = getProvinceCode(provinceName)

    console.log(`Indicator: ${indicator.name}, Value: ${value}, Category: ${category}`);
    return { short_name: shortenName, value: value, category:category, name:getProvinceNameGeoCode(indicator.geo_code)};
  })
);
      }, [])

      console.log(compareProvinces)

      const getProvinceCode = (provinceName) => {
        switch (provinceName.toLowerCase()) {
            case 'canada':
                return 'CA';
            case 'newfoundland and labrador':
                return 'NL';
            case 'prince edward island':
                return 'PE';
            case 'nova scotia':
                return 'NS';
            case 'new brunswick':
                return 'NB';
            case 'quebec':
                return 'QC';
            case 'ontario':
                return 'ON';
            case 'manitoba':
                return 'MB';
            case 'saskatchewan':
                return 'SK';
            case 'alberta':
                return 'AB';
            case 'british columbia':
                return 'BC';
            case 'yukon':
                return 'YT';
            case 'northwest territories':
                return 'NT';
            case 'nunavut':
                return 'NU';
            default:
                return 'UNK'; // Default case for unknown province names
        }
    }
  
    console.log(specificThemeIndicator)
    const getProvinceNameGeoCode = (geo_code) => {
        switch (Number(geo_code)) {
            case 0:
                return "Canada"
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
    const captureScreen = async () => {
        try {
          const screenshot = await html2canvas(screenRef.current);
          const link = document.createElement('a');
          link.href = screenshot.toDataURL('image/png');
          link.download = `${specificThemeIndicator.title.en.toLowerCase()}.png`;
          link.click();
        } catch (error) {
          console.error('Error capturing the screenshot:', error);
        }
      };
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
          const data = payload[0].payload; // Access the data associated with the hovered bar
          const name = data.name; // Access the "name" dataKey value

          return (
            <div className="custom-tooltip bg-base-200  rounded-md p-2">
              <p>Name: {name}</p>
              <p>Value: {data.value} {data.category} </p>
            </div>
          );
        }
      
        return null;
      };
      
      function cleanAndConvertToFloat(value) {
        // Remove non-numeric characters except for '.' (decimal point)
        const cleanedValue = value.replace(/[^0-9.]/g, '');
      
        // Convert the cleaned value to a float
        return parseFloat(cleanedValue);
      }
      

    return(
        <div >
            <p className="text-2xl ">{specificThemeIndicator.title.en} ({getProvinceNameGeoCode(geocode)})</p>
            <p>publication date: {specificThemeIndicator.refper.en}</p>
            <p>value: {specificThemeIndicator.value.en}</p>
            <p>source: <a href={`https://www150.statcan.gc.ca/n1/${specificThemeIndicator.daily_url.en}`} target="_blank">{specificThemeIndicator.daily_title.en}</a> </p>
            <button onClick={() => captureScreen()}>Capture and Download</button>
<div className="p-2">
<p className="text-xl">Province Comparasion</p>
<div className="dropdown dropdown-bottom">
  <label tabIndex={0} className="btn m-1">CHART TYPE</label>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
  {Object.values(CHART_TYPES).map((chartTypeM, index) => (
        <li key={index} className={chartTypeM == chartType ? "  shadow bg-base-200 rounded-box  " :""} onClick={() => setChartType(chartTypeM)}>
          <a>{chartTypeM}</a>
        </li>
      ))}
  </ul>
</div>
{compareProvinces.length > 0 && (
    <div className="flex flex-row gap-2 w-full">
    <div ref={screenRef} style={{width:1200}} className="bg-base-200 rounded-md p-2 flex flex-col items-center justify-center">
{chartType == CHART_TYPES.BAR && (
    <BarChart
    style={{margin:20}}
  width={1200}
  height={500}
  data={compareProvinces}
  margin={{
    top: 5,
    right: 30,
    left: 20,
    bottom: 5,

  }}
  barSize={45}
>
  <XAxis dataKey="short_name" scale="point"  padding={{ left: 20, right: 20 }}  />
  <YAxis    tickFormatter={(value) => {
    const province = compareProvinces[0]
    return `${value} ${province.category}`
  }}/> {/* Format as currency */}
  <Tooltip content={<CustomTooltip/>}/>
  <Legend />
  <CartesianGrid strokeDasharray="3 3" />
  <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
</BarChart>
)}

{chartType == CHART_TYPES.PIE && (
    <PieChart width={730} height={250}>
  <Pie data={compareProvinces} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
  <Pie data={compareProvinces} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
</PieChart>
)}


{chartType == CHART_TYPES.LINE && (
    <LineChart  width={1200}
  height={500} data={compareProvinces}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis  tickFormatter={(value) => {
    const province = compareProvinces[0]
    return `${value} ${province.category}`
  }}/>
  <Tooltip content={<CustomTooltip/>}/>
  <Legend />
  <Line type="monotone" dataKey="value" stroke="#8884d8" />
  <Line type="monotone" dataKey="value" stroke="#82ca9d" />
</LineChart>
)}



</div>
<div className="bg-base-200 rounded-md p-2">
<div className="overflow-x-auto">
<p className="text-2xl">Table  </p>
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Province</th>
        <th>Value</th>

      </tr>
    </thead>
    <tbody className="">
      {/* row 1 */}
      {relatedData.sort((a, b) => {
  const valueA = cleanAndConvertToFloat(a.value.en);
  const valueB = cleanAndConvertToFloat(b.value.en);

  // Compare as floats
  return valueB - valueA;
}).filter((item) => item.geo_code != "0")
.map((indicator, index) => {
  const indicatorGeoCode = Number(indicator.geo_code); // Convert to number
    console.log(typeof indicator.geo_code)
    console.log(typeof geocode)
  return (
    <tr key={index} className={Number(geocode) === indicatorGeoCode ? "bg-canada rounded-md" : "rounded-md"}>
      <th>{index + 1}</th>
      <td>{getProvinceNameGeoCode(indicatorGeoCode)}</td>
      <td>{indicator.value.en}</td>
    </tr>
  );
})}
     
    </tbody>
  </table>
</div>
</div>
</div>
)}
</div>

    
            
        </div>
    )
}

export default ProvinceIndicatorDisplay