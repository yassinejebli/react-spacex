export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_BEGIN = 'FETCH_DATA_BEGIN';

export function loadHistory(){
    return {
        type: FETCH_DATA_BEGIN
    }
}
