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
const toast = document.querySelector(".toast");


const emailForm = document.querySelector("#emailForm");

const form = document.querySelector('form');    
const toField = document.getElementById('to');
const subjectField = document.getElementById('subject');
const bodyField = document.getElementById('body');

const maxFileSize = 100*1024*1024; // 100MB






window.addEventListener("load", function () {
          document.body.addEventListener("touchmove", handleTouchMove, {
            passive: false,
          });
        });

        function handleTouchMove(event) {
          if (event.cancelable) {
            event.preventDefault();
          }
        }




let textInput1 = document.getElementById("sender");
      let textInput2 = document.getElementById("reciver");
      let scrollTop = 0;

      textInput1.addEventListener("focus", function () {
        // store the current scroll position
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // set the body to fixed position and adjust the top position
        document.body.style.position = "relative";
        document.body.style.top = -scrollTop + "px";
      });

      textInput2.addEventListener("focus", function () {
        // store the current scroll position
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // set the body to fixed position and adjust the top position
        document.body.style.position = "relative";
        document.body.style.top = -scrollTop + "px";
      });

      textInput1.addEventListener("blur", function () {
        // restore the original scroll position
        document.body.style.position = "relative";
        document.body.style.top = "";
        window.scrollTo(0, scrollTop);
      });
      textInput2.addEventListener("blur", function () {
        // restore the original scroll position
        document.body.style.position = "relative";
        document.body.style.top = "";
        window.scrollTo(0, scrollTop);
      });





// https://d8728927-d42c-4f66-bec9-5c2fa2d9abe5.mock.pstmn.io/dard

// const uploadurl = 'http://localhost:5000/api/files';
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
    window.getSelection().removeAllRanges();
    showtoast('Link copied to clipboard');
});


 async function uploadFile() {

    if( fileInput.files.length > 1 ) {
        fileInput.value="";
        showtoast("Please Upload only one File at a time","red");
        ProgressContainer.style.display = "none";
        // return;
    }


    if( fileInput.files[0].size > maxFileSize ) {
        fileInput.value="";
        showtoast("Please Upload file less than 100MB","red");
        ProgressContainer.style.display = "none";
        // return;
    }


    ProgressContainer.style.display = "block";  
    const files = fileInput.files;
    const formData = new FormData();
    formData.append('myfile', files[0]);
     const xhr = new XMLHttpRequest();

     xhr.upload.onerror = () => {
    ProgressContainer.style.display = "none";
    fileInput.value = "";
    showtoast(`Error in upload: ${xhr.statusText}`,"red");
};

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // console.log(xhr.response);
            showtoast("File Uploaded Successfully");
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
    console.log(link);
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
    link: `${fileUrl.value}`,
  };

  const serviceID = "service_qgbpwgm";
  const templateID = "template_wbdqs7o";


   if(sender!="" && reciver!=""){

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        console.log(res);
        showtoast("Your message sent successfully");

    })
    .catch(err=>showtoast("Something went wrong","red"));

        }

      }


let toastTimer;
const showtoast = (message,col) => {
    toast.style.transform = "translatex(0)";
    toast.innerText = message;
    if(col=="red"){
        toast.style.background="red";
    }else{
        toast.style.background="#03a9f4";
    }
    clearTimeout(toastTimer);
    toastTimer =setTimeout(() => {
         toast.style.transform = "translatex(700px)";
    }, 3000);
    
}