function login(){
    event.preventDefault();
    var user = document.querySelector('#user').value,
        password = document.querySelector('#pass').value;

    fetch('/login', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({user, password})
    })
    .then(resp => resp.json())
    .then(resp => {
        if(resp.token){
            localStorage['token'] = resp.token;
            window.location='home.html';                    
        }
        else
        {
            //Não implementado! deve-se enviar ao usuário uma msg de erro
            console.log('Erro de atutenticação');
            return;
        }
    })
    .catch(() => {
        console.error('Error!');
    })
}
    