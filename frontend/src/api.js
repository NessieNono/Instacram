// change this when you integrate with the real API, or when u start using the dev server
// const API_URL = 'http://localhost:8080/data'
const API_URL = "http://localhost:5000";

const getJSON = (path, options) => 
    fetch(path, options)
        .then(res => res.json())
        .catch(err => console.warn(`API_ERROR: ${err.message}`));

/**
 * This is a sample class API which you may base your code on.
 * You don't have to do this as a class.
 */
export default class API {

    /**
     * Defaults to teh API URL
     * @param {string} url 
     */
    constructor(url = API_URL) {
        this.url = url;
    } 

    makeAPIRequest(path) {
        // return getJSON(`${this.url}/${path}`);
        console.log(`path: ${path}`);
    }


    // all requests are in this format: 
    // path, method, headers (not stringified), [body]
    newPost(path, method, headers, body) { 
        console.log(`path: ${path}, header: ${headers}, body: ${body}`);
        return fetch(`${this.url}/${path}`, 
            {   "method": method, 
                "headers": headers,
                "body": JSON.stringify(body),
            })
        .then(response => response.json())
        .then(json => { 
            console.log("response from uploading new post");
            console.log(json);
            return json;
        });
        // make the fetch request 
    }

    // works both for new and old users
    login(path, method, headers, body) { 
        return fetch(`${this.url}/${path}`, 
        {   "method": method, 
            "headers": headers, 
            "body": JSON.stringify(body),
        })
        .then(response => response.json());
    }


    // returns the data and metadata for all the posts 
    // followed by a particular user 
    getPosts(path, method, headers) { 
        return fetch(`${this.url}/${path}`, 
            {   "method": method, 
                "headers": headers
            })
            .then(response => response.json()
            .then(json => json.posts));
    
    }

    getUser(path, method, headers) { 
        return fetch(`${this.url}/${path}`, 
            {   "method": method, 
                "headers": headers
            })
        .then(response => response.json());
    }

    /**
     * @returns feed array in json format
     */
    getFeed() {
        return this.makeAPIRequest('feed.json');
    }

    /**
     * @returns auth'd user in json format
     */
    getMe() {
        return this.makeAPIRequest('me.json');
    }

}
