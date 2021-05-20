import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCartAction,
  removeFromCartAction,
  getCartDataAction,
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
      count: count + 1,
      price: (count + 1) * data.price,
    };
    setCount(data.count);
  };

  const handleDecrement = (e, data) => {
    if (data.count > 1) {
      data = {
        ...data,
        count: data.count - 1,
        price: (data.count - 1) / data.price,
      };
      data.price /= data.count;
      data.count = data.count - 1;
    }
    setCount(data.count);
  };

  const handleClick = () => {
    if (localStorage.getItem("user-info")) {
      userData = JSON.parse(localStorage.getItem("user-info"));
      alert("Purchase successfully done. Enjoy your day.");

      setPath(userData[0].role + "/dashboard");
    } else {
      setPath("/login");
    }
    setChangePath(true);
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
                        header={val.name}
                        imageUrl={val.image}
                        content={val.content}
                        price={val.price}
                        id={val.id}
                        count={val.count}
                        handleIncrement={handleIncrement}
                        handleDecrement={handleDecrement}
                      />
                      {/* <Card>
                        <Card.Header>{val.name}</Card.Header>
                        <div className="row">
                          <Card.Img
                            variant="top"
                            src={val.imageUrl}
                            className="ml-1 pt-1 col-sm-3"
                          />
                          <Card.Body className="col-sm-8">
                            <Card.Text>{val.content}</Card.Text>
                            <Card.Text>Price: ${val.price}</Card.Text>
                            <div className="row pt-2 ml-0">
                              <Button
                                variant="primary"
                                id={val.id}
                                data-value={val.price}
                                onClick={(e) => handleIncrement(e, val)}
                                className="col-3"
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </Button>
                              <Card.Text className="col-3 text-center">
                                {val.count}
                              </Card.Text>
                              <Button
                                variant="primary"
                                id={val.id}
                                data-value={val.price}
                                onClick={(e) => handleDecrement(e, val)}
                                className="col-3 btn-minus"
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </Button>
                              <div
                                className="remove-cart-btn pl-3 pt-1 ml-5"
                                onClick={() =>
                                  /*removeCartData(val.id)
                                  dispatch(removeFromCartAction(val.id))
                                }
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </div>
                            </div>
                          </Card.Body>
                        </div>
                              </Card> */}
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
              <Button variant="success" onClick={() => handleClick()}>
                Proceed to Buy
              </Button>
            </div>
          </div>
        </div>
        {changePath && <History path={path} />}
      </div>
    </>
  );
};

export default Cart;
