const headerApiInternal = {
    headers: {
        "content-Type": "application/json",
        "apikey": process.env.REACT_APP_IP_INTERNAL_APIKEY,
        "builNumber":process.env.REACT_APP_API_BUILD_NUMBER,
        "version": process.env.REACT_APP_API_VERSION,
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': '*',
        // 'Access-Control-Allow-Credentials': 'true'
        // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        // 'Access-Control-Allow-Headers': "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
    },
    auth: {
        "username": process.env.REACT_APP_USERNAME,
        "password": process.env.REACT_APP_PASSWORD
    }
};

export default headerApiInternal;