import { useEffect, useState } from "react"
import axios from "axios"

function ExchangeRate(){
    const [exchangeRate, setExchangeRate] = useState(null)
    const [rates, setRates] = useState([])
    const [date, setDate] = useState("")
    const [availableCurrencies, setAvailableCurrencies] = useState([])
    const [currCurrency, setCurrCurrency]  = useState("USD")
    const [value, setValue] = useState({ 
        startDate: null ,
        endDate: null 
        }); 
        
        const handleValueChange = (newValue) => {
        console.log("newValue:", newValue); 
        setValue(newValue); 
        } 
    useEffect(() => {
        axios.get(`https://www.bankofcanada.ca/valet/observations/FXCADUSD/json`).then((res) => {
            setExchangeRate(res.data.observations[res.data.observations.length - 1])
            setRates(res.data.observations)
        }).catch((error) => console.log(error))
        if(availableCurrencies.length == 0){
            axios.get(`https://www.bankofcanada.ca/valet/groups/FX_RATES_DAILY`)
            .then((res) => {
              const currencies = res.data.groupDetails.groupSeries;
          
              if (typeof currencies === 'object' && currencies !== null) {
                const newCurrencies = Object.keys(currencies).map((currencyKey) => {
                    const currency = currencies[currencyKey];
                    return currency.label.substr(0, 3);
                  });
          
                  setAvailableCurrencies((prevCurrencies) => [
                    ...new Set([...prevCurrencies, ...newCurrencies]), // Use Set to remove duplicates
                  ]);
              } else {
                console.error("Currencies is not an object:", currencies);
                // Handle the error or provide a default value as needed
              }
            })
            .catch((error) => {
              console.error("An error occurred:", error);
              // Handle the error here
            });
        }

      
        axios.get(`https://www.bankofcanada.ca/valet/lists/groups`).then((res) => {
            console.log(res.data)
        }).catch((error) => console.log(error))

    }, [])

    console.log(availableCurrencies)

    const getExchangeRate = (currency) => {
        setExchangeRate(null)
        console.log(currency)
        axios.get(`https://www.bankofcanada.ca/valet/observations/FXCAD${currency}/json`).then((res) => {
            console.log(res.data)
            setExchangeRate(res.data.observations[res.data.observations.length - 1])
            setRates(res.data.observations)
        }).catch((error) => console.log(error))
    }
    
    


    const availableDate = () => {
        let dateObj = new Date();
        dateObj.setDate(dateObj.getDate() - 1); // Subtract 1 day
    
        let month = dateObj.getUTCMonth() + 1; // Months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
    
        let newdate = year + "/" + month + "/" + day;
        return newdate;
    }

    console.log(date)
    return(
        <div className="flex flex-col gap-2 p-2 rounded-md m-2" style={{backgroundColor:"#D80621"}}>
        <div className="flex flex-row">
        <p className="text-4xl font-bold" >CAD -{">"} </p>
        <select value={currCurrency} onChange={(e) => {
            setCurrCurrency(e.target.value)
            getExchangeRate(e.target.value)
            }} >
                {availableCurrencies.map((currency) => {
                    return <option>{currency}</option>
                })}
            </select>
            </div>
        <p>data since 2017-01-03</p>
            <p>up to date till {availableDate()}</p>
        <input type="date"  onChange={(e) => {
            setDate(e.target.value)
            let date = e.target.value
            const rate = rates.filter((item) => item.d == date)
          
         setExchangeRate(rate[0])
        }}/>
        {exchangeRate != null && (
            <div>
       
            <p className="text-2xl">{exchangeRate[`FXCAD${currCurrency}`]?.v} {currCurrency}</p> 
           
            </div>
        )}
       
        </div>
    )
}

export default ExchangeRate