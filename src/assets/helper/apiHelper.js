const headerApiInternal = {
    headers: {
        "content-Type": "application/json",
        "apikey": process.env.REACT_APP_IP_INTERNAL_APIKEY,
        "builNumber": "1",
        "version": "1.0.0 1"
    },
    auth: {
        "username": "megain",
        "password": "megaz!pass"
    }
};

export default headerApiInternal;