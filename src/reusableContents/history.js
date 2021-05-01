import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const History = (props) => {
  let past = useHistory();

  useEffect(() => {
    past.push(props.path);
  }, []);

  return <></>;
};

export default History;
