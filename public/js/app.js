const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msg3 = document.querySelector('#msg3')
const msg4 = document.querySelector('#msg4')
const msg5 = document.querySelector('#msg5')

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();
    const location = search.value;    

    msg1.textContent='Loading...';
    msg2.textContent='';
    msg3.textContent='';
    msg4.textContent='';
    msg5.textContent='';

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                // console.log(data.error);
                msg1.textContent=data.error;
            } else {
                // console.log(data);
                msg1.textContent='Location: ' + data.location;
                msg2.textContent='Latitude: ' + data.latitude;
                msg3.textContent='Longitude: ' + data.longitude;
                msg4.textContent='Temperature: ' + data.temperature;
                msg5.textContent='Summary: ' + data.Summary;
            }
        })
    })
})