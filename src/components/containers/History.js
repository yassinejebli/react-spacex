import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loadHistory } from "../../actions/historyActions";

export default function History() {
  const dispatch = useDispatch();
  const { loading, error, historyItems } = useSelector((state) => state);
  console.log({ loading, historyItems, error });

  React.useEffect(() => {
    dispatch(loadHistory());
  }, []);
  return <Wrapper>{JSON.stringify(historyItems)}</Wrapper>;
}

const Wrapper = styled.div``;
