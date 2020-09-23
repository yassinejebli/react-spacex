export const SHARE_DATA_BEGIN = "SHARE_LAUNCH_DATA_BEGIN";
export const SHARE_DATA_SUCCESS = "SHARE_LAUNCH_DATA_SUCCESS";
export const SHARE_DATA_FAIL = "SHARE_LAUNCH_DATA_FAIL";

export function shareLaunchData(launchData) {
  return {
    type: SHARE_DATA_BEGIN,
    payload: {
      launchData,
    },
  };
}
