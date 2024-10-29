import { STATES, NATIONAL_LABS, MSI_CATEGORIES, MSIPP_PROGRAMS } from "./constants.js";


window.addEventListener('DOMContentLoaded', (event) => {
    let institutions = document.getElementById('institution');
    let majors = document.getElementById('major');

    const baseUrl = 'http://localhost:3000/getinfo' //!Change according to host

    if(institutions && major) { 
        //Make sure that the elements have loaded, prevents errors

        const getInfo = async () => {
            const res = await fetch(baseUrl, {
                method: 'GET'
            })

            const data = await res.json()
            institutionSearch = Object.values(data.institutionOptions);
            majorSearch = Object.values(data.majorOptions);

            dataListOptions(institutionSearch, "insNames");
            dataListOptions(majorSearch, "majorList");
        }

        getInfo();
    }
})

/**
 * 
 * @param {Array} arrayList 
 * @param {String} elementId 
 */

let dataListOptions = (arrayList, elementId) => {
    const listOfItems = [...arrayList];
    const id = elementId;

    for(let i = 0; i < arrayList.length; i++){
        let options = document.getElementById("option");
        options.value = listOfItems[i];
        let element = document.getElementById(id);
        element.appendChild(options);
    }
}

/**
 * 
 * @param {Array} arrayList 
 * @param {String} elementId 
 */

let selectOptions = (arrayList, elementId) => {
    const listOfItems = [...arrayList];
    const id = elementId;

    for(let i = 0; i < listOfItems.length; i++){
        let options = document.createElement("option");
        if(listOfItems[i].hasOwnProperty("abbreviation") === true){
            if(listOfItems[i] != ''){
                options.text = `${listOfItems[i].name}  (${listOfItems[i].abbreviation})`;
            } else {
                options.text = `${listOfItems[i].name}`
            }
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
selectOptions(NATIONAL_LABS, "lab");
selectOptions(MSI_CATEGORIES, "msiType");
selectOptions(MSI_CATEGORIES, "msiType2");
selectOptions(MSIPP_PROGRAMS, "msipp");


/**
 * Grabbing the HTML Form data and transfering to the backend to be processed in node js
 */

const form = document.querySelector('form');


if (form) {
    form.addEventListener('submit', (e) => {
    e.preventDefault(); //Prevents HTML From Submitting the Form

        const formData = new FormData(form);
        //  console.log(formData);
        const urlEncoded = new URLSearchParams(formData).toString();
        // console.log(urlEncoded)
    
        //TODO: Add a validity checking for the year.
        //! Change according to host
        fetch('http://localhost:3000/submit', {
            method: "POST", 
            body: urlEncoded,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
    
            }
        })
    
        window.location.assign('/success'); //Redirects user to the thank you page
    })

}




