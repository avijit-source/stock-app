import React from 'react'
import AutoComplete from '../components/AutoComplete'
import StockList from '../components/StockList'

const StockOverView = () => {
  return (
    <div className="container">
      <img src="https://i.kym-cdn.com/entries/icons/original/000/029/959/Screen_Shot_2019-06-05_at_1.26.32_PM.jpg" className="img-thumbnail rounded mx-auto d-block mt-4" alt="logo" style={{width:"300px",height:"130px"}} />
       <AutoComplete />
       <StockList />
    </div>
  )
}

export default StockOverView