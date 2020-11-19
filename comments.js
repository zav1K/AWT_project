let opinions=[];

if(localStorage.myComments){
    opinions=JSON.parse(localStorage.myComments);
}

console.log(opinions);
let myForm=document.getElementById("form1");

myForm.addEventListener("submit",processData);

function processData(event){
    
    event.preventDefault();

    const fName = document.getElementById("fname").value.trim();
    const lName = document.getElementById("lname").value.trim();
    const email = document.getElementById("emails").value.trim();

    let errorFname = document.getElementById("fname_error");
    if(checkName(fName)){
        errorFname.style.display = "none";
    } else{
        errorFname.style.display = "block";
        return;
    }
    let errorLname = document.getElementById("lname_error");
    if(checkName(lName)){
        errorLname.style.display = "none";
    } else{
        errorLname.style.display = "block";
        return;
    }
    let errorEmail = document.getElementById("email_error");
    if(checkEmail(email)){
        errorEmail.style.display = "none";
    } else{
        errorEmail.style.display = "block";
        return;
    }
    //let gender_value = "unknown";
    /*if (document.getElementById('male').checked) {
        gender_value = document.getElementById('male').value;
    } else if (document.getElementById('female').checked) {
        gender_value = document.getElementById('female').value;
    } else {
        gender_value = document.getElementById('other').value;
    }
    let age_value = "unknown";
    if (document.getElementById('age1').checked) {
        age_value = document.getElementById('age1').value;
    } else if (document.getElementById('age2').checked) {
        age_value = document.getElementById('age2').value;
    } else {
        age_value = document.getElementById('age3').value;
    }
    let pupil = false;
    if(document.getElementById('type1').checked){
        pupil = true;
    };
    let student = false;
    if(document.getElementById('type2').checked){
        student = true;
    };
    let lecturer = false;
    if(document.getElementById('type3').checked){
        lecturer = true;
    };*/
    const text = document.getElementById("textarea").value.trim();
    const willReturn = document.getElementById("willReturnElm").checked;
    const newOpinion =
        {
            first_name: fName,
            last_name: lName,
            //comment: nopOpn,
            email: email,
            //gender: gender_value,
            //age: age_value,
            //is_pupil: pupil,
            //is_student: student,
            //is_lecturer: lecturer,
            text_area: text,
            will_return: willReturn,
            created: new Date()
        };

    console.log("New opinion:\n "+JSON.stringify(newOpinion));

    opinions.push(newOpinion);

    localStorage.myComments = JSON.stringify(opinions);

    window.alert("Your opinion has been stored. Look to the console");
    console.log("New opinion added");
    console.log(opinions);
    myForm.reset();
    showOpinions();
}
function showOpinions(){
    let node = document.getElementById("opinionsContainer");
    let i = 0;
    node.innerHTML = '';
    for(i = 0; i < opinions.length; i++){
        node.innerHTML += opinion2html(opinions[i]);
    }
}
///-------------------------------------------------------------------------///
function opinion2html(opinion){
    const opinionTemplate=
    `
        <section>
           <h3>${opinion.first_name} ${opinion.last_name} <i>(${(new Date(opinion.created)).toDateString()})</i></h3>
    
           <p>${opinion.text_area}</p>
           <p>${opinion.will_return?"I will return to this page.":"Sorry, one visit was enough."}</p>
        </section>`;
    return opinionTemplate;
}
showOpinions();
let clearButton = document.getElementById("clearOldComments");
clearButton.addEventListener("click", clearOldComments);
function clearOldComments(){
    let i = 0;
    for(i = opinions.length - 1; i >= 0; i--){
       if(Date.now() - new Date(opinions[i].created) > 10000){
           opinions.splice(i, 1);
       }
    }
    localStorage.myComments = JSON.stringify(opinions);
    showOpinions();
}
function checkName(text){
    if(/^[A-Za-z]+$/.test(text)){
        return true;
    }
    return false;
}
function checkEmail(mail) {
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
        return (true);
    }
    return (false);
}
/*function opinionArray2html(sourceData){
    return sourceData.reduce((htmlWithOpinions,opn) => htmlWithOpinions + opinion2html(opn),"");
}*/

