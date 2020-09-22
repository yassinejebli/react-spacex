import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../elements/Modal";
import { closeModal } from "../../actions/launchesActions";

export default function SingleLaunchModal() {
  const { selectedLaunch } = useSelector((state) => state.launches);
  const dispatch = useDispatch();
  const [launchDataState, setLaunchDataState] = React.useState([]);
  const [isUserSelecting, setIsUserSelecting] = React.useState(false);

  React.useEffect(() => {
    if (selectedLaunch)
      setLaunchDataState([
        {
          field: "flight_number",
          label: "Flight Number: ",
          value: selectedLaunch.flight_number,
          isSelected: false,
        },
        {
          field: "launch_year",
          label: "Launch Year: ",
          value: selectedLaunch.launch_year,
          isSelected: false,
        },
        {
          field: "launch_date_utc",
          label: "Launch Date: ",
          value: new Date(selectedLaunch.launch_date_utc).toLocaleDateString(
            "gb"
          ),
          isSelected: false,
        },
        {
          field: "launch_success",
          label: "Successful: ",
          value: selectedLaunch.launch_success ? "Yes" : "No",
          isSelected: false,
        },
        {
          field: "rocket_name",
          label: "Rocket Name: ",
          value: selectedLaunch.rocket.rocket_name,
          isSelected: false,
        },
        {
          field: "rocket_type",
          label: "Rocket Type: ",
          value: selectedLaunch.rocket.rocket_type,
          isSelected: false,
        },
      ]);
  }, [selectedLaunch]);

  if (!selectedLaunch) return null;

  const onClose = () => {
    dispatch(closeModal());
  };

  const onFieldSelect = ({ target: { checked, value } }) => {
    setLaunchDataState((_launchDataState) =>
      _launchDataState.map((d) =>
        d.field === value ? { ...d, isSelected: checked } : d
      )
    );
  };

  return (
    <Modal>
      <Wrapper>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Content>
          <Title>{selectedLaunch.mission_name}</Title>
          <Details>{selectedLaunch.details}</Details>
          {launchDataState.map((d) => (
            <div key={d.field}>
              <Label>
                {isUserSelecting && (
                  <input
                    value={d.field}
                    checked={d.isSelected}
                    type="checkbox"
                    onChange={onFieldSelect}
                  />
                )}
                {d.label}
              </Label>
              {d.value}
            </div>
          ))}
          {selectedLaunch.links.youtube_id && (
            <Video
              src={`https://www.youtube.com/embed/${selectedLaunch.links.youtube_id}`}
            />
          )}
          <Buttons>
            {!isUserSelecting && (
              <Button onClick={() => setIsUserSelecting(true)}>
                Select fields to share
              </Button>
            )}
            {isUserSelecting && (
              <Button
                onClick={() => {
                  // send data to some endpoint...
                  setIsUserSelecting(false);
                  const dataToShare = launchDataState
                    .filter((d) => d.isSelected)
                    .map((d) => ({ [d.field]: d.value }));
                  alert(`Data to share: ${JSON.stringify(dataToShare)}`);
                  setLaunchDataState((_launchDataState) =>
                    _launchDataState.map((d) => ({ ...d, isSelected: false }))
                  );
                }}
              >
                Submit
              </Button>
            )}
            {isUserSelecting && (
              <Button onClick={() => setIsUserSelecting(false)}>Cancel</Button>
            )}
          </Buttons>
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

const Buttons = styled.div`
  display: flex;
  margin-top: 8px;
  & button {
    margin-right: 8px;
  }
`;
const Button = styled.button`
  font-weight: bold;
  cursor: pointer;
  padding: 4px;
`;

const CloseButton = styled(Button)`
  position: absolute;
  background: transparent;
  border: none;
  top: 8px;
  right: 16px;
  width: 30px;
  height: 30px;
  font-size: 24px;
  color: #f1f1f1;
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
