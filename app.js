const dropZone = document.querySelector(".drop-zone");
const BrowseBtn = document.querySelector(".browseBtn");
const FileInput = document.querySelector(".file-Input");


const bgProgress = document.querySelector(".bg-progress");
const PercentChange = document.querySelector("#percent");
const ProgressBar = document.querySelector(".progress-bar");
const ProgressContainer = document.querySelector(".progress-container");


const HostUrl = "https://a5c39bec-4267-4ced-9e34-06e8fde76cbf.mock.pstmn.io/";
const uploadUrl = `${HostUrl}api/files`;


BrowseBtn.addEventListener("click", () => {
    FileInput.click();
});
FileInput.addEventListener("change", () => {
    uploadFiles();
});
dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (!dropZone.classList.contains("dragged")) {
        dropZone.classList.add("dragged");
    }
})
dropZone.addEventListener("dragleave", (e) => {
    dropZone.classList.remove("dragged");
})
dropZone.addEventListener("drop", (e) => {
    dropZone.classList.remove("dragged");
    e.preventDefault();
    // console.log(e.dataTransfer.files);
    const file = e.dataTransfer.files;
    console.log(file);
    if (file.length) {
        FileInput.files = file;
    }
    uploadFiles();

})
const uploadFiles = () => {
    ProgressContainer.style.display = "block";
    const uploadFiles = FileInput.files[0];
    //console.log(FileInput.files[0]);
    const formData = new FormData();
    formData.append("myfile", uploadFiles);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response);
        }
    }
    xhr.upload.onprogress = updateProgress;
    xhr.open('POST', uploadUrl);
    xhr.send(formData);
}

const updateProgress = (e) => {
    const percent = (Math.round((e.loaded / e.total) * 100));
    console.log(percent);
    bgProgress.style.width = `${percent}%`;
    PercentChange.innerText = percent;
    ProgressBar.style.transform = `scaleX(${percent/100})`;
}