import React from "react";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { CardDeck, CardGroup } from "reactstrap";
import axiosApi from "../axiosLib";

const Home = (param) => {
  const [dataArr, setDataArr] = useState();

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
  return (
    <>
      <div className="container">
        <h1>Home page</h1>
        <div className="row">
          {dataArr !== undefined
            ? dataArr.map((e, val) => (
                <>
                  <div className="col-sm-3 p-3">
                    <Card>
                      <Card.Img variant="top" src={e.imageUrl} />
                      <Card.Body>
                        <Card.Header>{e.name}</Card.Header>
                        <Card.Subtitle className="mb-2 text-muted">
                          {e.category}
                        </Card.Subtitle>
                        <Card.Text>{e.content}</Card.Text>
                        <Button
                          variant="primary"
                          id={e.id}
                          data-value={e.price}
                        >
                          Buy ${" " + e.price}
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
