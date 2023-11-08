let showname = document.getElementById("showname")

const data = JSON.parse(localStorage.getItem("user")) || null;
// console.log(data);
if (data) {
    showname.textContent = `Welcome! ${data.name}`
}
const token = localStorage.getItem("token");

let loginbtn = document.getElementById('login')

if (token) {
    loginbtn.innerText = `Logout`
    loginbtn.addEventListener("click", async () => {
        try {
            fetch(`http://localhost:8080/user/logout`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `${token}`
                    }
                }
            ).then(res => res.json())
                .then(data => {
                    localStorage.clear();
                    Swal.fire(
                        `${data.msg}`,
                        '',
                        'success'
                    )
                })
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (err) {
            console.log(err);
        }
    })
} else {
    loginbtn.innerText = `Login/Signup`
    loginbtn.addEventListener("click", () => {
        window.location.href = "./login.html"
    })
}