import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const History = (props) => {
  let history = useHistory();

  useEffect(() => {
    history.push(props.path);
  }, []);

  return <></>;
};

export default History;
