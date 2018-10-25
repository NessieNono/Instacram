/* returns an empty array of size max */
export const range = (max) => Array(max).fill(null);

/* returns a randomInteger */
export const randomInteger = (max = 1) => Math.floor(Math.random()*max);

/* returns a randomHexString */
const randomHex = () => randomInteger(256).toString(16);

/* returns a randomColor */
export const randomColor = () => '#'+range(3).map(randomHex).join('');

/**
 * You don't have to use this but it may or may not simplify element creation
 * 
 * @param {string}  tag     The HTML element desired
 * @param {any}     data    Any textContent, data associated with the element
 * @param {object}  options Any further HTML attributes specified
 */
export function createElement(tag, data, options = {}) {
    const el = document.createElement(tag);
    el.textContent = data;
   
    // Sets the attributes in the options object to the element
    return Object.entries(options).reduce(
        (element, [field, value]) => {
            element.setAttribute(field, value);
            return element;
        }, el);
}

/**
 * Given a post, return a tile with the relevant data
 * @param   {object}        post 
 * @returns {HTMLElement}
 */
export function createPostTile(post) {
    const section = createElement('section', null, { class: 'post', id: "section" });

    section.appendChild(createElement('h2', post.meta.author, { class: 'post-title' }));

    section.appendChild(createElement('img', null, 
        { src: '/images/'+post.src, alt: post.meta.description_text, class: 'post-image' }));

    let post_text = createElement('div', null, {class: 'post-text'});

    var date = new Date(post.meta.published);
    post_text.appendChild(createElement('p', date.toLocaleDateString("en-AU")));
    //post_text.appendChild(createElement('p', "likes: " + post.meta.likes.length));
    //post_text.appendChild(createElement('p', "comments: " + post.meta.comments.length));
    post_text.appendChild(createElement('p', post.meta.description_text));

    section.appendChild(post_text);
    return section;
}

// given a json object, returns an entire sectoin 
// uses Promise.all
export function singlePost(post) { 

    let section = createElement('section', null, { id: post.id, class: 'post' });
    section.appendChild(makeWindowHeader(post.meta.author));

    // <img src="data:image/png;base64,<string>" />
    // let thumbnail = createElement("img", null, 
    //    {src : "data:image/png;base64,"+post.thumbnail});
    let image = createElement("img", null, 
        {src : "data:image/png;base64,"+post.src, class:"post-image"});

    let post_text = createElement("div", null, {class : "post-text"});


    // formatting the date correctly 
    // let raw_date = Date(post.meta.published);
    // var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    // let formatted_date = raw_date.toLocaleDateString("en-US", options); // a string 
    // console.log(raw_date); 
    // console.log(formatted_date);
    // let date = createElement("p", formatted_date); 

    console.log(post.meta.published);
    let raw_date = new Date(parseInt(post.meta.published));
    let formatted_date = raw_date.toLocaleDateString("en-US", 
        { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    let date = createElement("p", formatted_date); 


    let likes = createElement("button", post.meta.likes.length + " likes", 
        {class : "btn btn-primary"}); 
    likes.addEventListener("click", function (e) { 
        console.log("show likes");
        // create list of users 
        let likers = post.meta.likes;
        let like_box = createElement("div", likers, 
            {class: "likebox"}); 
        section.appendChild(like_box);
    });

    let comments = createElement("button", post.comments.length + " comments", 
        {class: "btn btn-primary"}); 
    comments.addEventListener("click", function(e) {
        console.log("show commentors"); 
        let commentors = post.comments; 
        let comment_box = createElement("div", commentors, 
            { class: "commentbox"});
    });

    let description_text = createElement("p", post.meta.description_text);


    // for manipulating with likes and comments 

    post_text.appendChild(date);
    post_text.appendChild(likes);
    post_text.appendChild(comments);
    post_text.appendChild(description_text);

    //section.appendChild(thumbnail);
    section.appendChild(image);
    section.appendChild(post_text);
    return section;
}

// Given an input element of type=file, grab the data uploaded for use
// we need to use a callback function to handle the uploadImage() function because it has a .onload component that has an early return 
// so we need to wait for it before it returns 

export function uploadImage(event, callback) {
    const [ file ] = event.target.files;
    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === file.type);
    // bad data, let's walk away
    if (!valid)
        return false;
    // if we get here we have a valid image
    const reader = new FileReader();
    reader.onload = function(e) {
        // do something with the data result
        const dataURL = e.target.result;
        const image = createElement('img', null, { src: dataURL });
        // for preview 
        document.getElementsByTagName("main")[0].appendChild(image);
        // this is what happens after loading 
        callback(dataURL);
    };
    // this returns a base64 image
    reader.readAsDataURL(file);
}


/* 
    Reminder about localStorage
    window.localStorage.setItem('AUTH_KEY', someKey);
    window.localStorage.getItem('AUTH_KEY');
    localStorage.clear()
*/
export function checkStore(key) {
    if (window.localStorage)
        return window.localStorage.getItem(key)
    else
        return null
}



// ----------------------------------------------------------------------
// ************************** LEVEL 2 FUNCTIONS **********************


// ----------------------------------------------------------------------
// ************************** Decorative FUNCTIONS **********************



export function makeWindowHeader(text) {
    let windowHeader = createElement("div", text, 
        {class: "strip"}); 
    windowHeader.appendChild(createElement("div", "+", 
        {class: "square"}));
    windowHeader.appendChild(createElement("div", "-", 
        {class: "square"}));
    return windowHeader;
}


