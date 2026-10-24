
document.addEventListener("DOMContentLoaded", function () {
    // Get the first root account
    const firstParent = $("#coaTable .account-row[data-level='0']")
        .first();

    if (!firstParent.length) return;

    const accountId = String(firstParent.attr("data-account-id"));

    // Show its direct children
    $("#coaTable .account-row").filter(function () {
        return String($(this).attr("data-parent-id")) === accountId;
    }).show();

    // Update the parent arrow
    const button = firstParent.find(".toggle-account");

    button.attr("aria-expanded", "true")
        .attr("title", "Collapse account");

    button.find("i")
        .removeClass("bi-chevron-right")
        .addClass("bi-chevron-down");


    const createaccounttitle = document.getElementById("createaccounttitle");

    if (createaccounttitle) {

        const Modal = new bootstrap.Modal(createaccounttitle, {
            backdrop: "static",
            keyboard: true
        });

        // Open modal
        window.opencreateaccounttitleModal = function () {
            Modal.show();
        };

        // Close modal safely
        window.closecreateaccounttitleModal = function () {
            Modal.hide();
        };

        // Press Escape to close
        createaccounttitle.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                e.preventDefault();
                Modal.hide();
            }
        });

        // After modal is fully closed
        createaccounttitle.addEventListener("hidden.bs.modal", function () {

            // Restore focus outside the modal
            const openButton = document.getElementById("btnOpencreateaccounttitle");

            if (openButton) {
                openButton.focus();
            }

            // Reset form
            const form = createaccounttitle.querySelector("form");

            if (form) {
                form.reset();
            }

        });
    }
    const updateaccounttitle = document.getElementById("updateaccounttitle");

    if (updateaccounttitle) {

        const Modal = new bootstrap.Modal(updateaccounttitle, {
            backdrop: "static",
            keyboard: true
        });

        // Open modal
        window.openupdateaccounttitleModal = function () {
            Modal.show();
        };

        // Close modal safely
        window.closeupdateaccounttitleModal = function () {
            Modal.hide();
        };

        // Press Escape to close
        updateaccounttitle.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                e.preventDefault();
                Modal.hide();
            }
        });

        // After modal is fully closed
        updateaccounttitle.addEventListener("hidden.bs.modal", function () {

            // Restore focus outside the modal
            const openButton = document.getElementById("btnOpenupdateaccounttitle");

            if (openButton) {
                openButton.focus();
            }

            // Reset form
            const form = updateaccounttitle.querySelector("form");

            if (form) {
                form.reset();
            }

        });
    }

    const frmcreateaccounttitle = document.getElementById("frmcreateaccounttitle");
    const btncreateaccounttitle = document.getElementById("btncreateaccounttitle");
    if (btncreateaccounttitle) {
        btncreateaccounttitle.addEventListener("click", function (e) {
            e.preventDefault();
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to save this account?",
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
                    fetch('/ChartofAccounts/Create_Account', {
                        method: 'POST',
                        body: new FormData(frmcreateaccounttitle)
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
                                    window.location.href = '/ChartofAccounts/ChartofAccounts_Index';
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

    $(document).on("click", " .toggle-account", function () {

        const button = $(this);
        const row = button.closest("tr");

        const accountId = String(row.attr("data-account-id"));
        const isExpanded = button.attr("aria-expanded") === "true";

        function collapseDescendants(parentId) {

            $(' .account-row').filter(function () {
                return String($(this).attr("data-parent-id")) === parentId;
            }).each(function () {

                const childRow = $(this);

                // Hide this child
                childRow.hide();

                // Reset its toggle button
                const childButton = childRow.find(".toggle-account");

                childButton.attr("aria-expanded", "false")
                    .attr("title", "Expand account");

                childButton.find("i")
                    .removeClass("bi-chevron-down")
                    .addClass("bi-chevron-right");

                // Collapse descendants recursively
                collapseDescendants(
                    String(childRow.attr("data-account-id"))
                );
            });
        }

        if (isExpanded) {

            collapseDescendants(accountId);

            button.attr("aria-expanded", "false")
                .attr("title", "Expand account");

            button.find("i")
                .removeClass("bi-chevron-down")
                .addClass("bi-chevron-right");

        } else {

            // Show direct children only
            $('#coaTable .account-row').filter(function () {
                return String($(this).attr("data-parent-id")) === accountId;
            }).show();

            button.attr("aria-expanded", "true")
                .attr("title", "Collapse account");

            button.find("i")
                .removeClass("bi-chevron-right")
                .addClass("bi-chevron-down");
        }
    });
    $(document).on("click", ".open-account", function (e) {
        e.preventDefault();

        const selcoaid = $(this).data("coaid");
        const selcoadesc = $(this).attr("data-account-desc");
        const sellevel = $(this).data("level");
        const seltype = $(this).data("type");
        OpenModal_CreateAccount(selcoaid, selcoadesc, seltype, sellevel);
    });
    $(document).on("click", ".open-update-account", function (e) {
        e.preventDefault();

        const selcoaid = $(this).data("upcoaid");
        const selcoadesc = $(this).attr("data-upaccount-desc");

        $('#upcoaidtext').text(selcoaid);
        $('#upcoaidval').val(selcoaid);
        $('#upcoadesc').val(selcoadesc);

        openupdateaccounttitleModal();
    });
   
});

function OpenModal_CreateAccount(selcoaid, selcoadesc,seltype, sellevel) {
    $.ajax({
        url: '/ChartofAccounts/Get_Max_Accnt_Code',
        type: 'GET',
        data: { coaid: selcoaid, level: sellevel },
        success: function (account) {
            $('#coanewcoaid').val(account);
            $('#coasubcoaid').val(selcoaid);
            $('#coacoaid').text(selcoaid);
            $('#coacoaid').val(selcoaid);
            $('#coacoadesc').val(selcoadesc);
            $('#coacoalevel').val(sellevel);
            $('#coacoatype').val(seltype);
            opencreateaccounttitleModal();
        },
        error: function () {
            Swal.fire(
                'Error',
                'Unable to open Account',
                'error');
        }
    });
}
function Update_Account() {
 
    const coadata = {
        CoaId: $('#upcoaidval').val(),
        CoaDesc: $('#upcoadesc').val()
    };
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to update this Account?",
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
            fetch('/ChartofAccounts/Update_Account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(coadata)
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
                            window.location.href = '/ChartofAccounts/ChartofAccounts_Index';
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
}

