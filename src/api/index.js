export async function fetchLaunchesHistory() {
  const fieldsToFetch = "id,title,event_date_utc,details,links";
  const response = await fetch(
    `https://api.spacexdata.com/v3/history?filter=${fieldsToFetch}`
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Cannot fetch history data");
  }
}

export async function fetchLaunches({ offset, limit, filters }) {
  const fieldsToFetch =
    "mission_name,flight_number,rocket/second_stage/payloads";
  const response = await fetch(
    `https://api.spacexdata.com/v3/launches?${new URLSearchParams(
      filters
    ).toString()}&offset=${offset}&limit=${limit}&filter=${fieldsToFetch}`
  );
  if (response.ok) {
    return response;
  } else {
    throw new Error("Cannot fetch launches data");
  }
}
