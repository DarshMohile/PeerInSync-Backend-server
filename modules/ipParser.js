const UAParser = require('ua-parser-js');
const axios = require('axios');

const fetchIPDetails = async (uaHeader, ip) => {

    const ipDetails = {
        device: '',
        location: '',
        coords: '',
        postalCode: ''
    };

    const parser = new UAParser(uaHeader);                      //parse user agent header
    const userAgentDetails = parser.getResult();                //get the user agent details
    const browser = userAgentDetails.browser.name;              //get the browser name
    const os = userAgentDetails.os.name;                        //get the os name
    
    try
    {
        const ipApiRes = await axios.get(`https://ipapi.co/${ip}/json/`);
        //console.log('IP api details of client: ', ipApiRes);
    }
    catch(err)
    {
        console.log('IP API Failed: ', err);
    }

    ipDetails.location = `${ipApiRes.data.city || 'unknown city'}, ${ipApiRes.data.region || 'unknown region'}, ${ipApiRes.data.country_name || 'Unknown country'}`;
    ipDetails.coords = `Latitude: ${ipApiRes.data.latitude || 'N/A'}, Logitude: ${ipApiRes.data.longitude || 'N/A'}`;
    ipDetails.postalCode = `${ipApiRes.data.postal || 'N/A'}`
    ipDetails.device = `${browser} on ${os}`;

    console.log('Gathered ip details: ', ipDetails);

    return ipDetails;
};

module.exports = fetchIPDetails;

