var btnRegister = document.querySelector('#submit').addEventListener("click",(e)=>{
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;

    fetch('https://localhost:3000/users/login',{
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                "username": username,
                "password": password
            })
        }).then(response =>{
                return response.json();
        }).then(json => {
            if(json.status ==="succes"){
                let feedback = document.querySelector(".feedback");
                feedback.textContent = "register complete";
                feedback.classList.remove('hidden');
            }
        })
});