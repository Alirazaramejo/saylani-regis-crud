
// import { storage, Sref, uploadBytesResumable, getDownloadURL, ref, db, push, set } from './config.js'


// document.addEventListener("DOMContentLoaded", function () {



//     var profileImage = null;

//     //All Reference 


//     const selectCity = document.getElementById("select-city");
//     const selectCourse = document.getElementById("select-course");
//     const nameInput = document.getElementById("nameInput");
//     const fatherNameInput = document.getElementById("fatherNameInput");
//     const emailInput = document.getElementById("emailInput");
//     const phoneInput = document.getElementById("phoneInput");
//     const cnicInput = document.getElementById("cnicInput");
//     const fatherCnicInput = document.getElementById("fatherCnicInput");
//     const dateInput = document.getElementById("dateInput");
//     const selectGender = document.getElementById("select-gender");
//     const addressInput = document.getElementById("addressInput");
//     const lastQualification = document.getElementById("last-qualification");
//     const haveLaptop = document.getElementById("have-laptop");
//     const spanner = document.querySelector(".spanner");
//     const submitBtn = document.querySelector(".submitBtn");


//     const picInput = document.getElementById("picInput");
//     const displayImage = document.getElementById("picInputDiv");

//     const formRegistration = document.getElementById("formRegistration");

//     spanner.style.display = "none"



//     formRegistration.addEventListener(
//         'submit',
//         handleSubmit
//     )


 







//     function handleSubmit(e) {
//         e.preventDefault()
      
//         var data = {

//             city: selectCity.value,
//             course: selectCourse.value,
//             name: nameInput.value,
//             fatherName: fatherNameInput.value,
//             FatherCnic: fatherCnicInput.value,
//             email: emailInput.value,
//             phone: phoneInput.value,
//             cnic: cnicInput.value,
//             dateOfBirth: dateInput.value,
//             gender: selectGender.value,
//             address: addressInput.value,
//             qualification: lastQualification.value,
//             laptopAvailable: haveLaptop.value,
//         }

//         var profileRef = Sref(storage, `profileImages/${profileImage.name}`);
//         var uploadTask = uploadBytesResumable(profileRef, profileImage);
//         uploadTask.on('state_changed',
//             (snapshot) => {
//                 spanner.style.display = "block"
//                 console.log("first observer");
//             },
//             (error) => {
//                 // Handle unsuccessful uploads
//                 console.error("error");
//             },
//             () => {
//                 // Handle successful uploads on complete
//                 // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

//                     var registrationRef = ref(db, 'registrations')
//                     var registetUniqueRef = push(registrationRef)

//                     set(ref(db, `registrations/${registetUniqueRef.key}`), { ...data, profileImage: downloadURL })
//                         .then(res => {
//                             spanner.style.display = "block"


//                             alert('Form Submitted')
//                         })
//                         .catch(err => {
//                             console.error("error", err)
//                         })
//                 });
//             }
//         );


//     }




//     picInput.addEventListener("click", imageShow)
//     function imageShow() {

//         var input = document.createElement('input')
//         input.type = "file"
//         input.click()



//         input.onchange = function (e) {
//             var files = e.target.files
//             var imageReader = new FileReader()

//             profileImage = files[0]

//             imageReader.readAsDataURL(files[0])
//             imageReader.onload = function () {

//                 displayImage.innerHTML = `
//                 <img src=${imageReader.result} alt="profile" class="image"/>
//             `

//             }

//         }

//     }



// })





import { storage, Sref, uploadBytesResumable, getDownloadURL, ref, db, push, set } from './config.js';

document.addEventListener("DOMContentLoaded", function () {
    var profileImage = null;

    // All Reference
    const selectCity = document.getElementById("select-city");
    const selectCourse = document.getElementById("select-course");
    const nameInput = document.getElementById("nameInput");
    const fatherNameInput = document.getElementById("fatherNameInput");
    const emailInput = document.getElementById("emailInput");
    const phoneInput = document.getElementById("phoneInput");
    const cnicInput = document.getElementById("cnicInput");
    const fatherCnicInput = document.getElementById("fatherCnicInput");
    const dateInput = document.getElementById("dateInput");
    const selectGender = document.getElementById("select-gender");
    const addressInput = document.getElementById("addressInput");
    const lastQualification = document.getElementById("last-qualification");
    const haveLaptop = document.getElementById("have-laptop");
    const spanner = document.querySelector(".spanner");
    const submitBtn = document.querySelector(".submitBtn");
    const picInput = document.getElementById("picInput");
    const displayImage = document.getElementById("picInputDiv");
    const formRegistration = document.getElementById("formRegistration");
    const courseList = document.getElementById("courseList");
   

    spanner.style.display = "none";


 
    
    formRegistration.addEventListener('submit', handleSubmit);

    function handleSubmit(e) {
        e.preventDefault();

        if (validateForm()) {
            var data = {
                city: selectCity.value,
                course: selectCourse.value,
                name: nameInput.value,
                fatherName: fatherNameInput.value,
                FatherCnic: fatherCnicInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                cnic: cnicInput.value,
                dateOfBirth: dateInput.value,
                gender: selectGender.value,
                address: addressInput.value,
                qualification: lastQualification.value,
                laptopAvailable: haveLaptop.value,
            };

            var profileRef = Sref(storage, `profileImages/${profileImage.name}`);
            var uploadTask = uploadBytesResumable(profileRef, profileImage);
            uploadTask.on('state_changed',
                (snapshot) => {
                    spanner.style.display = "block";
                    console.log("first observer");
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.error("error", error);
                    alert("Error uploading profile image");
                },
                () => {
                    // Handle successful uploads on complete
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        var registrationRef = ref(db, 'registrations');
                        var registetUniqueRef = push(registrationRef);

                        set(ref(db, `registrations/${registetUniqueRef.key}`), { ...data, profileImage: downloadURL })
                            .then(() => {
                                spanner.style.display = "none";
                                alert('Form Submitted');
                            })
                            .catch((err) => {
                                console.error("error", err);
                                alert("Error submitting form");
                            });
                    });
                }
            );
        }
    }

    function validateForm() {
        const requiredFields = ['nameInput', 'fatherNameInput', 'emailInput', 'phoneInput', 'cnicInput', 'dateInput', 'addressInput', 'last-qualification'];

        for (const fieldId of requiredFields) {
            const inputField = document.getElementById(fieldId);
            if (!inputField.value.trim()) {
                alert(`Please enter ${inputField.placeholder}`);
                return false;
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailInputValue = emailInput.value.trim();
        if (!emailRegex.test(emailInputValue)) {
            alert('Please enter a valid email address');
            return false;
        }

        const dateOfBirthInput = document.getElementById('dateInput');
        const dateOfBirthValue = dateOfBirthInput.value.trim();
        const dateOfBirthRegex = /^\d{4}-\d{2}-\d{2}$/; // Modify the regex based on your date format
        if (!dateOfBirthRegex.test(dateOfBirthValue)) {
            alert('Please enter a valid Date of Birth (YYYY-MM-DD)');
            return false;
        }

        const cnicInputValue = cnicInput.value.trim();
        const cnicRegex = /^\d{13}$/; // CNIC must be 13 digits
        if (!cnicRegex.test(cnicInputValue)) {
            alert('Please enter a valid 13-digit CNIC');
            return false;
        }

        const phoneInputValue = phoneInput.value.trim();
        const phoneRegex = /^03\d{9}$/; // Phone number must start with "03" and be 11 digits
        if (!phoneRegex.test(phoneInputValue)) {
            alert('Please enter a valid 11-digit phone number starting with 03');
            return false;
        }

        return true;
    }

    function imageShow() {
        var input = document.createElement('input');
        input.type = "file";
        input.click();
        
        input.onchange = function (e) {
            var files = e.target.files;
            var imageReader = new FileReader();

            if (files.length > 0) {
                profileImage = files[0];
                imageReader.readAsDataURL(files[0]);
                imageReader.onload = function () {
                    displayImage.innerHTML = `
                    <img src=${imageReader.result} alt="profile" class="image"/>
                    `;
                  };
              }
          };
      }
      picInput.addEventListener("click", imageShow);




      



      
   
        window.downloadIdCard = downloadIdCard;
});
