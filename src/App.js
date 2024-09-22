import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/Store";
import Home from "./walmart/pages/Home";
import ProductDetails from "./walmart/pages/productDetails/ProductDetails";
import Checkout from "./walmart/pages/checkout/Checkout";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route element={<Home />} />
          </Route>
          <Route path='/:cate_name/:goods_id' element={<ProductDetails />} />
          <Route path='checkout' element={<Checkout />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
