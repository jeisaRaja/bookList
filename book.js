var modalBtn = document.querySelector("#addbookbutton");
var modalBg = document.querySelector(".modal-bg");
var modalClose = document.querySelector('.modal-close');
var form = document.querySelector('#addbookform');
var checkbox = document.querySelector('#bookRead').checked;
console.log(checkbox);
const submitInput = document.querySelector('.add-book');
let bottomdiv = document.querySelector('.bottom-div')
var x = false;
let array = [];
var book_id =0;

const AddBookButton = document.getElementById("addbookbutton");
modalClose.addEventListener('click', function(){
    modalBg.classList.remove('bg-active');
})
modalBtn.addEventListener('click', function(){
    modalBg.classList.add('bg-active');
});


// If User click submit, call addToLibrary
document.addEventListener('DOMContentLoaded', function(){
    submitInput.addEventListener('click', addToLibrary,false); 
},false);

// Book Object constructor
function book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = book_id;
    this.info = function(){
        const info_text = title + " by " + author + ", " + pages + " pages, " + read;
        return info_text;
    }
    book_id = book_id + 1;
}

// User input from the Form
function addToLibrary(e){
    // Remove the modal popup
    modalBg.classList.remove('bg-active');
    e.preventDefault();
    // console.log(form[0].value);
    if(document.getElementById('bookRead').checked)
    {
        var checkbox_check = true;
        
    }
    else {
        checkbox_check = false;
    }

    // membuat objek
    const book1 = new book(form[0].value, form[1].value, form[2].value, checkbox_check);
    array.push(book1);
    
    refresh_card();

    function refresh_card(){
        removeAllChild(bottomdiv);
        function removeAllChild(parent){
            while(parent.firstChild){
                parent.removeChild(parent.firstChild);        }
            return;
        }
        for(let i=0; i<array.length; i++){

            var card = document.createElement('div');
            var cardTitleDiv = document.createElement('div');
            cardTitleDiv.className = "cardTitleDiv";
            var cardBodyDiv = document.createElement('div');
            cardBodyDiv.className = "cardBodyDiv";
    
            // Elemen display 
            var cardTitle = document.createElement('h1');
            var cardAuthor = document.createElement('h2');
            var cardPages = document.createElement('h3')
            var cardRead = document.createElement('INPUT');
            var readStatus = document.createElement('h3');
            


            // Membaca array dan memasukkan data ke display
            cardAuthor.textContent = array[i].author;
            cardTitle.textContent = array[i].title;
            cardPages.textContent = array[i].pages
            readStatus.textContent = 'Read Status';
            cardRead.setAttribute("type","checkbox");

            //Delete Button
            let delete_button = document.createElement('button');
            delete_button.className = "delete_button";
            delete_button.innerHTML = "Delete";
            delete_button.id = array[i].index;
            delete_button.addEventListener("click", ()=>{
                remove_book();
            })

            // Check if checkbox is checked or not
            if(array[i].read == true){
                cardRead.checked = true;
            }
            else{
                cardRead.checked = false;
            }
            
            cardTitleDiv.appendChild(cardTitle);
            card.appendChild(cardTitleDiv);
            card.appendChild(cardBodyDiv);
            card.appendChild(cardAuthor);
            card.appendChild(cardPages);
            card.appendChild(readStatus);
            card.appendChild(cardRead);
            card.appendChild(delete_button);
            bottomdiv.appendChild(card).className = 'card';


            function remove_book(){
                console.log("deleted the " + delete_button.id + " array");
                array = array.filter(z => z.index!=delete_button.id);
                delete_button.remove();
                refresh_card();
            }
        }
    }    




    


}





