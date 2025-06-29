// import { useState, useEffect } from "react";

// export function useLocalStorageState(initialState, key) {
//   const [value, setValue] = useState(function () {
//     const storedValue = localStorage.getItem(key);
//     return storedValue ? JSON.parse(storedValue) : initialState;
//   });

//   useEffect(
//     function () {
//       localStorage.setItem(key, JSON.stringify(value));
//     },
//     [value, key]
//   );

//   return [value, setValue];
// }

import { data } from "../authentication/useLogin";

const USER_LOCAL_STORAGE_KEY = "LOGGED_IN_USER";

export function saveUser(data) {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export function getUser(data) {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return user ? JSON.parse(user) : undefined;
}

export function removeUser() {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}
