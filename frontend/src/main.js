// importing named exports we use brackets
import { createPostTile, uploadImage, createElement, singlePost, makeWindowHeader } from './helpers.js';
// when importing 'default' exports, use below syntax
import API from './api.js';

// --------------------------------------------------
// ******************* MY SECTION ***************** 

// global variables 
let usersList;
let header = document.getElementsByTagName("header")[0]; 
let main = document.getElementsByTagName("main")[0]; 
let body = document.getElementsByTagName("body")[0];
let current_token = null;
let current_user = null;

// make a global api for use to use 
let api = new API();

// iIIFE FUNCTION
(function () {
	let background = createElement("div", "", {id:"background"})
	body.insertBefore(background, main);



	// function setTranslate(xPos, yPos, el) {
	//     el.style.transform = "translate3d(" + xPos + ", " + yPos + "px, 0)";
	// }

	// window.addEventListener("DOMContentLoaded", scrollLoop, false);

	// var xScrollPosition;
	// var yScrollPosition;

	// function scrollLoop() {
	//     xScrollPosition = window.scrollX;
	//     yScrollPosition = window.scrollY;

	//     setTranslate(0, yScrollPosition * 0.1, background);
	//     setTranslate(0, yScrollPosition * -0.1, main);

	//     requestAnimationFrame(scrollLoop);
	// }






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
	current_token = await api.login("auth/login", "POST", 
		{"Content-Type": 'application/json'}, // headers
		{username: username, password: password}); // body
	console.log("git itL", current_token);
	homePage(current_token);
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



// Based on the feed from a specific user
function homePage(token) {
	current_token = token; 
	clearMain();
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

	getPosts();



	// .then(json => { 
	// 	let list = json.posts;
	// 	// console.log(list);
	// 	let sections = list.map(singlePost);
	// 	// console.log("section: ", sections);


	// 	// append the array of nodes onto the main section
	// 	for (var i = 0; i < sections.length; i++) { 


	// 		sections[i].appendChild(makeWindowHeader("This is a post"));


	// 		function addLikeButton(event) { 
	// 			let current = event.target;
	// 		    console.log("like this post");
	// 			let id = current.id;

	// 			let query = "?id=" + id;
	// 			fetch("http://localhost:5000/post/like"+query, 
	// 			{   headers: { "Content-Type": 'application/json', Authorization: "Token " + current_token },
	// 			    method: 'PUT',
	// 			}).then(response => response.json())
	// 			.then(json => { 
	// 			    // console.log(json);
	// 			});
	// 		}

	// 		let likebutton = createElement("button", "like",
	// 		    {id : sections[i].id});
	// 		likebutton.addEventListener("click", addLikeButton, false);
	// 		sections[i].appendChild(likebutton);
	// 		main.append(sections[i]);
	// 	}
	// });
}


async function getPosts() { 
	let posts = await api.getPosts("user/feed", "GET", 
		{"Content-Type": 'application/json', "charset":"utf-8", "Authorization":"Token " + current_token});
	console.log(posts);
	let sections = posts.map(singlePost);
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

	// create a form for uploading images 
    let upload_form = createElement("form", "",
    	{id:"upload_form", method:"get", enctype:"multipart/form-data"});
    upload_form.onsubmit = function () { alert("hello"); };


    let upload_image_button = createElement("input", "", 
    	{id: "upload_image_button", name:"submit", type:"submit", value:"Submit"}); 
    upload_image_button.onclick = (e) => false; // to prevent reload
	upload_form.appendChild(upload_image_button); 

    let select_image = createElement("input", "",
    	{type:"file", id:"select_image", name:"new_image", accept:".jpg, .jpeg, .png"});

    // select_image.addEventListener("change", (e) => {
    // 	uploadImage(e, (data) => {
    // 		var re = new RegExp("(data:.*base64,)");
    // 		let data_part = data.replace(re, ""); 
    // 		api.newPost("post", "POST", 
    // 		{
    // 			accept: "application/json", 
    // 			Authorization: "Token " + current_token,
    // 			"Content-Type": "application/json"
    // 		}, 
    // 		{ 
				// "description_text" : "placeholder",
				// "src": data_part
    // 		});
    // 	}); 
    // });

    upload_form.appendChild(select_image); 
    // upload_form.addEventListener("submit", (e) => 
    // 	{
    // 		e.preventDefault();
    // 		console.log("triggering event listener of form");
    // 	});


	// upload_image_button.addEventListener('click', function(clickEvent) {
	//   const domEvent = new CustomEvent(clickEvent);
	//   upload_image_button.dispatchEvent(domEvent);
	//   clickEvent.target.closest('form').dispatchEvent(domEvent)
	// })

    main.appendChild(upload_form);
}

function submitform() { 
	console.log("submitting form.");
}


// username, number of posts, sum of likes they received on all their posts, etc. You may choose to utilise the information from the api in more creative ways such as displaying their most liked post etc. 
async function profile() { 
	console.log("user profile");
	clearMain();

	let query = "user/"+"?username="+current_user;
	const response = await api.getUser(query, "GET", 
			{accept: "application/json", Authorization: "Token " + current_token });
	console.log(response);

	// now response contains all the information for user
	let profile_section = createElement("div", "", 
		{class: "user-profile"});

	let username = createElement("h2", response.username);
	let email = createElement("h3", response.email);

	let following = createElement("p", response.following);
	// use the ids to fetch the names of various users


	let posts = createElement("p", response.posts);


	profile_section.appendChild(username);
	profile_section.appendChild(email);
	profile_section.appendChild(following); 
	profile_section.appendChild(posts);
	main.appendChild(profile_section);
}







