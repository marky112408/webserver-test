
console.log('javascript loaded');
const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (e) => {
    document.querySelector('.message').innerHTML = "";
    const address = document.querySelector('#address').value;
    e.preventDefault();
    fetch('http://localhost:3000/weather?address='+address).then((response) => {
        response.json().then((data) => {
            if(data.error){
                document.querySelector('.message').innerHTML = 'Invalid address';
            }else{
                document.querySelector('.message').innerHTML = data.result.summary;
                console.log(data.result.summary);
            }

        });
    })
});