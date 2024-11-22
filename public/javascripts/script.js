import { STATES, NATIONAL_LABS, MSI_CATEGORIES, MSIPP_PROGRAMS, CLASSIFICATIONS} from "./constants.js";
import { labelFormatting } from "./dashboard.js";


const us_colleges = 'http://universities.hipolabs.com/search?country=united+states'

fetch(us_colleges)
    .then(response => response.json())
    .then(data => {
        // console.log(data);

        const institution_data = JSON.parse(JSON.stringify(data));

        const institutionNames = institution_data.map(institution => institution.name);

        // console.log(institutionNames)

        let textToSearch = ""

        let pattern = textToSearch == "" ? "" : textToSearch+"+";

        let flags = "gi";

        let regex = new RegExp(pattern, flags)

        let institutionSearch = institutionNames.filter(name => name.match(regex))
        
        // console.table(institutionSearch)


        const searchInput = document.getElementById('institution');
        const searchResults = document.getElementById('insSearchResults');

        searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        searchResults.style.display = "block";
        searchResultsBorders(searchResults.style.display)
        searchResults.innerHTML = '';

        institutionSearch.forEach(item => {
            if (item.toLowerCase().includes(query)) {
            const li = document.createElement('li');
            li.className = "list-group-item";
            li.textContent = item;
            li.addEventListener('click', () => {
                // Handle the clicked item, e.g., open a new page
                searchInput.value = li.textContent
                searchResults.style.display = "none";
                searchResultsBorders(searchResults.style.display)

            });
            searchResults.appendChild(li);
            }
        });
        });

        let searchResultsBorders = (display) => {
            if(display == 'block'){
                searchResults.style.border = '1px solid rgba(128, 128, 128, 10%)'
            } else {
                searchResults.style.border = 'none';
            }
        }

        searchInput.addEventListener('blur', () => {
            if (!searchResults.matches(':hover')) {
                searchResults.style.display = 'none';
            }
        })

        searchInput.addEventListener('focus', () => {
            searchResults.style.display = 'block';
        })

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

//Search for majors
    fetch('/majors')
    .then(response => response.json())
    .then(data => {
        // console.log(data);

        const major_data = JSON.parse(JSON.stringify(data));

        const majorNames = major_data.map(obj => labelFormatting(obj.major));

        // console.log(majorNames);

        let textToSearch = "";

        let pattern = textToSearch == "" ? "" : textToSearch+"+";

        let flags = "gi";

        let regex = new RegExp(pattern, flags)

        let majorSearch = majorNames.filter(name => name.match(regex))
        
        // console.table(majorSearch)


        const searchInput = document.getElementById('major');
        const searchResults = document.getElementById('majSearchResults');

        searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        searchResults.style.display = "block";
        searchResultsBorders(searchResults.style.display)
        searchResults.innerHTML = '';

        majorSearch.forEach(item => {
            if (item.toLowerCase().includes(query)) {
            const li = document.createElement('li');
            li.className = "list-group-item";
            li.textContent = item;
            li.addEventListener('click', () => {
                // Handle the clicked item, e.g., open a new page
                searchInput.value = li.textContent
                searchResults.style.display = "none";
                searchResultsBorders(searchResults.style.display)

            });
            searchResults.appendChild(li);
            }
        });
        });

        let searchResultsBorders = (display) => {
            if(display == 'block'){
                searchResults.style.border = '1px solid rgba(128, 128, 128, 10%)'
            } else {
                searchResults.style.border = 'none';
            }
        }

        searchInput.addEventListener('blur', () => {
            if (!searchResults.matches(':hover')) {
                searchResults.style.display = 'none';
            }
        })

        searchInput.addEventListener('focus', () => {
            searchResults.style.display = 'block';
        })

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


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

const conditionalOptions = () => {
    
    const classificationElem = document.getElementById("classification");
    const msippProgElem = document.getElementById("msipp");
    let programList = [...MSIPP_PROGRAMS];
    let classificationList = [...CLASSIFICATIONS]
    const moddedPrograms = programList.filter(obj => !['Graduate Fellowship', 'Postdoctoral Research'].includes(obj.name))
    const moddedClassisfication = classificationList.filter(obj => "Graduate".includes(obj.name));
    let modifiedProgramList = programList;
    let modifiedClassificationList = classificationList;
    let programTemp;
    let classTemp;
    
    
    classificationElem.addEventListener('change', () => {
        if (msippProgElem.value != '') {
            programTemp = msippProgElem.value;
        }

        if (classificationElem.value != ''){
            classTemp = classificationElem.value;
        }

        modifiedProgramList = (classificationElem.value == 'Graduate') ? programList : moddedPrograms;
        // console.table(modifiedProgramList)
        msippProgElem.innerHTML = '<option selected value="" aria-readonly="true" disabled>What is your MSIPP Program?</option>'; //Clears the options values
        
        
        selectOptions(modifiedProgramList, "msipp");
        
        if (programTemp != '' && programTemp != undefined) {
            msippProgElem.value = programTemp;
        }

        if (classTemp != '' && classTemp != undefined) {
            classificationElem.value = classTemp;
        }
        
    })
    
    
    msippProgElem.addEventListener('change', () => {

        if (msippProgElem.value != '') {
            programTemp = msippProgElem.value;
        }

        if (classificationElem.value != ''){
            classTemp = classificationElem.value;
        }

        modifiedClassificationList = (msippProgElem.value == 'Graduate Fellowship' || msippProgElem.value == 'Postdoctoral Research') ? moddedClassisfication : classificationList;
        // console.table(modifiedClassificationList)
        classificationElem.innerHTML = '<option selected value="" aria-readonly="true" disabled>What is your Classification?</option>';
        
        // if (msippProgElem.value == 'Graduate Fellowship' || msippProgElem.value == 'Postdoctoral Research') {
        //     classificationElem.value = 'Graduate';
        // } else {
        //     classificationElem.value = temp
        // }
        
        
        selectOptions(modifiedClassificationList, "classification");
        
        if (programTemp != '' && programTemp != undefined) {
            msippProgElem.value = programTemp;
        }

        if (classTemp != '' && classTemp != undefined) {
            classificationElem.value = classTemp;
        }
        
    })
    
    selectOptions(modifiedClassificationList, "classification");
    selectOptions(modifiedProgramList, "msipp");
}

conditionalOptions();



// Get the current year
const currentYear = new Date().getFullYear();

// Create a range of years, e.g., from 2014 to the current year
const startYear = 2014;
const endYear = currentYear;

// Get the year selector element
const yearSelector = document.getElementById('msippYear');

// Populate the year selector with options
for (let year = endYear; year >= startYear; year--) {
  const option = document.createElement('option');
  option.value = year;
  option.text = year;
  yearSelector.appendChild(option);
}


/**
 * Grabbing the HTML Form data and transfering to the backend to be processed in node js
 */


const forms = document.querySelectorAll('.needs-validation')


if (forms) {
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', e => {
            if(!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                
            } else {
                e.preventDefault()
                const formData = new FormData(form);
                // console.log(formData);
                
                const urlEncoded = new URLSearchParams(formData).toString();
                console.table(urlEncoded)

                fetch('/submit', {
                    method: "POST", 
                    body: urlEncoded,
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
            
                    }
                })

                window.location.assign('/success');
            }
            
            form.classList.add('was-validated');

            
            
        }, false)

    });
}




