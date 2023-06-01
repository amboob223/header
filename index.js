const button = document.getElementById("btn");
const namee = document.getElementById("name");
const image = document.getElementById("image");

button.addEventListener("click", async (event)=>{
    event.preventDefault()
        try {
            const body = new FormData() // we use the form data to get the mix of files

        body.append("name",namee.value),
        body.append("image",image.files[0])// files gives an arry of the files with the file data and we hget the first element

            //once we make the body need response to fetch the server and send the body 
        const response = await fetch("http://localhost:5000/main",
        {
            method:"POST",
            body:body// now we could have did headers:{"CONTENT_TYPE/"multipart/form-data"}
        })
 
        //now wipe the form clean
            namee.value = "" // because input element dont have innerhtml property doest 
        
        console.log("HH")
        } catch (error) {
            console.log(error)
        }

});
