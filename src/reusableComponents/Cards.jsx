import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCartAction } from "../redux/actions/cartActions";

const Cards = (props) => {
  return (
    <>
      <Card>
        {console.log(`props.image`, props.image)}
        <Card.Header>{props.header}</Card.Header>
        <div className={props.component == "cart" ? "row" : ""}>
          <Card.Img
            variant="top"
            src={props.image}
            className={
              props.component == "cart" ? "ml-1 pt-1 col-sm-3" : "ml-1 pt-1"
            }
            alt="Please check your internet"
          />
          <Card.Body className={props.component == "cart" ? "col-sm-8" : ""}>
            <Card.Text>{props.content}</Card.Text>
            {props.component == "cart" ? (
              <>
                <Card.Text>Price: ${props.price}</Card.Text>
                <div className="row pt-2 ml-0">
                  <Button
                    variant="primary"
                    id={props.btnId}
                    data-value={props.btnPrice}
                    onClick={(e) => props.handleIncrement(e, props)}
                    className="col-3"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  <Card.Text className="col-3 text-center">
                    {props.count}
                  </Card.Text>
                  <Button
                    variant="primary"
                    id={props.id}
                    data-value={props.price}
                    onClick={(e) => props.handleDecrement(e, props)}
                    className="col-3 btn-minus"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>
                  <div
                    className="remove-cart-btn pl-3 pt-1 ml-5"
                    onClick={() => props.handleRemoveCart(props.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  id={props.id}
                  data-value={props.price}
                  onClick={(e) => props.AddItem(e, props)}
                >
                  Buy ${props.price}
                </Button>
              </>
            )}
          </Card.Body>
        </div>
      </Card>
    </>
  );
};

export default memo(Cards);
