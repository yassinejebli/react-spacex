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
