import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCartAction,
  removeFromCartAction,
} from "../redux/actions/cartActions";
import MainHeader from "../reusableComponents/headers/mainHeader";

const Cart = () => {
  const cartData = useSelector((state) => state.cartData);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [flag, setFlag] = useState(false);

  console.log("State every time -- ", cartData);

  useEffect(() => {
    fetch("http://localhost:3001/Cart", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((result) => dispatch(addToCartAction(result)))
    );
  }, []);

  const handleIncrement = (event) => {
    setCount(count + 1);
  };

  const handleDecrement = (event) => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <>
      <MainHeader />
      <div className="container">
        <h1>Cart List</h1>
        <div className="row">
          {cartData !== undefined
            ? cartData.map((val, ind) => {
                if (ind !== 0) {
                  console.log(ind, val);
                  return (
                    <>
                      <div className="col-sm-3 p-3">
                        <Card>
                          <Card.Header>{val.cartData.name}</Card.Header>
                          {/* <Card.Img variant="top" src={data.imageUrl} /> */}
                          <Card.Body>
                            <Card.Text>{val.cartData.name}</Card.Text>
                            <Card.Text>
                              Price:{" "}
                              {count > 1
                                ? val.cartData.price * count
                                : val.cartData.price}
                            </Card.Text>
                            <div className="row pt-2">
                              <Button
                                variant="primary"
                                id={val.cartData.id}
                                data-value={val.cartData.price}
                                onClick={(event) => handleIncrement(event)}
                                className="col-3"
                              >
                                {" "}
                                +{" "}
                              </Button>
                              <Card.Text className="col-3">{count}</Card.Text>
                              <Button
                                variant="primary"
                                id={val.cartData.id}
                                data-value={val.cartData.price}
                                onClick={(event) => handleDecrement(event)}
                                className="col-3"
                              >
                                {" "}
                                -{" "}
                              </Button>
                              <div
                                className="remove-cart-btn"
                                onClick={() =>
                                  dispatch(
                                    removeFromCartAction(val.cartData.id)
                                  )
                                }
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    </>
                  );
                }
              })
            : "Data not found"}
        </div>
      </div>
    </>
  );
};

export default Cart;
