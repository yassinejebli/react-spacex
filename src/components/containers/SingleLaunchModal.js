import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../elements/Modal";
import { closeModal } from "../../actions/launchesActions";

export default function SingleLaunchModal() {
  const { selectedLaunch } = useSelector((state) => state.launches);
  const dispatch = useDispatch();

  if (!selectedLaunch) return null;
  const onClose = () => {
    dispatch(closeModal());
  };
  return (
    <Modal>
      <Wrapper>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Content>
          <Title>{selectedLaunch.mission_name}</Title>
          <Details>{selectedLaunch.details}</Details>
          <div>
            <Label>Flight Number: </Label>
            {selectedLaunch.flight_number}
          </div>
          <div>
            <Label>Launch Year: </Label>
            {selectedLaunch.launch_year}
          </div>
          <div>
            <Label>Launch Date: </Label>
            {new Date(selectedLaunch.launch_date_utc).toLocaleDateString("gb")}
          </div>
          <div>
            <Label>Successful: </Label>
            {selectedLaunch.launch_success ? "Yes" : "No"}
          </div>
          <div>
            <Label>Rocket Name: </Label>
            {selectedLaunch.rocket.rocket_name}
          </div>
          <div>
            <Label>Rocket Type: </Label>
            {selectedLaunch.rocket.rocket_type}
          </div>
          {selectedLaunch.links.youtube_id && (
            <Video
              src={`https://www.youtube.com/embed/${selectedLaunch.links.youtube_id}`}
            />
          )}
        </Content>
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  overflow-y: auto;
  & div,
  h1,
  span {
    color: #f1f1f1;
    margin-top: 8px;
  }
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 0 8px;
`;

const Button = styled.button`
  font-weight: bold;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const Title = styled.h1``;

const Label = styled.label`
  color: #a8a8a8;
`;

const Details = styled.div`
  max-width: 300px;
`;
const Video = styled.iframe.attrs({
  frameBorder: 0,
  allowFullScreen: true,
})`
  width: 400px;
  height: 200px;
  margin-top: 8px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
