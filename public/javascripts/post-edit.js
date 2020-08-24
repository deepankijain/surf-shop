    // find post edit form
    let postEditForm = document.getElementById("postEditForm");
    // add submit event listener to post edit form
    postEditForm.addEventListener('submit', event => {
        //finds length of current images selected to be uploaded
        let imageUploads = document.getElementById("imageUpload").files.length;
        // finds length of current already uploaded images
        let existingImgs = document.querySelectorAll(".imageDeleteCheckbox").length;
        // finds length of currently checked images to be deleted
        let imgDeletions = document.querySelectorAll(".imageDeleteCheckbox:checked").length;
        // figure out whether to submit the form or not
        let newTotal = existingImgs - imgDeletions + imageUploads;
        if (newTotal > 4) {
            event.preventDefault();
            let removalAmt = newTotal - 4;
            alert(`You need to remove atleast ${removalAmt} (more) image${removalAmt === 1 ? '' : 's'}!`)
        }
    })