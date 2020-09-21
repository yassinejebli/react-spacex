import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loadLaunches } from "../../actions/launchesActions";

export default function Pagination() {
  const dispatch = useDispatch();
  const { meta } = useSelector((state) => state.launches);
  const totalPages = Math.ceil(meta.totalItems / meta.perPage);

  const prevPage = () => {
    if (meta.currentPage > 1) dispatch(loadLaunches(meta.currentPage - 1));
  };

  const nextPage = () => {
    if (meta.currentPage < totalPages)
      dispatch(loadLaunches(meta.currentPage + 1));
  };

  const firstPage = () => {
    if (meta.currentPage !== 1) dispatch(loadLaunches(1));
  };

  const lastPage = () => {
    if (meta.currentPage !== totalPages) dispatch(loadLaunches(totalPages));
  };

  return (
    <Wrapper>
      <ArrowButton onClick={firstPage}> {"<<"} </ArrowButton>
      <ArrowButton onClick={prevPage}> {"<"} </ArrowButton>
      {`${meta.currentPage}/${totalPages}`}
      <ArrowButton onClick={nextPage}> {">"} </ArrowButton>
      <ArrowButton onClick={lastPage}> {">>"} </ArrowButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowButton = styled.button`
  margin: 12px;
`;
