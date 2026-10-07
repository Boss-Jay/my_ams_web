function togglePassword() {

    const password = document.getElementById("password");
    const icon = document.getElementById("passwordIcon");

    if (password.type === "password") {

        password.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");

    } else {

        password.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");

    }
}
function Login() {

    Swal.fire({
        title: 'Logging in...',
        text: 'Please wait',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    $.ajax({
        url: '/Login/UserLogin',
        type: 'POST',
        data: $('#loginForm').serialize(),

        success: function (response) {

            if (response.success) {

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome!',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = response.redirectUrl;
                });

            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: response.message

                });
            }
        },

        error: function () {

            Swal.fire({
                icon: 'error',
                title: 'Login Error',
                text: 'Unable to connect to the server.'
            });
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {


});
