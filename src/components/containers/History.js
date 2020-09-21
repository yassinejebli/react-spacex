import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loadHistory } from "../../actions/historyActions";
import Loader from "../elements/Loader";
import HistoryItem from "../elements/HistoryItem";

export default function History() {
  const dispatch = useDispatch();
  const { loading, error, historyItems } = useSelector(
    (state) => state.history
  );
  console.log({ loading, historyItems, error });

  React.useEffect(() => {
    dispatch(loadHistory());
  }, []);
  return (
    <>
      <Loader loading={loading} />
      <Wrapper>
        {historyItems.map((event) => (
          <HistoryItem
            key={event.id}
            title={event.title}
            date={new Date(event.event_date_utc).toLocaleDateString("de")}
            description={event.details}
            link={event.links.article}
          />
        ))}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: wrap;
`;
