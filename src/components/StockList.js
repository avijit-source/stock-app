import React, { useContext, useEffect, useState } from 'react'
import finnhub from "../apis/Finnhub";
import {AiFillCaretUp,AiFillCaretDown} from "react-icons/ai"
import { WatchListContext } from '../context/watchListContext';
import { useNavigate } from 'react-router-dom';


const StockList = () => {
    const [stock, setStock] = useState([]);
    const {watchList,deleteStock} = useContext(WatchListContext);
    const navigate = useNavigate()
    const changeColor = (change) => {
        return change > 0 ? "success" : "danger";
    }

    const renderIcon = (change) => {
        return change > 0 ? <AiFillCaretUp /> : <AiFillCaretDown />;
    }
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const responses = await Promise.all(watchList.map(stock => {
                    return finnhub.get("/quote", {
                        params: {
                            symbol: stock
                        }
                    })
                }))
                const data = responses.map(result => {
                    return {
                        data: result.data,
                        symbol: result.config.params.symbol
                    }
                })
                if (isMounted) {
                    setStock(data)
                }
            } catch (e) {
                console.log(e);
                localStorage.removeItem("watchList")
            }
        }
        fetchData();
        return () => {
            isMounted = false;
        }
    }, [watchList])

    const handleStockSelection = (symbol) =>{
        navigate(`detail/${symbol}`)
    }
    return (
        <div>
            <table className="table hover mt-5 text-center">
                <thead>
                    <tr className="table-dark">
                        <th scope='col'>Name</th>
                        <th scope='col'>Last</th>
                        <th scope='col'>Chg</th>
                        <th scope='col'>Chg%</th>
                        <th scope='col'>High</th>
                        <th scope='col'>Low</th>
                        <th scope='col'>Open</th>
                        <th scope='col'>Pclose</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stock.map((stockData) => (
                            <tr className="table-row table-light hovertable"
                            onClick={() =>handleStockSelection(stockData.symbol)}
                             key={stockData.symbol}>
                                <th scope="row">{stockData.symbol}</th>
                                <td>{stockData.data.c}</td>
                                <td className={`text-${changeColor(stockData.data.d)}`}>
                                    {stockData.data.d}
                                    {renderIcon(stockData.data.d)}
                                </td>
                                <td className={`text-${changeColor(stockData.data.dp)}`}>
                                    {stockData.data.dp}
                                    {renderIcon(stockData.data.dp)}
                                </td>
                                <td>{stockData.data.h}</td>
                                <td>{stockData.data.l}</td>
                                <td>{stockData.data.o}</td>
                                <td>{stockData.data.pc} 
                                <button onClick={(e)=>{
                                    deleteStock(stockData.symbol);
                                    e.stopPropagation();
                                }}
                                className='btn btn-danger btn-sm ml-3 d-inline-block delete-button'>
                                Remove</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default StockList