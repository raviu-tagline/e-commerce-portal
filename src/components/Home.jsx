import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosApi from "../axiosLib";
import MainHeader from "../reusableComponents/headers/mainHeader";
import { addToCartAction } from "../redux/actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Cart";
import NavBar from "../reusableComponents/headers/NavBar";
import Loader from "./Loader";
import Cards from "../reusableComponents/Cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Home = (param) => {
  const [dataArr, setDataArr] = useState([]);
  const [item_count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [hasNext, setNext] = useState(true);
  const limit = 12;

  const cartData = useSelector((state) => state.cartData);
  const dispatch = useDispatch();

  useEffect(async () => {
    let response;

    response = await axiosApi(
      "get",
      process.env.REACT_APP_LOCAL_API_URL +
        `Product?_limit=${limit}&_page=${page}`,
      param,
      false
    );

    if (response.statusCode === 200 && response.data.length !== 0) {
      setDataArr([...dataArr, ...response.data]);
      setLoader(false);
    } else {
      setLoader(false);
      setNext(false);
    }
  }, [page]);

  const AddItem = (e, data) => {
    var id = e.target.getAttribute("id");
    let userData = localStorage.getItem("user-info");
    if (userData) {
      data = {
        ...data,
        count: 1,
        actualPrice: data.price,
        user: JSON.parse(userData),
      };
    }

    document.getElementById(id).disabled = true;
    dispatch(addToCartAction(data));
    setCount(item_count + 1);
  };

  const loadMore = () => {
    if (hasNext) {
      setLoader(true);
      setPage(page + 1);
    }
  };

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMore();
    }
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
              <h6 className="cart-count m-auto justify-content-center">
                {item_count == 0 ? (
                  <FontAwesomeIcon icon={faPlus} />
                ) : (
                  <strong>{item_count}</strong>
                )}
              </h6>
            </div>
          </div>
        </div>
        <div className="row">
          {dataArr !== undefined
            ? dataArr.map((val, ind) => (
                <>
                  <div className="col-sm-3 p-3">
                    <Cards
                      component="home"
                      header={val.name}
                      image={val.imageUrl}
                      content={val.content}
                      price={val.price}
                      id={val.id}
                      AddItem={AddItem}
                    />
                  </div>
                </>
              ))
            : ""}
          {loader && <Loader />}
          {!hasNext && (
            <h1 className="my-2 justify-content-center mx-auto">
              No more data
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
