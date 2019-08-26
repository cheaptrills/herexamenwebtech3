
// Primus LIVE
primus = Primus.connect("http://localhost:3000/", {
    reconnect:{
        max: Infinity,
        min: 500,
        retries: 10
    }
});

var btnLogin = document.querySelector('#submit').addEventListener("click",(e)=>{
    let message = document.querySelector('#chat').value;

    fetch('http://localhost:3000/api/v1/chat',{
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({

                "message": message
            })
        }).then(response =>{
                return response.json();
        })
});

const getMessages = async () => {
    const result = await fetch('http://localhost:3000/api/v1/chat',{
        method: "get",
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });

    if(result.status === 200){
        data = await result.json();
        
    }
};