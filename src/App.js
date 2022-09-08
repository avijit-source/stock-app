import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import StockOverView from './pages/StockOverView';
import StockDetails from './pages/StockDetails';
import {WatchListContextProvider} from "./context/watchListContext";

function App() {
  return (
    <div className="container">
      <WatchListContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StockOverView />} />
          <Route path="/detail/:symbol" element={<StockDetails />} />
        </Routes>
      </BrowserRouter>
      </WatchListContextProvider>
    </div>
  );
}

export default App;
