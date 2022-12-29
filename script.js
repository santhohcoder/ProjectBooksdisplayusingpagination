
const baseurl = 'https://www.anapioficeandfire.com/api/books';
let booknumber=new URLSearchParams(window.location.search).get('id');
console.log(booknumber);
if(booknumber==null)
booknumber=1;
console.log(booknumber)
let getLoader = document.getElementById("loading");
const showLoading = () => {
    getLoader.style.display = "block";
    setInterval((hideLoading)=>{
        getLoader.style.display="none";
    },2400);
}

const fetchdatafromurl = async () => {
    showLoading();
    try {
        const response = await fetch(`${baseurl}/${booknumber}`);
        const data = await response.json();
        displaydata(data);

    }
    catch (err) {
        hideLoading();
        console.error(err);
        throw new Error(err);
    }

}
const displaycharacters = async (data, characternumber) => {
    // showLoading();
    try {
        let response = await fetch(data.characters[characternumber]);
        let character = await response.json();
        // hideLoading();
        return (character.name);

    }
    catch (err) {
        console.error(err);
        throw new Error(err);
    }
};
const displaydata = async (data) => {
    try {
        let bookdetails = "";
        bookdetails += `
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
    <div class="table-responsive">
    <table class="table table-sm">
    <thead>
    <tr>
        <th>S.No</th>
        <th>Name</th>
    </tr>
    </thead>
        <tbody>
    <tr>
    <td>
    1</td>
    <td>
    ${await displaycharacters(data, 23)}</td>
    </tr>
    <tr>
    <td>
    2</td>
    <td>
    ${await displaycharacters(data, 8)}</td>
    </tr>
    <tr>
    <td>
    3</td>
    <td>
    
    ${await displaycharacters(data, 12)}</td>
    </tr>
    <tr>
    <td>
    4</td>
    <td>
    ${await displaycharacters(data, 17)}</td>
    </tr>
    <tr>
    <td>
    5</td>
    <td>
    ${await displaycharacters(data, 35)}</td>
    </tr>
    </tr>
    </tbody>
    </table>
    </div>
        
    </div>
</div>`;
        
        document.getElementById("detailscontainer").innerHTML = bookdetails;
    }
    catch (err) {
        console.error(err);
        throw new Error(err);
    }

};
fetchdatafromurl();
