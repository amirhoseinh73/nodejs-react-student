export const BACKEND_URL = "http://localhost:8000"

export const createUserRoute = BACKEND_URL + "/users"
export const getAllUsersRoute = BACKEND_URL + "/users"
export const getSearchedUsersRoute = (key) => BACKEND_URL + "/users/" + key