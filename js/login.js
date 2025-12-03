

const form = document.querySelector('form');

let x = "rehnuma", y = "123456";

form.addEventListener('submit', function(e) {
    e.preventDefault(); 

    let p = document.getElementById("p");
    let p1 = document.getElementById("p1");
    
    if (p.value === x && p1.value === y) {
        alert("Login successful!");
        
        sessionStorage.setItem('username', p.value);
        sessionStorage.setItem('isLoggedIn', 'true');

        window.location.href = 'dash.html';
    } else {
        alert("Not matched! Please check your username and password.");
    }
});

