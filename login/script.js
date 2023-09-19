

const form = document.getElementById('inputs');

var totalUser = [];    // empty array to store users


// check if current user already exist or not
if(localStorage.getItem('currUser')){
    document.getElementById('message').style.display = 'inline';
    document.getElementById('message').setAttribute('class', 'green')
    document.getElementById('message').innerText = 'Login Successfull';
}


// add event-listener when user click on submit button

form.addEventListener('submit', (event)=>{
    event.preventDefault();  // used to prevent default action to happen

    // to get email password data
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    // if no email password entered
    if(!email || !password){
        document.getElementById('message').style.display='inline';
        document.getElementById('message').setAttribute('class','red')
        document.getElementById('message').innerText='Error :All Fields Mandatory.'
        return;
    }   

    let flag = false;
    let currUser;

    // to get detail from local storage wether user in new or already exist
    if(localStorage.getItem('totalUser')){
        totalUser = JSON.parse(localStorage.getItem('totalUser'));


        totalUser.forEach((user)=>{
            if(user.email == email){
                flag = true;
                user.token = generateToken();
                currUser = user;
                localStorage.setItem('currUser', JSON.stringify(user));
            }
        })

    }

    // if user enters wrong password
    if(flag == true && password != currUser.password){
        document.getElementById('message').style.display = 'inline';
        document.getElementById('message').setAttribute('class','red')
        document.getElementById('message').innerText = 'Error : Wrong Password.'
        return;
    }
    
    //if user is new or doesnt exist in user array
    if(flag == false){
        document.getElementById('message').style.display = 'inline';
        document.getElementById('message').setAttribute('class','red')
        document.getElementById('message').innerText='Error : User does not Exist.'
        return;
    }

    // after successful login
    document.getElementById('message').style.display = 'inline';
    document.getElementById('message').setAttribute('class','green')
    document.getElementById('message').innerText='Login Successfully';

    form.reset();   // form get reset once submit and redirect to main page

    setTimeout(()=>{  
        location.href = '../shop/index.html';
     },1500);


})

//To generate token

function generateToken(){
    let token = '';
    for (let i = 0; i < 16; i++) {
      token += String.fromCharCode(Math.floor(Math.random() * 256));
    }
    
    return btoa(token);
}