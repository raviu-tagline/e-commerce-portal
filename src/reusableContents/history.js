import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const History = (props) => {
  let history = useHistory();

  useEffect(() => {
    history.push(props.path);
  }, []);

  return <React.Fragment></React.Fragment>;
};

export default History;
