
// Primus LIVE
primus = Primus.connect("http://localhost:3000", {
    reconnect:{
        max: Infinity,
        min: 500,
        retries: 10
    }
});

primus.on('data', data=>{
    addNewMessage(data.data);
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

                "text": message
            })
        }).then(response =>{
                return response.json();
        }).then(json => {
            primus.write({
                "action": "sendedMessage",
                "data": json
            });
        });
});

const addNewMessage =(json) => {
    const chatmessage = document.querySelector("#chatwindow");
    const holder = document.createElement('DIV');

    const oData = `
    <div>
        <p>${json.data.text}</p>
        <pre>${json.data.user}</pre>
    </div>`;

    holder.innerHTML = oData;
    chatmessage.append(holder);
}

const getMessages = async () => {
    const result = await fetch('http://localhost:3000/api/v1/chat',{
        method: "get",
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });

    if(result.status === 200){
        data = await result.json();

        data.data.chat.map(x=>{
            console.log(x);
            addNewMessage({data:x});
        });
    }
};