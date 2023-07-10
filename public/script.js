import { STATES, NATIONALLABS, MSI_CATEGORIES } from "./constants.js";

let selectOptions = (arrayList, elementId) => {
    const listOfItems = [...arrayList];
    const id = elementId;

    for(let i = 0; i < listOfItems.length; i++){
        let options = document.createElement("option");
        if(listOfItems[i].hasOwnProperty("abbreviation") === true){
            options.text = `${listOfItems[i].name}  (${listOfItems[i].abbreviation})`;
            options.value = listOfItems[i].abbreviation;
        } else {
            options.text = listOfItems[i].name;
            options.value = listOfItems[i].name;
        }

        let element = document.getElementById(id);
        element.appendChild(options);
    }
}

selectOptions(STATES, "resState");
selectOptions(STATES, "insState");
selectOptions(NATIONALLABS, "lab");
selectOptions(MSI_CATEGORIES, "msiType");
selectOptions(MSI_CATEGORIES, "msiType2");



/**
 * Grabbing the HTML Form data and transfering to the backend to be processed in node js
 */

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {

    const formData = new FormData(form);

    const urlEncoded = new URLSearchParams(formData).toString();

    fetch('http://localhost:3000/submit', {
        method: "POST", 
        body: urlEncoded,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',

        }
    })

    window.open('http://localhost:3000/success', '_self');
})
