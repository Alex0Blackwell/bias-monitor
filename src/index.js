import axios from "axios";
const api = 'https://httpbin.org/ip';
const button = document.getElementById('button');
const text = document.getElementById('text');

const apiRequest = async () => {
    try {
        const response = await axios.get(api);
        return response.data.origin;
    } catch (e) {
        console.log(e);
    }
    return "Error";
}

const handleButtonClick = async e => {
    e.preventDefault();
    const origin = await apiRequest();
    text.innerHTML = origin;
}

button.addEventListener('click', e => handleButtonClick(e));


