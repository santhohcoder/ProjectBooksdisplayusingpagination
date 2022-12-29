
const baseurl='https://www.anapioficeandfire.com/api/books';

const fetchdatafromurl= async()=>{
    try{
    let response= await fetch(`${baseurl}`);
    let data= await response.json();
    console.log(data[3]);
     await displaydata(data[3]);
    }
    catch(err){
        console.error(err);
        throw new Error(err);
    }

}
const displaycharacters=async(data,characternumber)=>{
try{
       let  response=await fetch(data.characters[characternumber]);
        let character=await response.json();
        return(character.name);
}
catch(err){
    console.error(err);
    throw new Error(err);
}
};
const displaydata=async(data)=>{
    console.log('enter');
    try{
        console.log(data.url);
    let bookdetails="";
    bookdetails+=`
    <div class="shadow border-1 rounded p-3 m-2 d-flex flex-column justify-content-start align-items-start container detailsbox" id="">
    <div class="m-2 fs-5 ">
       <b> <label for="">Name of the Book:</label></b>
        <label for="" id="bookname">${data.name}</label>
    </div>
    <div class="m-2 fs-5 ">
       <b> <label for="">ISBN code of the book:</label></b>
        <label for="" id="isbn"> ${data.isbn}</label>
    </div>
    <div class="m-2 fs-5 ">
       <b> <label for="">Author of the book:</label></b>
        <label for="" id="author"> ${data.authors[0]}</label>
    </div>
    <div class="m-2 fs-5 ">
        <b><label for="">Publisher Name:</label></b>
        <label for="" id="pubname"> ${data.publisher}</label>
    </div>
    <div class="m-2 fs-5 ">
        <b><label for="">Release Date:</label></b>
        <label for="" id="releasedate"> ${data.released}</label>
    </div>
    <div class="m-2 fs-5 ">
        <b><label for="">No of Pages in the Book:</label></b>
        <label for="" id="page"> ${data.numberOfPages}</label>
    </div>
    
    <div class="m-2 fs-5 ">
    <b><label>Important Characters in the book:</b>
        <ol class="d-flex  flex-column align-items-center justify-content-start">
            <li> ${await displaycharacters(data,0)}</li>
            <li> ${await displaycharacters(data,3)}</li>
            <li> ${await displaycharacters(data,5)}</li>
            <li> ${await displaycharacters(data,17)}</li>
            <li> ${await displaycharacters(data,34)}</li>

        </ol>
    </div>
</div>`;

document.getElementById("detailscontainer").innerHTML=bookdetails;
displaycharacters(data);
    }
    catch(err){
        console.log("error occured");
        console.error(err);
        throw new Error(err);
    }

};
fetchdatafromurl();
