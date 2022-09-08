import React, { useEffect, useState } from 'react'
import finnhub from "../apis/Finnhub";

function StockData({ symbol }) {
    const [stockData, setStockData] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await finnhub.get("/stock/profile2", {
                    params: {
                        symbol
                    }
                })
                setStockData(response.data)
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();

    }, [symbol])
    return (
        <div>
            {stockData && (
                <div className="row border bg-white rounded shadow-sm p-4 my-5">
                    <div className="col">
                        <div><span className="fw-bold">name:</span>{stockData.name}</div>
                        <div><img src={stockData.logo} className="img-fluid" alt="Responsive image" /></div>
                        <div><span className="fw-bold">country:</span>{stockData.country}</div>
                        <div><span className="fw-bold">ticker:</span>{stockData.ticker}</div>

                    </div>
                    <div className="col">
                        <div><span className="fw-bold">exchange:</span>{stockData.exchange}</div>
                        <div><span className="fw-bold">Industsry:</span>{stockData.finnhubIndustry}</div>
                        <div><span className="fw-bold">IPO:</span>{stockData.ipo}</div>
                    </div>
                    <div className="col">
                        <div><span className="fw-bold">MarketCap:</span>{stockData.marketCapitalization}</div>
                        <div><span className="fw-bold">Shares Outstanding:</span>{stockData.shareOutstanding}</div>
                        <div><span className="fw-bold">url:</span><a href={stockData.weburl}>website url</a></div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default StockData