
document.addEventListener("DOMContentLoaded", function () {
/*    const firstName = document.getElementById("userfname");
    const middlename = document.getElementById("usermname");
    const lastName = document.getElementById("userlname");
    const username = document.getElementById("userusername");

    function generateUsername() {
        const first = firstName.value.trim();
        const last = lastName.value.trim();
        const middle = middlename.value.trim();
        if (first !== "" && last !== "") {
            username.value = first.charAt(0).toLowerCase() + middle.charAt(0).toLowerCase() + last.toLowerCase();
        } else {
            username.value = "";
        }
    }
    if (firstName)
        firstName.addEventListener("input", generateUsername);
    if (middlename)
        middlename.addEventListener("input", generateUsername);
    if (lastName)
        lastName.addEventListener("input", generateUsername);*/


    const frmusercreate = document.getElementById("frmusercreate");
    const btnusercreate = document.getElementById("btnusercreate");
    if (btnusercreate) {
        btnusercreate.addEventListener("click", function (e) {
            e.preventDefault();
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to save this user?",
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
                    fetch('/User/Create_User', {
                        method: 'POST',
                        body: new FormData(frmusercreate)
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
                                    window.location.href = '/User/User_Index';
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

  /*  const frmuserupdate = document.getElementById("frmuserupdate");
    const btnuserupdate = document.getElementById("btnuserupdate");
    if (btnuserupdate) {
        btnuserupdate.addEventListener("click", function (e) {
            e.preventDefault();
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to update this user?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, Update it!',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {

                    // Show loading
                    Swal.fire({
                        title: 'Updating...',
                        text: 'Please wait',
                        allowOutsideClick: false,
                        didOpen: () => Swal.showLoading()
                    });

                    // Send form data using Fetch API
                    fetch('/User/Update_User', {
                        method: 'POST',
                        body: new FormData(frmuserupdate)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Update Successfully!',
                                    text: data.message,
                                    showConfirmButton: false,
                                    timer: 2000
                                }).then(() => {
                                    // Redirect after success
                                    window.location.href = '/User/User_Index';
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
    };*/
    const updateuser = document.getElementById("updateuser");
    if (updateuser) {
        // Create Bootstrap modal instance
        const updateregisterModal = new bootstrap.Modal(updateuser, {
            backdrop: 'static',
            keyboard: false
        });
        if (updateregisterModal)
            // Open modal
            window.openUpdateUserModal = function () {
                updateregisterModal.show();
            };

        // Close modal safely
        window.closeUpdateUserModal = function () {

            // Remove focus from the currently focused element
            if (document.activeElement) {
                document.activeElement.blur();
            }

            updateregisterModal.hide();
        };

        // When the modal is fully hidden
        updateuser.addEventListener("hidden.bs.modal", function () {

            // Move focus somewhere outside the modal
            const openButton = document.getElementById("btnOpenUpdateUser");

            if (openButton) {
                openButton.focus();
            }

            // Optional: reset the form
            const form = updateuser.querySelector("form");
            if (form) {
                form.reset();
            }
        });
    }
    const createuser = document.getElementById("createuser");
    if (createuser) {
        // Create Bootstrap modal instance
        const registerModal = new bootstrap.Modal(createuser, {
            backdrop: 'static',
            keyboard: false
        });
        if (registerModal)
            // Open modal
            window.openUserModal = function () {
                registerModal.show();
            };

        // Close modal safely
        window.closeUserModal = function () {

            // Remove focus from the currently focused element
            if (document.activeElement) {
                document.activeElement.blur();
            }

            registerModal.hide();
        };

        // When the modal is fully hidden
        createuser.addEventListener("hidden.bs.modal", function () {

            // Move focus somewhere outside the modal
            const openButton = document.getElementById("btnOpenCreateUser");

            if (openButton) {
                openButton.focus();
            }

            // Optional: reset the form
            const form = createuser.querySelector("form");
            if (form) {
                form.reset();
            }
        });
    }
});
function Get_User(Id) {
    // alert(id);
    $.ajax({
        url: '/User/Get_User',
        type: 'GET',
        data: { Id: Id },
        success: function (user) {
            $('#userUpId').val(user.id);
            $('#userUpfname').val(user.firstname);
            $('#userUpmname').val(user.middlename);
            $('#userUplname').val(user.lastname);
            $('#userUpsuffix').val(user.suffix);
            $('#userUpusername').val(user.username);
            $('#userUprole').val(user.roleId);
            $('#userUpbranch').val(user.branchid);
        
            openUpdateUserModal();
        },
        error: function () {
            Swal.fire(
                'Error',
                'Unable to load user information',
                'error');
        }
    });
};
function Update_User() {
    const userdata = {
        Id: $("#userUpId").val(),
        Firstname: $("#userUpfname").val(),
        Middlename: $("#userUpmname").val(),
        Lastname: $("#userUplname").val(),
        Suffix: $("#userUpsuffix").val(),
        Branchid: $("#userUpbranch").val(),
        Username: $("#userUpusername").val(),
        RoleId: $("#userUprole").val(),

    };

    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to update this user?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Update it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {

            // Show loading
            Swal.fire({
                title: 'Updating...',
                text: 'Please wait',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

            // Send form data using Fetch API
            fetch('/User/Update_User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userdata)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Update Successfully!',
                            text: data.message,
                            showConfirmButton: false,
                            timer: 2000
                        }).then(() => {
                            // Redirect after success
                            window.location.href = '/User/User_Index';
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
};