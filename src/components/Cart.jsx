import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCartAction,
  getCartDataAction,
  editCartDataAction,
} from "../redux/actions/cartActions";
import Cards from "../reusableComponents/Cards";
import MainHeader from "../reusableComponents/headers/mainHeader";
import History from "../reusableContents/history";

const Cart = () => {
  const cartData = useSelector((state) => state.cartData);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [path, setPath] = useState("/");
  const [changePath, setChangePath] = useState(false);
  const [noRec, setRec] = useState(false);
  let userData;
  let NoRec = "";

  useEffect(() => {
    dispatch(getCartDataAction());
  }, [dispatch]);

  const handleIncrement = (e, data) => {
    data = {
      ...data,
      count: data.count + 1,
      price: (data.count + 1) * data.actualPrice,
    };
    dispatch(editCartDataAction(data));
    setCount(data.count);
  };

  const handleDecrement = (e, data) => {
    if (data.count > 1) {
      data = {
        ...data,
        count: data.count - 1,
        price: data.price - data.actualPrice,
      };
      console.log(`decr data`, data);
      dispatch(editCartDataAction(data));
    }
    setCount(data.count);
  };

  const handleClick = () => {
    if (localStorage.getItem("user-info")) {
      userData = JSON.parse(localStorage.getItem("user-info"));
      alert("Purchase successfully done. Enjoy your day.");

      setPath(userData.role + "/dashboard");
    } else {
      setPath("/login");
    }
    setChangePath(true);
  };

  const handleRemoveCart = (id) => {
    dispatch(removeFromCartAction(id));
  };

  return (
    <>
      <MainHeader />
      <div className="col-12 row mt-3">
        <div
          className="col-8 ml-2"
          style={{ borderRight: ".05px solid #cccccc" }}
        >
          <h5>Cart List</h5>
          <div className="row mr-1">
            {!cartData && setRec(true)}
            {cartData &&
              cartData.map((val, ind) => {
                return (
                  <>
                    <div className="pt-3">
                      <Cards
                        component="cart"
                        header={val.header}
                        image={val.image}
                        content={val.content}
                        price={val.price}
                        actualPrice={val.actualPrice}
                        id={val.id}
                        count={val.count}
                        handleIncrement={handleIncrement}
                        handleDecrement={handleDecrement}
                        handleRemoveCart={handleRemoveCart}
                        user={val.user}
                      />
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <div className="col-3 sticky-top">
          <div className="card mt-4">
            <div className="card-header text-muted">
              <h5>PRICE DETAILS</h5>
            </div>
            <div className="card-body">
              <div className="col-6">
                Total (
                {cartData != undefined
                  ? cartData.length <= 1
                    ? cartData.length + " item"
                    : cartData.length + " items"
                  : ""}
                ):{" "}
                <span className="float-right">
                  $
                  {cartData != undefined
                    ? cartData.reduce(
                        (prev, current) => prev + current.price,
                        0
                      )
                    : ""}
                </span>
              </div>
              <hr />
              <button className="btn btn-success" onClick={() => handleClick()}>
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>
        {changePath && <History path={path} />}
      </div>
    </>
  );
};

export default Cart;
