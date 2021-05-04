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
      response = await axiosApi("get", "products", param, false);

      console.log(response);
      if (response.statusCode === 200) {
        setDataArr(response.data);
      } else {
        alert("error");
      }
    }
    console.log(dataArr);

    fetchApi();
  }, []);
  return (
    <>
      <h1>Home page</h1>
      <CardDeck style={{ overflow: "scroll" }}>
        {dataArr !== undefined
          ? dataArr.map((e, val) => (
              <Card style={{ width: 18 + "rem" }}>
                <Card.Img
                  variant="top"
                  src={e.image}
                  style={{ width: "auto" }}
                />
                <Card.Body>
                  <Card.Title>{e.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {e.category}
                  </Card.Subtitle>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                    {/* {e.description} */}
                  </Card.Text>
                  <Button variant="primary" id={e.id} data-value={e.price}>
                    ${" " + e.price}
                  </Button>
                </Card.Body>
              </Card>
            ))
          : ""}
      </CardDeck>
    </>
  );
};

export default Home;
