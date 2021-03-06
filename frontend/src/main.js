// importing named exports we use brackets
import { createPostTile, uploadImage, createElement, singlePost,makeWindowHeader } from './helpers.js';
// when importing 'default' exports, use below syntax
import API from './api.js';

// --------------------------------------------------
// ******************* MY SECTION ***************** 

// make a global api for use to use 
let api = new API();
// global variables 
let usersList;
let header = document.getElementsByTagName("header")[0]; 
let main = document.getElementsByTagName("main")[0]; 
let body = document.getElementsByTagName("body")[0];
let current_token = null;
let current_user = null;

// iIIFE FUNCTION
(function () {
	let background = createElement("div", "", {id:"background"})
	body.insertBefore(background, main);

    clearMain();
	register(); 
	login();
})();

// remove all children of main
function clearMain() { 
	while (main.firstChild) {
    	main.removeChild(main.firstChild);
	}
}


function login() { 
	let form = createElement("form", "",
		{class: "form-signin"});

	form.appendChild(makeWindowHeader("Welcome Home"));

	// add login elements onto the dom
	let username_bar = document.createElement("input");
	username_bar.id = "username_input";
	username_bar.placeholder = "Username";

	let password_bar = document.createElement("input");
	password_bar.id = "password_input";
	password_bar.placeholder = "Password";
	// password_bar.innerHTML = "password"; 

	let login_button = createElement("button", "Sign In");

	login_button.addEventListener("click", function(e) { 
		let username = document.getElementById('username_input').value;
		let password = document.getElementById('password_input').value;
		authenticateUser(username, password); 
	});
	login_button.onclick = (e) => false; // to prevent reload

	form.appendChild(username_bar); 
	form.appendChild(password_bar);
	form.appendChild(login_button);

	// main.appendChild(form);
	main.insertBefore(form, main.firstChild);
}

async function authenticateUser(username, password) { 
	let json = await api.login("auth/login", "POST", 
		{"Content-Type": 'application/json'}, // headers
		{username: username, password: password}); // body
	console.log("response, ", json);
	if (json === null) { 
		return;
	}
	current_token = json.token;
	current_user = username;
	console.log("current_token", current_token);
	initialiseHome(current_token);
}

function register() { 
	// create elements using createElement
	let form = createElement("form", "", {class: "form-signin"});
	form.appendChild(makeWindowHeader("Nice to Meet You"));

	// create inputs for each field in database 
	let new_username = createElement("input", "username", 
		{id : "new_username", placeholder : "Username"});
	let new_name = createElement("input", "name", 
		{id : "new_name", placeholder : "Name"});
	let new_password = createElement("input", "password", 
		{id : "new_password", placeholder : "Password"});
	let new_email = createElement("input", "email", 
		{id : "new_email", placeholder : "Email"});
	let button = createElement("button", "Register", 
		{id : "register_button"});
	button.onclick = (e) => false; // to prevent reload
	button.addEventListener("click", function(e) { 
		// grab the values from each input
		let username = document.getElementById('new_username').value;
		let name = document.getElementById('new_name').value;
		let password = document.getElementById("new_password").value;
		let email = document.getElementById("new_email").value;
		makeUser(username, name, password, email);
	});

	// append each field 
	form.appendChild(new_username);
	form.appendChild(new_name); 
	form.appendChild(new_password); 
	form.appendChild(new_email);
	form.appendChild(button);

	main.insertBefore(form, main.firstChild);
}

async function makeUser(new_username, new_name, new_password, new_email) { 
	current_token = await api.login("auth/signup", "POST", 
		{ "Content-Type": 'application/json' }, 
		{ username: new_username, password: new_password, email: new_email, name: new_name});
	console.log("current_token: ", current_token); 
	homePage(current_token);
}


function initialiseHome(token) { 
	clearMain();
	// add a button to to of the page 
	let home_page = createElement("button", "Home", 
		{id:"user_profile", class:"top-button"});
	home_page.addEventListener("click", homePage);
	header.appendChild(home_page);

	// add a button secion to the top of the page 
	let post_picture = createElement("button", "Post picture", 
		{id:"post_picture", class:"top-button"});
	post_picture.addEventListener("click", post); 
	header.appendChild(post_picture);

	// add a button to to of the page 
	let user_profile = createElement("button", "Profile", 
		{id:"user_profile", class:"top-button"});
	user_profile.addEventListener("click", profile);
	header.appendChild(user_profile);

	homePage(token);
	current_token = token; 
}

// Based on the feed from a specific user
function homePage(token) {

	clearMain();
	// lets change the background for no reason
	let background = document.getElementById("background"); 
	background.style.backgroundImage = "url(../images/tiles/purple_clouds.gif)";

	getPosts();
}

async function getPosts() { 
	let posts = await api.getPosts("user/feed", "GET", 
		{"Content-Type": 'application/json', "charset":"utf-8", "Authorization":"Token " + current_token});
	console.log(posts);
	let sections = posts.map(singlePost(current_token));
	for (var i = 0; i < sections.length; i++) { 
		main.appendChild(sections[i]); 
		console.log(sections[i]);
	}
}
// activate this when users want to post an image 
// Post new content Users can upload and post new content from a modal or seperate page via (POST /post)
// You are only allowed to post if the token is not null
function post() { 
	clearMain();
	// lets change the background for no reason
	let background = document.getElementById("background"); 
	background.style.backgroundImage = "url(../images/tiles/night4.gif)";

	let data_part = "";

	// create a form for uploading images 
    let upload_form = createElement("form", "",
    	{id:"upload_form", method:"get", enctype:"multipart/form-data", class: "form-signin"});
    upload_form.appendChild(makeWindowHeader("Make a Post"));
    upload_form.style.backgroundImage = "url(../images/tiles/purple_clouds.gif)";

    let select_image = createElement("input", "How will this show??",
    	{type:"file", id:"select_image", name:"new_image", accept:".jpg, .jpeg, .png"});
    upload_form.appendChild(select_image); 
    select_image.addEventListener("change", (e) => { 
    	uploadImage(e, (data) => { 
			var re = new RegExp("(data:.*base64,)");
			data_part = data.replace(re, ""); 
			
    	});
    }); 


   let description_text = createElement("input", "", 
   	{name: "description_text", type:"text", placeholder:"What are you thinking?"});
   upload_form.appendChild(description_text);

    let upload_image_button = createElement("input", "", 
    	{id: "upload_image_button", name:"submit", type:"submit", value:"Upload image", form:"upload_form", class: "upload-button"}); 

    upload_image_button.onclick = (e) => false; // to prevent reload
	upload_form.appendChild(upload_image_button); 

	upload_image_button.addEventListener('click', async function(e) {
		let image_path = e.target.form.select_image.value;
		if (data_part === "") { 
			alert("invalid image");
			return; 
		} else if (description_text.value == "") { 
			alert("invalid text");
			return; 
		}

		let response = await api.newPost("post", "POST", 
		{
			accept: "application/json", 
			Authorization: "Token " + current_token,
			"Content-Type": "application/json"
		}, 
		{ 
			"description_text" : description_text.value,
			"src": data_part
		});
		console.log("this is the repsone in the main.js", response);

	})

	// let image_preview = createElement("img", "", 
	// 	{class: "image-preview", src:"../images/other/notepad.gif", id:"image_preview"});
	// upload_form.appendChild(image_preview);


    // AH WHY DOES THIS THIS WORK 
    // upload_form.addEventListener("submit", (e) => 
    // 	{
    // 		e.preventDefault();
    // 		console.log("triggering event listener of form");
    // 	});



    main.appendChild(upload_form);
}

function submitform() { 
	console.log("submitting form.");
}


// username, number of posts, sum of likes they received on all their posts, etc. You may choose to utilise the information from the api in more creative ways such as displaying their most liked post etc. 
async function profile() { 
	console.log("user profile");
	clearMain();

	// lets change the background for no reason
	let background = document.getElementById("background"); 
	background.style.backgroundImage = "url(../images/tiles/sky.gif)";

	let query = "user/"+"?username="+current_user;
	const response = await api.getUser(query, "GET", 
			{accept: "application/json", Authorization: "Token " + current_token });
	console.log("response: ", response);

	// now response contains all the information for user
	let profile_section = createElement("div", "", 
		{class: "profile"});

	let username = createElement("h2", response.username,
		{class: "top-meta-data"});
	let email = createElement("h3", `email address: ${response.email}`, 
		{class: "profile-data"});

	let following = createElement("p", `following ${response.following.length} users`, 
		{class: "profile-data"});
	// use the ids to fetch the names of various users
	let posts = createElement("p", `${response.posts.length} posts`, 
		{class : "profile-data"});


	profile_section.appendChild(username);
	profile_section.appendChild(email);
	profile_section.appendChild(following); 
	profile_section.appendChild(posts);
	main.appendChild(profile_section);
}







