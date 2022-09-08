import React, { useState } from 'react'
import Chart from "react-apexcharts";

function StockChart({ chartData, symbol }) {
    const timeFormatChange = () => {
        switch(dateFormat) {
            case "24h":
                return day
            case "7d":
                return week
            case "1y":
                return year
            default:
                return day
        }
    }
    const [dateFormat,setDateFormat] = useState("24h")
    const { day, week, year } = chartData;
    const color = timeFormatChange()[timeFormatChange().length-1].y-timeFormatChange()[0].y>0?"#00a8ff":"#eb4d4b"
    const options = {
        title: {
            text: symbol,
            align: 'center',
            style: {
                fontSize: "20px"
            }
        },
        colors: [color],
        stroke: {
            width: 3
        },
        chart: {
            id: "stock data",
            animations: {
                speed: 1300
            },
        },
        fill: {
            gradient: {
                enabled: true,
                opacityFrom: 0.55,
                opacityTo: 0
            }
        },
        markers: {
            size: 5,
            colors: [color],
            strokeColor: color,
            strokeWidth: 3
        },
        tooltip: {
            theme: "dark",
            x:{
                format:"MMM dd HH:MM"
            }
        },
        xaxis: {
            type: "datetime",
            labels:{
                dateTimeUTC:false
            }
        },

    }



    const series = [{
        name: symbol,
        data: timeFormatChange()
    }]

    const handleBtnSelection = (button) => {
          const classes ="btn m-1"
          if(button===dateFormat){
            return classes+" btn-danger"
          }else{
            return classes+" btn-outline-danger"
          }
    }
    return (
        <div className="container-fluid my-5 p-4 shadow-sm bg-white">
            <Chart options={options} series={series} type="area" width="100%" height="400px" />
            <div>
                <button className={handleBtnSelection("24h")} onClick={()=>setDateFormat("24h")}>24h</button>
                <button className={handleBtnSelection("7d")} onClick={()=>setDateFormat("7d")}>7d</button>
                <button className={handleBtnSelection("1y")} onClick={()=>setDateFormat("1y")}>1y</button>
            </div>
        </div>
    )
}

export default StockChart