const dropZone = document.querySelector('.drop-zone');
const browseBtn = document.querySelector('.browseBtn');
const fileInput = document.querySelector('#fileInput');


const bgProgress = document.querySelector(".bg-progress");
const PercentChange = document.querySelector("#percent");
const ProgressBar = document.querySelector(".progress-bar");
const ProgressContainer = document.querySelector(".progress-container");
const sharingContainer = document.querySelector(".sharing-container");
const fileUrl = document.querySelector("#fileUrl");
const copyBtn = document.querySelector("#copyBtn");


const emailForm = document.querySelector("#emailForm");



    const form = document.querySelector('form');
		const toField = document.getElementById('to');
		const subjectField = document.getElementById('subject');
		const bodyField = document.getElementById('body');



const uploadurl = 'https://d8728927-d42c-4f66-bec9-5c2fa2d9abe5.mock.pstmn.io/dard';


dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (!dropZone.classList.contains('dragged')) {
        dropZone.classList.add('dragged');
    }
}); 

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragged');
});

dropZone.addEventListener('drop', (e) => {        
    e.preventDefault();
    dropZone.classList.remove('dragged');
    const files = e.dataTransfer.files;
    if (files.length) {
        fileInput.files = files;
        uploadFile();
    }
});

browseBtn.addEventListener('click', () => {   
    fileInput.click();
}); 

fileInput.addEventListener('change', () => {
    uploadFile();
});

copyBtn.addEventListener('click', () => {
    fileUrl.select();
    document.execCommand('copy');
    // alert('Link copied to clipboard');
});


 async function uploadFile() {
    ProgressContainer.style.display = "block";  
    const files = fileInput.files;
    const formData = new FormData();
    formData.append('myfile', files[0]);
     const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // console.log(xhr.response);
            showLink(JSON.parse(xhr.response));
        }
    }
    xhr.upload.onprogress = updateProgress;
    xhr.open('POST', uploadurl);
    xhr.send(formData);

   
//   const response = await fetch(uploadurl,{method: "POST"});
//   const jsonData = await response.json();
//   console.log(jsonData);
}

const updateProgress = (e) => {

    // console.log(e);
    sharingContainer.style.display = "none";
    const percent = (Math.round((e.loaded / e.total) * 100));
    // console.log(percent);
    bgProgress.style.width = `${percent}%`;
    PercentChange.innerText = percent;
    ProgressBar.style.transform = `scaleX(${percent/100})`;
}

const showLink = (link) => {
    console.log(link.link);
    ProgressContainer.style.display = "none";
    fileUrl.value = link.link;
    sharingContainer.style.display = "block";
}

emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Submit Form"); 
});




//Client Side send email

// function sendEmail() {
//         var sender = document.getElementById("sender").value;
//         var reciver = document.getElementById("reciver").value;
//         var body = "";



// 		// <a href=”mailto:piotr@mailtrap.io,john@mailtrap.io,kate@mailtrap.io?subject=Give%20me%20all%20your%20bitcoins&body=Here%20are%20my%20parents'%20credit%20card%20numbers%3A%0D%0A%0D%0ACheers%2C%0D%0AHappy%20Customer”>I want free Bitcoins</a>

//         if(sender!="" && reciver!=""){

//         var mailtoLink =`mailto:${reciver}?subject=JoyShare File Download Link&body=Here we provide you the download link for your file from ${sender}: ${fileUrl.value}`;

//         window.location.href = mailtoLink;

//         }
//       }


// Server side send email

function sendEmail() {
        var sender = document.getElementById("sender").value;
        var reciver = document.getElementById("reciver").value;

         var params = {
    sender: sender,
    reciver: reciver,
    message: `Here we provide you the download link for your file from ${sender}: ${fileUrl.value}`,
  };

  const serviceID = "service_qgbpwgm";
  const templateID = "template_wbdqs7o";


   if(sender!="" && reciver!=""){

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        console.log(res);
        alert("Your message sent successfully!!")

    })
    .catch(err=>alert(err));

        }

      }