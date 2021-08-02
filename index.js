const imageContainer=document.getElementById("image-container");
const loader=document.getElementById("loader");
var photosArray=[];
var images=0;
var totalImages=0;
var ready=false;
const count=10;

// const apiKey="MfdRge9mACO7mj2R6VIW7dOOT5gLIAY5zrUSC2DNgRg";
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=SUIQQAcvwVvDMmTLX_FaO6SftjmyGBNerVMT1xKXODU&orientation=landscape&count=${count}`;

// asynchronous function to display photos by fetching api
async function getPhotos()
{
    try{
        const response=await fetch(apiUrl);
        photosArray=await response.json();
        //   console.log(photosArray);
        displayArray();
    }
    catch(error)
    {
        console.log(error);
    }
}

// helper function to set attributes to the element specified
function setAttributes(element,attributes){
    for(var key in attributes)
    {
        element.setAttribute(key,attributes[key]);
    }
    // the attribute paramter here is and object with key has the attribute to be added and value to be the value of the attribute
}

// function to count the number of images loaded
function imageLoaded()
{
    images++;
    if(images===totalImages)
    {
        ready=true;
        loader.hidden=true;
    }
}

// function to create elements to display picture.
function displayArray(){
    images=0;
    totalImages=photosArray.length;
    for( var i=0;i<photosArray.length;i++)
    {
        var newitem=document.createElement('a');
        // newitem.setAttribute('href',photosArray[i].links.html);
        // newitem.setAttribute('target','_blank');
        setAttributes(newitem,{
            href:photosArray[i].links.html,
            target:'_blank',
        });
        var newImage=document.createElement('img');
        // newImage.setAttribute('src',photosArray[i].urls.regular);
        // newImage.setAttribute('alt',photosArray[i].alt_description);
        // newImage.setAttribute('title',photosArray[i].alt_description);
        setAttributes(newImage,{
            src:photosArray[i].urls.regular,
            alt:photosArray[i].alt_description,
            title:photosArray[i].alt_description,
        });
        // each time an image tag is created i.e the image is loaded, the imageLoaded function is called
        newImage.addEventListener('load',imageLoaded);

        newitem.appendChild(newImage);
        imageContainer.appendChild(newitem);
    }
}

// event to create infinity scroll effect
window.addEventListener('scroll',function(){
    if(window.scrollY+window.innerHeight>=document.body.offsetHeight-1000 && ready===true)
    {
        ready=false;
        getPhotos();
    }
});

// on load
getPhotos();