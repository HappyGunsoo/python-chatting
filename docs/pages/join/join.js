const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Variable ------------------
const API = 'http://localhost:8000';

// Event ---------------------
function setBtnEvt() {
    console.log('.btn-join')
    $('.btn-join').addEventListener('click', function() {
        alert(1)
    })
}

// Function ------------------

// Init ----------------------
async function init() {
    setBtnEvt()
}

init();