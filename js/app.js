//variables

const courses= document.querySelector('#courses-list'),

      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn = document.querySelector('#clear-cart');





//listeners

loadEventListeners();

function loadEventListeners(){
    // when a new courses is added 
    
    courses.addEventListener('click', buycourse);
    
    //when the remove button is clicked;

    shoppingCartContent.addEventListener('click', removeCourse);
    
    // clear cart button
    
    clearCartBtn.addEventListener('click', clearCart);
    
    document.addEventListener('DomContentLoaded', getFromLocalStorage);
    
    
    
}





//functions

function buycourse(e) {
    e.preventDefault();
    //console.log("added new courses"); 
    // use delegation to find the courses witch was added.
        // console.log(e.target);
    
    //use delegation to find the course that was added;
    if(e.target.classList.contains("add-to-cart")) {
                              //console.log("added");
        const course = e.target.parentElement.parentElement;
        //read the value
        getCourseInfo(course);
    }
                                //console.log(e.target.classList);
                                //console.log(e.target.parentElement.parentElement);//sa veut dire que pour chaque carte on peut avoir le parent d'element cible 
}
   // readed the html information on the selected courses
    function getCourseInfo(course){
                       //console.log(course); ici tu as tous les infos sur une course donnee
        //created and objet with this information.
         const courseInfo = {
             image: course.querySelector('img').src,
             title: course.querySelector('h4').textContent,
             price: course.querySelector('.price span').textContent,
             id: course.querySelector('a').getAttribute('data-id')
         }
                              //console.log(courseInfo);
         //insert into the shopping carte;
          addIntoCard(courseInfo);
             
         
    }
   // display the selected courses into the shopping carte
    function addIntoCard(course){
        //created a <tr> element
       const row = document.createElement('tr');
    //build a template
        row.innerHTML = `
                 <tr>
                     <td>
                          <img src="${course.image}">
                     </td>
                                       
                         <td>${course.title}</td>
                         <td>${course.price}</td>
                         <td>
                              <a href="#" class="remove" data-id="${course.id}">X</a>
                         </td>
                        
                 </tr>
        `;
        //add into the shopping cart
        shoppingCartContent.appendChild(row);
        
        //add into the storage
        saveIntoStorage(course);
 }

 // add the courses into the locale storage 

  function saveIntoStorage(course){
    
      let courses = getCoursesFromStorage();
      
      //add the courses into the array
      courses.push(course);
      //since the storage only save string we needs to convert JSON into string
      localStorage.setItem('courses', JSON.stringify(courses) );
  }
// get the content from the storage
 function getCoursesFromStorage (){
     let courses;
     //if sommething in the storage we get the values else we create an empty array;
     if(localStorage.getItem('courses') === null){
         courses = [];
     }else{
         courses = JSON.parse(localStorage.getItem('courses'));
     }
     return courses;
 }



//remove courses from the DOM;
function removeCourse(e){
    
    //remove from the DOM
    let course, courseId;
    
    if(e.target.classList.contains('remove')){
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    console.log(courseId);
    
    //remove from the local storage
    
    removeCourseLocalStorage(courseId);
}
// cleart the shopping cart
function removeCourseLocalStorage(id) {
    let coursesLS = getCoursesFromStorage();
    // loop throught the array und fin the index to remove;
    coursesLS.forEach(function(courseLS, index){ 
     if(courseLS.id === id){
        coursesLS.splice(index, 1);
       }
    });
                      
                // console.log(coursesLS);
    //add the rest of the array
    localStorage.setItem('courses' ,JSON.stringify(coursesLS));
}

function clearCart() {
    //shoppingCartContent.innerHTML = '';
    while (shoppingCartContent.firstChild){
       shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
    //clear from the local storage
    clearLocalStorage();
}
    function clearLocalStorage() {
    localStorage.clear();
    }
 //loaded when document is ready and printed courses into shopping cart;
function getFromLocalStorage(){
     let coursesLS = getCoursesFromStorage();
    
    //loop throught the courses and print into the cart
     coursesLS.forEach(function(course) {
       //create the <tr> 
          const row = document.createElement('tr');
       row.innerHTML = `
                 <tr>
                     <td>
                          <img src="${course.image}">
                     </td>
                                       
                         <td>${course.title}</td>
                         <td>${course.price}</td>
                         <td>
                              <a href="#" class="remove" data-id="${course.id}">X</a>
                         </td>
                        
                 </tr>
        `;
    shoppingCartContent.appendChild(row);
                       });
            
}