import {
    query, db, ref, equalTo, get, orderByChild
} from './config.js'

// window.onload = function () {
//     var user = JSON.parse(localStorage.getItem('user'))
//     if (user === null) {
//         window.location.pathname = '/pages/login'
//     }
// }


var cnicInput = document.getElementById('cnicInput');
var downloadIdCardForm = document.getElementById('download-form');

    downloadIdCardForm.addEventListener(
        'submit',
        handleDownload
    )

function handleDownload(e) {
    e.preventDefault()


    var cnic = cnicInput.value;


    var registrationRef = ref(db, 'registrations')
    var registration = query(registrationRef, orderByChild('cnic'), equalTo(cnic))

    get(registration)
        .then((snapshot) => {
            var info = Object.values(snapshot.val())[0]
            localStorage.setItem("stdCardData",JSON.stringify(info))
            // renderCard(info)
        })
        .catch((error) => {
            console.error("Error", error)
        })
}

const stdName = document.getElementById('stdName')
const stdCourse = document.getElementById('stdCourse')
const stdCardName = document.getElementById('stdCardName')
const stdFatherName = document.getElementById("father-name-input")
const stdNic = document.getElementById('stdNic')
const STDCourse = document.getElementById('STDCourse')
const stdImg = document.getElementById('stdImg')

let stdCardData = localStorage.getItem('stdCardData')
stdCardData = JSON.parse(stdCardData)
console.log(stdCardData)


stdName.innerHTML = stdCardData.name
stdCourse.innerHTML = stdCardData.course
stdCardName.value = stdCardData.name
stdFatherName.value = stdCardData.fatherName
stdNic.value = stdCardData.cnic
STDCourse.value = stdCardData.course
stdImg.src = stdCardData.profileImage

let div = document.querySelector("#mainForms");
let btn = document.querySelector("#downloadCardBtn");
btn.addEventListener('click', () => {

    html2pdf().from(div).save()
})