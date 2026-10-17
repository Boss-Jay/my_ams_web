document.addEventListener("DOMContentLoaded", function () {
    const createbranch = document.getElementById("createbranch");
    if (createbranch) {
        // Create Bootstrap modal instance
        const Modal = new bootstrap.Modal(createbranch, {
            backdrop: 'static',
            keyboard: false
        });
        if (Modal)
            // Open modal
            window.opencreatebranchModal = function () {
                Modal.show();
            };

        // Close modal safely
        window.closecreatebranchModal = function () {

            // Remove focus from the currently focused element
            if (document.activeElement) {
                document.activeElement.blur();
            }

            Modal.hide();
        };

        // When the modal is fully hidden
        createbranch.addEventListener("hidden.bs.modal", function () {

            // Move focus somewhere outside the modal
            const openButton = document.getElementById("btnOpencreatebranch");

            if (openButton) {
                openButton.focus();
            }

            // Optional: reset the form
            const form = createbranch.querySelector("form");
            if (form) {
                form.reset();
            }
        });
    }
    const updatebranch = document.getElementById("updatebranch");
    if (updatebranch) {
        // Create Bootstrap modal instance
        const Modal = new bootstrap.Modal(updatebranch, {
            backdrop: 'static',
            keyboard: false
        });
        if (Modal)
            // Open modal
            window.openupdatebranchModal = function () {
                Modal.show();
            };

        // Close modal safely
        window.closeupdatebranchModal = function () {

            // Remove focus from the currently focused element
            if (document.activeElement) {
                document.activeElement.blur();
            }

            Modal.hide();
        };

        // When the modal is fully hidden
        updatebranch.addEventListener("hidden.bs.modal", function () {

            // Move focus somewhere outside the modal
            const openButton = document.getElementById("btnOpenupdatebranch");

            if (openButton) {
                openButton.focus();
            }

            // Optional: reset the form
            const form = updatebranch.querySelector("form");
            if (form) {
                form.reset();
            }
        });
    }

    const frmcreatebranch = document.getElementById("frmcreatebranch");
    const btncreatebranch = document.getElementById("btncreatebranch");
    if (btncreatebranch) {
        btncreatebranch.addEventListener("click", function (e) {
            e.preventDefault();
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to save this branch?",
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
                    fetch('/Branch/Create_Branch', {
                        method: 'POST',
                        body: new FormData(frmcreatebranch)
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
                                    window.location.href = '/Branch/Branch_Index';
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
function Get_Branch(Branchid) {
    $.ajax({
        url: '/Branch/Get_Branch',
        type: 'GET',
        data: { Branchid: Branchid },
        success: function (branch) {
            $('#branchid').val(branch.branchid);
            $('#branchcompany').val(branch.companyId);
            $('#branchname').val(branch.name);
            $('#branchaddress').val(branch.address);
            $('#branchzipcode').val(branch.zipcode);
            $('#branchemail1').val(branch.email1);
            $('#branchemail2').val(branch.email1);
            $('#branchtin').val(branch.tin);
            $('#branchcode').val(branch.code);
            $('#branchcontact1').val(branch.contact1);
            $('#branchcontact2').val(branch.contact2);
            $('#branchmanager').val(branch.managerId);
            $('#branchaccountant').val(branch.accountant);
            $('#branchocn').val(branch.ocn);
            $('#branchrdo').val(branch.rdo);
           
            openupdatebranchModal();
        },
        error: function () {
            Swal.fire(
                'Error',
                'Unable to load branch information',
                'error');
        }
    });
}
function Update_Branch() {
    const branchdata = {
        Branchid: $("#branchid").val(),
        CompanyId: $("#branchcompany").val(),
        Name: $("#branchname").val(),
        Address: $("#branchaddress").val(),
        Zipcode: $("#branchzipcode").val(),
        ManagerId: $("#branchmanager").val() || 0,
        Contact1: $("#branchcontact1").val(),
        Contact2: $("#branchcontact2").val(),
        Tin: $("#branchtin").val(),
        Code: $("#branchcode").val(),
        Ocn: $("#branchocn").val(),
        Email1: $("#branchemail1").val(),
        Email2: $("#branchemail2").val(),
        Accountant: $("#branchaccountant").val() || 0,
        Rdo: $("#branchrdo").val() 
    };

    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to update this branch?",
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
            fetch('/Branch/Update_Branch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(branchdata)
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
                            window.location.href = '/Branch/Branch_Index';
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
$(document).on("click", ".branch-option", async function () {

    const branchId = Number($(this).attr("data-branch-id"));
    const branchName = $(this).attr("data-branch");

    if (!Number.isInteger(branchId) || branchId <= 0) {
        return;
    }

    try {
        const response = await fetch('/Branch/Update_Last_Branch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(branchId)
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            alert(result.message || "Failed to update branch.");
            return;
        }

        // Update the displayed branch after saving succeeds.
        $("#currentBranch").text(branchName);
        $("#selectedBranchId").val(branchId);

        $(".branch-option").removeClass("selected");
        $(this).addClass("selected");

        $("#branchMenu").removeClass("show");
        $(".branch-arrow").removeClass("rotate");

    } catch (error) {
        console.error("Branch update failed:", error);
        alert("Unable to save your selected branch.");
    }
});