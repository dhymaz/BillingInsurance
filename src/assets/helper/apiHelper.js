const headerApiInternal = {
    headers: {
        "content-Type": "application/json",
        "apikey": process.env.REACT_APP_IP_INTERNAL_APIKEY,
        "builNumber":process.env.REACT_APP_API_BUILD_NUMBER,
        "version": process.env.REACT_APP_API_VERSION
    },
    auth: {
        "username": process.env.REACT_APP_USERNAME,
        "password": process.env.REACT_APP_PASSWORD
    }
};

export default headerApiInternal;