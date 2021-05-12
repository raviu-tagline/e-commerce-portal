import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCartAction,
  removeFromCartAction,
} from "../redux/actions/cartActions";
import MainHeader from "../reusableComponents/headers/mainHeader";
import History from "../reusableContents/history";

const Cart = () => {
  const cartData = useSelector((state) => state.cartData);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [dataSet, setData] = useState();
  const [path, setPath] = useState("/");
  const [changePath, setChangePath] = useState(false);
  let userData;
  let NoRec = "";

  useEffect(() => {
    if (cartData.length == 0) {
      fetch("http://localhost:3001/Cart", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) =>
        res.json().then((result) => {
          setData(result);
        })
      );
    } else {
      setData(cartData);
    }
  }, []);

  const handleIncrement = (e, data) => {
    data.count = data.count + 1;
    data.price *= data.count;
    setCount(data.count);
  };

  const handleDecrement = (e, data) => {
    if (data.count > 1) {
      data.price /= data.count;
      data.count = data.count - 1;
    }
    setCount(data.count);
  };

  const removeCartData = (id) => {
    // fetch("http://localhost:3001/Cart/" + id, {
    //   method: "delete",
    // }).then((res) => res.json().then((res) => console.log("delete")));
    // dispatch(removeFromCartAction(id));
    // fetch("http://localhost:3001/Cart", {
    //   method: "get",
    // }).then((res) => res.json().then((res) => setData(res)));
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
        <div className="col-8 ml-2">
          <div className="card-title">
            <h1>Cart List</h1>
          </div>
          <div className="row">
            {dataSet !== undefined ? (
              dataSet.map((val, ind) => {
                return (
                  <>
                    <div className="pt-3">
                      <Card>
                        <Card.Header>{val.name}</Card.Header>
                        <div className="row">
                          <Card.Img
                            variant="top"
                            src={val.imageUrl}
                            className="ml-1 pt-1 col-sm-3"
                          />
                          <Card.Body className="col-sm-8">
                            <Card.Text>{val.name}</Card.Text>
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
                                  /*removeCartData(val.id)*/
                                  dispatch(removeFromCartAction(val.id))
                                }
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </div>
                            </div>
                          </Card.Body>
                        </div>
                      </Card>
                    </div>
                  </>
                );
              })
            ) : (
              <>
                <div>
                  <p>{NoRec}</p>
                </div>
              </>
            )}
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
                {dataSet != undefined
                  ? dataSet.length <= 1
                    ? dataSet.length + " item"
                    : dataSet.length + " items"
                  : ""}
                ):{" "}
                <span className="float-right">
                  $
                  {dataSet != undefined
                    ? dataSet.reduce((prev, current) => prev + current.price, 0)
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
