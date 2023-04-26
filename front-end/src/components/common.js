export const config = {
    headers: {
        "Content-type": "application/json",
          "auth-token": `${sessionStorage.getItem('authToken')}`,
    },
};