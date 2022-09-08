import React, { useState,useEffect, useContext } from 'react'
import finnhub from "../apis/Finnhub";
import { WatchListContext } from '../context/watchListContext';


const AutoComplete = () => {
    const [search,setSearch] = useState("");
    const [results,setResults] = useState([]);
    
    const {addStock} = useContext(WatchListContext);

    const renderDropDown = () =>{
        const dropdownClass = results.length>0 ? "show" : null;
        return (
            <ul style={{
                height: "500px",
                overflowY:"scroll",
                overflowX:"hidden",
                cursor: "pointer",
            }}
             className={`dropdown-menu ${dropdownClass}`}>
                {results.map(r=>(
                    <li className="dropdown-item"
                     onClick={()=>{
                        addStock(r.symbol);
                        setSearch("");
                     }}
                     key={r.symbol}>
                       {r.description}({r.symbol})
                    </li>
                ))}
            </ul>

        )
    }
    useEffect(()=>{
        let timerId;
        const fetchData = async () =>{
            try {
              const response = await finnhub.get("/search",{
                params:{
                    q:search
                }
              })
              console.log("fetch called");
              setResults(response.data.result)
            }catch (e) {

            }
        }
        if(search.length>0){
            timerId = setTimeout(() =>{
                fetchData();
            },500)
        }else{
            setResults([]);
        }
        return () =>{
            clearTimeout(timerId);
        }
    },[search])
  return (
    <div className="w-50 p-5 rounded mx-auto">
        <div className="form-floating dropdown">
            <input type="text"
             style={{backgroundColor: 'rgba(145,158,171,0.04)'}}
             id="search" className="form-control"
             placeholder="Search"
             autoComplete='off'
             value={search}
             onChange={(e)=>setSearch(e.target.value)}
             />
             <label htmlFor="search">Search</label>
             {renderDropDown()}
        </div>
    </div>
  )
}

export default AutoComplete