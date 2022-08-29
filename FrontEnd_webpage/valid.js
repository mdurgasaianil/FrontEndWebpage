var email = document.forms['form']['email'];
var password = document.forms['form']['password'];

var email_error = document.getElementById('email_error')
var password_error = document.getElementById('password_error')

email.addEventListener("textInput",email_Verify);
password.addEventListener("textInput",password_Verify);

credentials = {
  "118me0014":"Harshitha",
  "118me0015":"Anil@1234",
  "118me0012":"Dinesh@12",
  "118cs0031":"Avez@1234",
  "118me0006":"Sahithi@1"
}

function validated(){
  if(email.value.length < 7){
    email.style.border = "1px solid red";
    email_error.style.display = "block";
    email.focus();
    return false;
  }
  if(password.value.length < 7){
    password.style.border = "1px solid red";
    password_error.style.display = "block";
    password.focus();
    return false;
  }
  for (let key in credentials){
  if(email.value==key && password.value==credentials[key]){
    alert("Login Success");
    location.href = "index.html"
    return false
  }
  else {
    alert("Login Falied");
  }
}
}

function email_Verify(){
  if(email.value.length >= 8){
    email.style.border = "1px solid silver";
    email_error.style.display = "none";
    return true;
  }
}
function password_Verify(){
  if(password.value.length >= 5){
    password.style.border = "1px solid silver";
    password_error.style.display = "none";
    return true;
  }
}
