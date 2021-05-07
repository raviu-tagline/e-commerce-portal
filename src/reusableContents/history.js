import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const History = (props) => {
  let history = useHistory();

  useEffect(() => {
    console.log("path", props);
    history.push(props.path);
  }, []);

  return <></>;
};

export default History;
