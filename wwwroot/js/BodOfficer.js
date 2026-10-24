document.addEventListener("DOMContentLoaded", function () {
    const createbodofficer = document.getElementById("createbodofficer");

    if (createbodofficer) {

        const Modal = new bootstrap.Modal(createbodofficer, {
            backdrop: "static",
            keyboard: true
        });

        // Open modal
        window.opencreatebodofficerModal = function () {
            Modal.show();
        };

        // Close modal safely
        window.closecreatebodofficerModal = function () {
            Modal.hide();
        };

        // Press Escape to close
        createbodofficer.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                e.preventDefault();
                Modal.hide();
            }
        });

        // After modal is fully closed
        createbodofficer.addEventListener("hidden.bs.modal", function () {

            // Restore focus outside the modal
            const openButton = document.getElementById("btnOpencreatebodofficer");

            if (openButton) {
                openButton.focus();
            }

            // Reset form
            const form = createbodofficer.querySelector("form");

            if (form) {
                form.reset();
            }

        });
    }
    const updatebodofficer = document.getElementById("updatebodofficer");

    if (updatebodofficer) {

        const Modal = new bootstrap.Modal(updatebodofficer, {
            backdrop: "static",
            keyboard: true
        });

        // Open modal
        window.openupdatebodofficerModal = function () {
            Modal.show();
        };

        // Close modal safely
        window.closeupdatebodofficerModal = function () {
            Modal.hide();
        };

        // Press Escape to close
        updatebodofficer.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                e.preventDefault();
                Modal.hide();
            }
        });

        // After modal is fully closed
        updatebodofficer.addEventListener("hidden.bs.modal", function () {

            // Restore focus outside the modal
            const openButton = document.getElementById("btnOpenupdatebodofficer");

            if (openButton) {
                openButton.focus();
            }

            // Reset form
            const form = updatebodofficer.querySelector("form");

            if (form) {
                form.reset();
            }

        });
    }
  
    const frmcreatebofofficer = document.getElementById("frmcreatebofofficer");
    const btncreatebodofficer = document.getElementById("btncreatebodofficer");
    if (btncreatebodofficer) {
        btncreatebodofficer.addEventListener("click", function (e) {
            e.preventDefault();
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to save this bod / officer?",
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
                    fetch('/BodOfficer/Create_BodOfficer', {
                        method: 'POST',
                        body: new FormData(frmcreatebofofficer)
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
                                    window.location.href = '/BodOfficer/BodOfficer_Index';
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
    $(document).on("click", ".openupdate_modal", function (e) {
        e.preventDefault();

        const selid = $(this).data("selid");
        const selname = $(this).data("selname");
        const seltype = $(this).data("seltype");
        $('#upbodofficerid').val(selid);
        $('#upbodofficername').val(selname);
        $('#upbodofficertype').val(seltype);

        openupdatebodofficerModal();
    });
    const bodofficerallowance = document.getElementById("bodofficerallowance");

    if (bodofficerallowance) {

        const Modal = new bootstrap.Modal(bodofficerallowance, {
            backdrop: "static",
            keyboard: false
        });

        // Open modal
        window.openbodofficerallowanceModal = function () {
            Modal.show();
        };

        // Close modal safely
        window.closebodofficerallowanceModal = function () {
            Modal.hide();
        };

        // Press Escape to close
        bodofficerallowance.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                e.preventDefault();
                Modal.hide();
            }
        });

        // After modal is fully closed
        bodofficerallowance.addEventListener("hidden.bs.modal", function () {

            // Restore focus outside the modal
            const openButton = document.getElementById("btnOpenbodofficerallowance");

            if (openButton) {
                openButton.focus();
            }

            // Reset form
            const form = bodofficerallowance.querySelector("form");

            if (form) {
                form.reset();
            }

        });
    }
    $(document).on("click", ".open_allowance", function (e) {
        e.preventDefault();

        const selallowanceid = $(this).data("selallowanceid");
        const selallowancename = $(this).data("selallowancename");

        $('#allowancebodofficerid').val(selallowanceid);
        $('#allowancename').text(selallowancename);

        openbodofficerallowanceModal();
        LoadAllowance_Data();
    });
    $(document).on("input", ".allowance-amount", function () {
        let value = this.value;

        // Allow digits and one decimal point, up to 2 decimal places
        value = value.replace(/[^\d.]/g, "");

        const parts = value.split(".");
        if (parts.length > 2) {
            value = parts[0] + "." + parts.slice(1).join("");
        }

        const decimalParts = value.split(".");
        if (decimalParts[1]) {
            value = decimalParts[0] + "." + decimalParts[1].substring(0, 2);
        }

        this.value = value;
    });
});
async function LoadAllowance_Data() {
    const selallowanceid = $("#allowancebodofficerid").val();
    const selyear = $("#selallowanceyear").val();
   /* console.log(selallowanceid);
    console.log(selyear);*/
    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const tbody = $("#allowanceTableBody");
    tbody.empty();

    for (let i = 0; i < months.length; i++) {
        tbody.append(`
                <tr  data-month="${i + 1}" class="small" >
                    <td>${i + 1}</td>
                    <td>${months[i]}</td>
                    <td>
                       <input type="text"
                       class=" allowance-amount text-end w-auto"
                       min="0"
                       step="0.01"
                       value="0.00">
                    </td>
                </tr>
            `);
    }

    const rows = tbody.find("tr");

    const requests = months.map((month, index) =>
        $.ajax({
            url: "/BodOfficer/BodOfficerAllowance_List",
            type: "GET",
            dataType: "json",
            data: {
                bodOfficerId: selallowanceid,
                year: selyear,
                month: index + 1
            }
        })
    );

    const results = await Promise.allSettled(requests);

    results.forEach((result, index) => {

        if (result.status === "fulfilled") {

            const response = result.value;

            const amount = response.success
                ? Number(response.allowance)
                : 0;

            rows.eq(index).find(".allowance-amount").val(
                Number.isFinite(amount) ? amount.toFixed(2) : "0.00"
            );

        } else {

            const error = result.reason;

            console.error(`Failed to load ${months[index]} allowance`, {
                month: index + 1,
                status: error.status,
                statusText: error.statusText,
                responseText: error.responseText
            });
        }
    });
}
function Update_BODOfficer() {

    const bodofficerdata = {
        Id: $('#upbodofficerid').val(),
        Name: $('#upbodofficername').val(),
        TypeId: $('#upbodofficertype').val()
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
            fetch('/BodOfficer/Update_BodOfficer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodofficerdata)
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
                            window.location.href = '/BodOfficer/BodOfficer_Index';
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
function Add_Allowance() {

    const selbodofficerid = $('#allowancebodofficerid').val();

    const seldate = [];
    const selamount = [];

    $('#allowancetable tbody tr[data-month]').each(function () {

        const month = Number($(this).data('month'));
        const value = $(this).find('.allowance-amount').val();

        if (value !== undefined &&
            value.trim() !== '' &&
            Number.isFinite(Number(value))) {

            seldate.push(month);
            selamount.push(Number(value));
        }
    });


    const requestData = {
        bodofficerid: selbodofficerid,
        date: seldate,
        amount: selamount
    };


     //console.log('Request data:', requestData);

    $.ajax({
        url: '/BodOfficer/Add_Allowance',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestData),

        success: function (result) {
            Swal.fire({
                icon: 'success',
                title: 'Allowance Successfully Added!',
                text: result.message,
                showConfirmButton: false,
                timer: 1000
            }).then(() => {
                // Redirect after success
                window.location.href = '/BodOfficer/BodOfficer_Index';
            });
        },

        error: function (xhr) {
            Swal.fire(
                'Error',
                xhr.responseJSON?.message ||
                'Failed to save allowance.',
                'error'
            );
        }
    });
}



