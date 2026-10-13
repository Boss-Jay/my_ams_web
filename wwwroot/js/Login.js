document.addEventListener("DOMContentLoaded", function () {
    const changepassword = document.getElementById("changepassword");
    if (changepassword) {
        // Create Bootstrap modal instance
        const updateregisterModal = new bootstrap.Modal(changepassword, {
            backdrop: 'static',
            keyboard: false
        });
        if (updateregisterModal)
            // Open modal
            window.openchangepasswordModal = function () {
                updateregisterModal.show();
            };

        // Close modal safely
        window.closechangepasswordModal = function () {

            // Remove focus from the currently focused element
            if (document.activeElement) {
                document.activeElement.blur();
            }

            updateregisterModal.hide();
        };

        // When the modal is fully hidden
        changepassword.addEventListener("hidden.bs.modal", function () {

            // Move focus somewhere outside the modal
            const openButton = document.getElementById("btnOpenchangepassword");

            if (openButton) {
                openButton.focus();
            }

            // Optional: reset the form
            const form = changepassword.querySelector("form");
            if (form) {
                form.reset();
            }
        });
    }

    // Toggle password visibility
    document.querySelectorAll(".password-toggle").forEach(button => {
        button.addEventListener("click", function () {
            const input = document.getElementById(this.dataset.target);
            const icon = this.querySelector("i");

            const showPassword = input.type === "password";

            input.type = showPassword ? "text" : "password";
            icon.classList.toggle("bi-eye", !showPassword);
            icon.classList.toggle("bi-eye-slash", showPassword);

            this.setAttribute("aria-pressed", String(showPassword));
            this.setAttribute(
                "aria-label",
                showPassword ? "Hide password" : "Show password"
            );
        });
    });

    // Validate password confirmation
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const passwordMessage = document.getElementById("passwordMessage");

    function checkPasswords() {
        if (!confirmPassword.value) {
            passwordMessage.textContent = "";
            confirmPassword.setCustomValidity("");
            return;
        }

        const matches = newPassword.value === confirmPassword.value;

        passwordMessage.textContent = matches
            ? "Passwords match."
            : "Passwords do not match.";

        passwordMessage.className = matches
            ? "mt-2 d-block text-success"
            : "mt-2 d-block text-danger";

        confirmPassword.setCustomValidity(
            matches ? "" : "Passwords do not match."
        );
    }
    if (newPassword)
        newPassword.addEventListener("input", checkPasswords);
    if (confirmPassword)
    confirmPassword.addEventListener("input", checkPasswords);
    const changePasswordForm = document.getElementById("changePasswordForm");
    if (changePasswordForm)
    // Form validation example
    document.getElementById("changePasswordForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();

            checkPasswords();

            if (!this.reportValidity()) {
                return;
            }

            // Send the form data to your MVC/API endpoint here.
           // console.log("Form validation passed.");
        });

        // Change password
 
    const btnchangepassword = document.getElementById("btnchangepassword");
    if (btnchangepassword) {
        console.log("Pass" + confirmPassword.value);
        btnchangepassword.addEventListener("click", function (e) {
            e.preventDefault();
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to change your password?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, Save it!',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {

                    // Show loading
                    Swal.fire({
                        title: 'Saving...',
                        text: 'Please wait',
                        allowOutsideClick: false,
                        didOpen: () => Swal.showLoading()
                    });

                    // Send form data using Fetch API
                    fetch('/User/Change_Password', {
                        method: 'POST',
                        body: new FormData(changePasswordForm)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Saved Successfully!',
                                    text: data.message,
                                    showConfirmButton: false,
                                    timer: 2000
                                }).then(() => {
                                    // Redirect after success
                                    window.location.href = '/Login/UserLogin';
                                });
                            } else {
                                let errorHtml = "";

                                // Remove previous validation styles
                                document.querySelectorAll(".is-invalid")
                                    .forEach(el => {
                                        el.classList.remove("is-invalid");
                                    });

                                // API validation errors
                                if (data.errors) {

                                    Object.entries(data.errors).forEach(
                                        ([fieldName, errors]) => {

                                            // Find input by ASP.NET field name
                                            const input =
                                                document.querySelector(
                                                    `[name="${fieldName}"]`
                                                );

                                            if (input) {

                                                input.classList.add("is-invalid");

                                            }

                                            // Display errors
                                            errors.forEach(msg => {

                                                errorHtml +=
                                                    "• " + msg + "<br>";

                                            });

                                        }
                                    );

                                    // Focus first invalid input
                                    const firstInvalid =
                                        document.querySelector(".is-invalid");

                                    if (firstInvalid) {
                                        firstInvalid.focus();
                                    }

                                } else {

                                    errorHtml =
                                        data.message ||
                                        "Validation failed.";

                                }

                                Swal.fire({
                                    icon: 'error',
                                    title: 'Validation Error',
                                    html: errorHtml
                                });
                            }
                        })
                        .catch(() => {
                            Swal.fire('Error', 'Something went wrong on the server!', 'error');
                        });
                }
            });
        });
    };
});


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


