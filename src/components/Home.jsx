import React from "react";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosApi from "../axiosLib";
import MainHeader from "../reusableComponents/headers/mainHeader";
import { addToCartAction } from "../redux/actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Cart";
import NavBar from "../reusableComponents/headers/NavBar";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = (param) => {
  const [dataArr, setDataArr] = useState([]);
  const [item_count, setCount] = useState(0);

  const cartData = useSelector((state) => state.cartData);
  const dispatch = useDispatch();

  useEffect(() => {
    let response;
    async function fetchApi() {
      response = await axiosApi(
        "get",
        process.env.REACT_APP_LOCAL_API_URL + "Product",
        param,
        false
      );

      if (response.statusCode === 200) {
        setDataArr(response.data);
      } else {
        alert("error");
      }
    }

    fetchApi();
  }, []);

  const AddItem = (e, data) => {
    var id = e.target.getAttribute("id");
    data.count = 1;

    document.getElementById(id).disabled = true;
    setCount(item_count + 1);

    dispatch(addToCartAction(data));
  };

  return (
    <>
      <MainHeader />
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-9">
            <h5>All Products</h5>
          </div>
          <div className="col-3">
            <Link to="/cart" params={cartData}>
              <img
                src={process.env.PUBLIC_URL + "/logo.png"}
                alt="Add to cart"
                width="15px"
                height="15px"
                style={{ float: "right" }}
                className="cart-image"
              />
            </Link>
            <div className="count-div">
              <h6 className="cart-count">
                {item_count == 0 ? "+" : item_count}
              </h6>
            </div>
          </div>
        </div>
        <div className="row">
          {dataArr !== undefined
            ? dataArr.map((data, val) => (
                <>
                  <div className="col-sm-3 p-3">
                    <Card>
                      <Card.Header>{data.name}</Card.Header>
                      <Card.Img
                        variant="top"
                        className="ml-1 pt-1"
                        src={data.imageUrl}
                      />
                      <Card.Body>
                        <Card.Text>{data.content}</Card.Text>
                        <Button
                          variant="primary"
                          id={data.id}
                          data-value={data.price}
                          onClick={(e) => AddItem(e, data)}
                        >
                          Buy ${data.price}
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                </>
              ))
            : ""}
        </div>
      </div>
    </>
  );
};

export default Home;
