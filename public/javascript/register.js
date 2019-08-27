var btnRegister = document.querySelector('#submit').addEventListener("click",(e)=>{
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    let date = document.querySelector('#date').value;

    fetch('/users/signup',{
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                "username": username,
                "password": password,
                "date" : date
                
            })
        }).then(response =>{
                return response.json();
        }).then(json => {
            console.log(json);
            if(json.status ==="succes"){
                let feedback = document.querySelector(".feedback");
                feedback.textContent = "register complete";
                feedback.classList.remove('hidden');

                let token = json.data.token;
                localStorage.setItem("token",token);
                localStorage.setItem('birthday', json.data.birthday.toString().substr(4));
                window.location.href = "/chat";
            }
        })
});