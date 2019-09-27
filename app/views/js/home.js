function createUser(event){
    event.preventDefault();
    var user = document.querySelector('#user').value,
        password = document.querySelector('#pass').value;

    fetch('/user', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `JWT ${localStorage['token']}`
        },
        body:JSON.stringify({user, password})
    })
        .then(resp => resp.json())
        .then(() => {location.reload()})
        .catch(() => {
            console.error('Error!');
        })
}

function removeUser(id){  
    fetch(`/remove/${id}`, {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `JWT ${localStorage['token']}`
        }
    })
    .then(resp => resp.json())
    .then(() => {location.reload()})
    .catch(() => {
        console.error('Error!');
    })
}

function logout(){
    event.preventDefault();
    localStorage['token'] = '';
    window.location='login.html'; 
}

window.onload = function(){            
    //Não implementado! deve-se fazer algum mecanismo de validação de acesso as telas
    if(localStorage['token'] == '')
        window.location='login.html'; 

    fetch('/user', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `JWT ${localStorage['token']}`
        }                
    })
    .then(function(response){
        response.json().then(function(data){
            const itens = data.map(item => '<div class="item"><li"><img src="https://pluralsight.imgix.net/paths/path-icons/nodejs-601628d09d.png?w=70">'+                        
                item.user+'</li>'+
            `<button class="close" onclick=removeUser('${item._id}')>x</button></div>`);                    
            document.getElementById("list").innerHTML = '<ul class="lista">'+itens.join('')+'</ul>';
        });
    })       
    .catch(() => {
        console.error('Error!');
    }) 
}