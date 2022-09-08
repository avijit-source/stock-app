import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import finnhub from "../apis/Finnhub";
import StockChart from '../components/StockChart';
import StockData from '../components/StockData'



const formatData = (data) => {
  return data.t.map((el,i)=>{
    return {
      x:el*1000,
      y:data.c[i].toFixed(2)
    }
  })
}
const StockDetails = () => {
  const { symbol } = useParams();
  const [chartData,setChartData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currTimeInseconds = Math.floor(date.getTime() / 1000);
      let onedayAgo;
      const oneWeekAgo = currTimeInseconds - 7 * 60 * 60 * 24;
      const oneYearAgo = currTimeInseconds - 365 * 60 * 60 * 24;
      // const fiveYearAgo = currTimeInseconds-5*365*60*60*24;

      if (date.getDay() === 6) {
        onedayAgo = currTimeInseconds - 2 * 60 * 60 * 24;
      } else if (date.getDay() === 0) {
        onedayAgo = currTimeInseconds - 3 * 60 * 60 * 24;
      } else {
        onedayAgo = currTimeInseconds - 24 * 60 * 60;
      }
      try {
         let response = await Promise.all([finnhub.get("/stock/candle", {
          params: {
            symbol,
            from: onedayAgo,
            to: currTimeInseconds,
            resolution: 30
          }
        }),
        finnhub.get("/stock/candle", {
          params: {
            symbol,
            from: oneWeekAgo,
            to: currTimeInseconds,
            resolution: 60
          }
        }),
        finnhub.get("/stock/candle", {
          params: {
            symbol,
            from: oneYearAgo,
            to: currTimeInseconds,
            resolution: "W"
          }
        })]
        )

        setChartData({
          day:formatData(response[0].data),
          week:formatData(response[1].data),
          year:formatData(response[2].data),
        })
      } catch (err) {
        console.log(err);
      }
    }

      fetchData();
  }, [symbol])
  return (
    <div>
       {
        chartData && (
         <div>
          <StockChart chartData={chartData} symbol={symbol} />
          <div>
          <StockData symbol={symbol} />
          </div>
          </div>
        )
       }
    </div>
  )
}

export default StockDetails