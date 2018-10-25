	// api.makeAPIRequest("auth/login").then((r)=>console.log(r));
	// fetch("http://127.0.0.1:8080/auth/login", 
	// 	{ 	method: "POST", 
	// 		body: data
	// 	})
	// 	.then(response => {console.log(response)});

	// fetch("https://localhost:5000/auth/login", {
	//     headers: { "Content-Type": 'application/json' },
	//     method: 'POST',
	//     body: { username: 'Sophia', password: 'cluttered' }
	// })
	// 	.then(response => { 
	// 		console.log(response);
	// 	})


// incorrect because you didnt stringify
function authenticateUser(username, password) { 

	fetch("http://localhost:5000/auth/login", {
	    headers: { "Content-Type": 'application/json' },
	    method: 'POST',
	    body: { username: username, password: password }
	}).then(response => { 
		console.log(response)} 
		);
}


// correct 
function authenticateUser(username, password) { 
	const usr = { 
	"username": username,
	"password": password 
	};
	console.log(usr);
	const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	};
	fetch("http://localhost:5000/auth/login", {
	 headers,
	 method: 'POST',
	 body: JSON.stringify(usr)
	}).then(response => { 
		console.log(response)} 
		);
}

// Old functions from level 0 
function login() {

	// Create main section being a form section 
	let form = createElement("form", "");
	form.classList.add("form-signin");


	// add login elements onto the dom
	let username_bar = document.createElement("input");
	username_bar.id = "username_input";
	username_bar.classList.add("form-control");
	username_bar.placeholder = "Email Address";
	// username_bar.innerHTML = "username"; 

	let password_bar = document.createElement("input");
	password_bar.id = "password_input";
	password_bar.classList.add("form-control");
	password_bar.placeholder = "Password";
	// password_bar.innerHTML = "password"; 

	let login_button = createElement("button", "Sign In");
	login_button.classList.add("btn"); 
	login_button.classList.add("btn-primary"); 
	console.log(login_button);
	login_button.addEventListener("click", function(e) { 
		let username = document.getElementById('username_input').value;
		let password = document.getElementById('password_input').value;

		// see if username and password matches ones in data/users.json
		matchUser(username, password); 

	});
	login_button.onclick = (e) => false; // to prevent reload

	form.appendChild(username_bar); 
	form.appendChild(password_bar);
	form.appendChild(login_button);

	// main.appendChild(form);
	main.insertBefore(form, main.firstChild);
}
// Registration An option to register for “Instacram” is presented on the login page allowing the user to sign up to the service. This for now updates the internal state object described above.
function register() { 
	// Create main section being a form section 
	let form = createElement("form", "");
	form.classList.add("form-signin");

	// add login elements onto the dom
	let username_bar = document.createElement("input");
	username_bar.id = "new_username";
	username_bar.classList.add("form-control");
	username_bar.placeholder = "Username";
	// username_bar.innerHTML = "username"; 

	let name_bar = document.createElement("input");
	name_bar.id = "new_name";
	name_bar.classList.add("form-control");
	name_bar.placeholder = "name";
	// password_bar.innerHTML = "password"; 

	let login_button = createElement("button", "Register");
	login_button.classList.add("btn"); 
	login_button.classList.add("btn-primary"); 
	console.log(login_button);
	login_button.addEventListener("click", function(e) {
		let name = document.getElementById('new_name').value;
		let username = document.getElementById('new_username').value;
		makeUser(name, username);
	});
	login_button.onclick = (e) => false; // to prevent reload


	form.appendChild(username_bar); 
	form.appendChild(name_bar);
	form.appendChild(login_button);

	// main.appendChild(form);
	main.insertBefore(form, main.firstChild);
}

// for level 0 users 
function makeUser(new_name, new_username) { 
	console.log("checkLogin"); 



	fetch("data/users.json")
		.then(response => response.json())
		.then(json => { 
			let last_user = json[json.length-1];
			let next_number = last_user.id+1; 
			console.log(next_number)
			let new_json = { 
				username : new_username, 
				name : new_name,
				id: next_number,
				posts: []
			}
			return new_json;
		})
		.then(new_json => { 
			console.log(new_json);
			// TEST TO SEE IF WE ARE ALLOWED TO MAKE A FETCH INSIDE A FETCH
			// fetch("data/feed.json")
			// 	.then(response => response.json())
			// 	.then(json => {
			// 		console.log(json);
			// 	});

			// yep we are allowed to make a fetch inside a fetch 
			// FROM THE MDN WEBSITE
			var url = 'data/users.json';

			fetch(url, {
			  method: 'POST', // or 'PUT'
			  body: new_json, // data can be `string` or {object}!
			  headers:{
			    'Content-Type': 'application/json'
			  }
			})
			.then(response => console.log('Success:', JSON.stringify(response)))
			.catch(error => console.error('Error:', error));


		});
	// make a JSON object and add it into users.json 
}


// From the beginning 
	// main.appendChild(createElement("div", "", {id : "large-feed"}));
	// const api  = new API();
	// // we can use this single api request multiple times
	// const feed = api.getFeed();
	// feed.then(posts => {
	//     posts.reduce((parent, post) => {
	//         parent.appendChild(createPostTile(post));
	//         return parent;
	//     }, document.getElementById('large-feed'))
	// });
	// // Potential example to upload an image
	// const input = document.querySelector('input[type="file"]');
	// input.addEventListener('change', uploadImage);

	// Get User's feed using (GET /user/feed)


// function im using for login rn 
function login() { 
	let form = createElement("form", "");
	form.classList.add("form-signin");
	// add login elements onto the dom
	let username_bar = document.createElement("input");
	username_bar.id = "username_input";
	username_bar.classList.add("form-control");
	username_bar.placeholder = "Email Address";

	let password_bar = document.createElement("input");
	password_bar.id = "password_input";
	password_bar.classList.add("form-control");
	password_bar.placeholder = "Password";
	// password_bar.innerHTML = "password"; 

	let login_button = createElement("button", "Sign In");
	login_button.classList.add("btn"); 
	login_button.classList.add("btn-primary"); 
	console.log(login_button);
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

function authenticateUser(username, password) { 
	fetch("http://localhost:5000/auth/login", 
	{	headers: { "Content-Type": 'application/json' },
	    method: 'POST',
	    body: JSON.stringify({ username: username, password: password })
	})
	.then(response => response.json())
	.then(json => json.token)
	.then(token => { 
		homePage(token);
	});
}


	// let Adeline follow Sebastian and Victoria 
	// let query = "?username=Sebastian";
	// fetch("http://localhost:5000/user/follow"+query, 
	// {	headers: { "Content-Type": 'application/json', "charset":"utf-8", "Authorization":"Token " + token},
	//     method: 'PUT'
	// })
	// .then(response => response.json())
	// .then(json => { 
	// 	console.log(json);
	// });



// LEVEL 2 ELEMENTS 
let likebutton = createElement("button", "like",
    {class : "btn btn-primary"});
likebutton.addEventListener("click", function (e) { 
    console.log("like this post");
    console.log("inside addEventListener: ", sections[i]);
    // let query = sections[i].id;
    // console.log("id: ", query);
    fetch("http://localhost:5000/post/like"+query, 
    {   headers: { "Content-Type": 'application/json', Authorization: "Token " + token },
        method: 'PUT',
    })
    .then(response => response.json())
    .then(json => json.token)
    .then(token => { 
        console.log(token);
    });
});



//Home function before i separated the event listener
// Based on the feed from a specific user
function homePage(token) {
	current_token = token; 
	console.log(token);
	clearMain();

	// show feed
	fetch("http://localhost:5000/user/feed", 
	{	headers: { "Content-Type": 'application/json', "charset":"utf-8", "Authorization":"Token " + token},
	    method: 'GET'
	})
	.then(response => response.json())
	.then(json => { 
		let list = json.posts;
		console.log(list);
		let sections = list.map(singlePost);
		console.log("section: ", sections);
		// append the array of nodes onto the main section
		for (var i = 0; i < sections.length; i++) { 

			let likebutton = createElement("button", "like",
			    {class : "btn btn-primary"});
			likebutton.addEventListener("click", () => { 
			    console.log("like this post");
			    
			    let current_section = main.lastChild;

				console.log("next: ", current_section);
				// get the user_id of this
				let id = current_section.id;
				console.log("id: ", id);
				// using the username, construct a request
				let query = "?id=" + id;
				fetch("http://localhost:5000/post/like"+query, 
				{   headers: { "Content-Type": 'application/json', Authorization: "Token " + current_token },
				    method: 'PUT',
				})
				.then(response => response.json())
				.then(json => { 
				    console.log(json);
				});


			});
			// outisde of event listener
			sections[i].appendChild(likebutton);




			main.append(sections[i]);
		}



	});
}




/// original upload image function 
// Given an input element of type=file, grab the data uploaded for use
export function uploadImage(event, callback) {
    const [ file ] = event.target.files;
    console.log("uploadImage function");
    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === file.type);
    // bad data, let's walk away
    if (!valid)
        return false;
    // if we get here we have a valid image
    const reader = new FileReader();
    reader.onload = (e) => {
        // do something with the data result
        const dataURL = e.target.result;
        const image = createElement('img', null, { src: dataURL });
        // for preview 
        document.getElementsByTagName("main")[0].appendChild(image);
        // this is what happens after loading 
        return 1;

    };

    // this returns a base64 image
    reader.readAsDataURL(file);

    // The readAsDataURL method is used to read the contents of the specified Blob or File. When the read operation is finished, the readyState becomes DONE, and the loadend is triggered. At that time, the result attribute contains  the data as a data: URL representing the file's data as a base64 encoded string.
}


// opens data/users.json as a list 
function matchUser(username, password) { 
	console.log("this is user: ", username);
	console.log("this is password: ", password);
	console.log("checkLogin"); 
	fetch("data/users.json")
		.then(response => response.json())
		.then(response => { 
			// add elements for login
			usersList = response;
			// console.log(usersList);
			for (var i = 0; i < usersList.length; i++) { 
				console.log(usersList[i]);
				if (usersList[i].username === username && usersList[i].id) { 
					console.log("username match");
					clearMain(); 
					homePage();

				}
			}
		});
		// outputs the content of the text file
}



// original post function that only has images and no acocmpnaying image 
// activate this when users want to post an image 
// Post new content Users can upload and post new content from a modal or seperate page via (POST /post)
// You are only allowed to post if the token is not null
function post() { 
	clearMain();

	// create a form for uploading images 
    let upload_form = createElement("form", "",
    	{id:"upload_form", method:"post", enctype:"multipart/form-data"});

    let upload_image_button = createElement("input", "", 
    	{id: "upload_image_button", type:"submit", value:"Submit", class: "btn btn-primary"}); 
    upload_image_button.onclick = (e) => false; // to prevent reload
    upload_image_button.addEventListener("click", function(e) { 
		console.log("Use upload_image_button instead of select_image to upload the picture");
    });
   
	upload_form.appendChild(upload_image_button); 

    let select_image = createElement("input", "",
    	{type:"file", id:"select_image", name:"new_image", accept:".jpg, .jpeg, .png"});
    console.log("Using callback function");
    select_image.addEventListener("change", (e) => {
    	uploadImage(e, (data) => {
    		// use our API to construct a fetch request using data
    		// construct header 
    		// remove metadata from data 
    		// no meta data such as ‘data:base64;’
    		var re = new RegExp("(data:.*base64,)");
    		let data_part = data.replace(re, ""); 

    		api.newPost("post", "POST", 
    		{
    			accept: "application/json", 
    			Authorization: "Token " + current_token,
    			"Content-Type": "application/json"
    		}, 
    		{ 
				"description_text" : "placeholder",
				"src": data_part
    		});

    	}); 

    });

    upload_form.appendChild(select_image); 


    let image_preview = createElement("img", 
    	{id: "image_preview", src:"#", alt:"Upload Your Image"});
    upload_form.appendChild(image_preview);

    main.appendChild(upload_form);

}














