document.addEventListener("DOMContentLoaded", function () {
    const createtenants = document.getElementById("createtenants");

    if (createtenants) {

        const Modal = new bootstrap.Modal(createtenants, {
            backdrop: "static",
            keyboard: true
        });

        // Open modal
        window.opencreatetenantsModal = function () {
            Modal.show();
        };

        // Close modal safely
        window.closecreatetenantsModal = function () {
            Modal.hide();
        };

        // Press Escape to close
        createtenants.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                e.preventDefault();
                Modal.hide();
            }
        });

        // After modal is fully closed
        createtenants.addEventListener("hidden.bs.modal", function () {

            // Restore focus outside the modal
            const openButton = document.getElementById("btnOpencreatetenants");

            if (openButton) {
                openButton.focus();
            }

            // Reset form
            const form = createtenants.querySelector("form");

            if (form) {
                form.reset();
            }

        });
    }
    const updatetenants = document.getElementById("updatetenants");

    if (updatetenants) {

        const Modal = new bootstrap.Modal(updatetenants, {
            backdrop: "static",
            keyboard: true
        });

        // Open modal
        window.openupdatetenantsModal = function () {
            Modal.show();
        };

        // Close modal safely
        window.closeupdatetenantsModal = function () {
            Modal.hide();
        };

        // Press Escape to close
        updatetenants.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                e.preventDefault();
                Modal.hide();
            }
        });

        // After modal is fully closed
        updatetenants.addEventListener("hidden.bs.modal", function () {

            // Restore focus outside the modal
            const openButton = document.getElementById("btnOpenupdatetenants");

            if (openButton) {
                openButton.focus();
            }

            // Reset form
            const form = updatetenants.querySelector("form");

            if (form) {
                form.reset();
            }

        });
    }
    const frmcreatetenants = document.getElementById("frmcreatetenants");
    const btncreatetenants = document.getElementById("btncreatetenants");
    if (btncreatetenants) {
        btncreatetenants.addEventListener("click", function (e) {
            e.preventDefault();
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to save this tenants?",
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
                    fetch('/Tenants/Create_Tenants', {
                        method: 'POST',
                        body: new FormData(frmcreatetenants)
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
                                    window.location.href = '/Tenants/Tenants_Index';
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

    $("#searchtenantstin").on("input", function () {
        let value = $(this).val().replace(/\D/g, "").substring(0, 11);

        value = value.replace(
            /^(\d{3})(\d{0,3})(\d{0,3})(\d{0,3}).*/,
            function (_, a, b, c, d) {
                return [a, b, c, d].filter(Boolean).join("-");
            }
        );

        $(this).val(value);
    });
    $("#searchtenantstinCode").on("input", function () {
        this.value = this.value.replace(/\D/g, "").substring(0, 4);
    });
    $("#tenantszipcode").on("input", function () {
        this.value = this.value.replace(/\D/g, "").substring(0, 4);
    });
    $("#searchtenantstin ,#searchtenantstinCode").on("input", function () {

        const SearchTIN = $("#searchtenantstin").val().trim();
        const SearchBranchCode = $("#searchtenantstinCode").val();
        const results = $("#tenantsResults");

        if (!SearchTIN) {
            results.empty();
            return;
        }

        $.ajax({
            url: "/Tenants/Search_Tenants",
            type: "GET",
            data: {
                SearchTIN: SearchTIN,
                SearchBranchCode: SearchBranchCode
            },

            success: function (response) {
                results.empty();

                if (!response || response.length === 0) {
                    results.html(`
                    <div class="text-center py-3">
                        <div class="text-muted mb-2">
                            <i class="bi bi-info-circle me-1"></i>
                            No supplier found.
                        </div>

                        <a onclick="Open_Create_Tenants()"
                           class="btn btn-primary px-4">
                            <i class="bi bi-plus-lg me-2"></i>Add New Supplier
                        </a>
                    </div>
                `);

                   /* $("#btnAddSupplier").on("click", function () {
                        // Open your create supplier modal
                        $("#createsupplier").modal("show");

                        // Optional: use the search text to prefill a field
                        // $("#tin").val($("#searchSupplier").val().trim());
                    });*/

                    return;
                }

                response.forEach(function (data) {

                    const fullname = [
                        data.lastname,
                        data.firstname,
                        data.middlename
                    ].filter(Boolean).join(", ");

                    const displayName =
                        data.corporation || fullname || "Unnamed Tenants";

                    const tinBranch = [
                        data.tin,
                        data.tinCode
                    ].filter(Boolean).join("-");

                    const Address = [
                        data.addressDetails,
                        data.city,
                        data.zipcode
                    ].filter(Boolean).join(" ");

                    // Main result container
                    const item = $("<div>")
                        .addClass("supplier-result-item d-flex align-items-center justify-content-between gap-3");

                    // Supplier details on the left
                    const details = $("<div>")
                        .addClass("flex-grow-1");

                    $("<div>")
                        .addClass("supplier-result-name")
                        .text(displayName)
                        .appendTo(details);

                    $("<small>")
                        .addClass("text-muted d-block")
                        .text("TIN: " + (tinBranch || "N/A"))
                        .appendTo(details);

                    $("<small>")
                        .addClass("text-muted d-block")
                        .text(Address || "No address")
                        .appendTo(details);

                    // Edit button on the right
                    const editButton = $("<button>")
                        .attr("type", "button")
                        .addClass("btn btn-sm btn-info border-0")
                        .html('<i class="bi bi-pencil-square"></i> Edit')
                        .on("click", function () {
                            Get_Tenants(data.id);
                        });

                    item.append(details, editButton);
                    results.append(item);
                });
            },

            error: function (xhr) {
                console.error(xhr.responseText);

                results.html(`
                <div class="text-danger text-center py-2">
                    Failed to load tenants.
                </div>
            `);
            }
        });
    });
});

function Open_Create_Tenants() {
    const inputtin = ($("#searchtenantstin").val() || "").trim();

    const inputtincode = ($("#searchtenantstinCode").val() || "")
        .replace(/\D/g, "")
        .substring(0, 4)
        .padStart(4, "0");

    // Validate TIN first
    if (!validateTIN(inputtin)) {
        Swal.fire({
            icon: "warning",
            title: "Invalid TIN",
            text: "TIN format must be 000-000-000."
        });
        return;
    }

    $("#createtenantstin").val(inputtin);
    $("#createtenantstincode").val(inputtincode);

    $("#tenantscorporationdiv").hide();
    $("#tenantsindividualdiv").hide();
    $("#tenantssavebuttondiv").hide();

    // Open modal only after successful validation
    opencreatetenantsModal();
}
function Create_Show_Selected_Tenants_Type() {
    const typeid = parseInt($("#tenantsttypeid").val()) || 0;
    if (typeid === 1) { // Individual
        $("#tenantscorporationdiv").hide();
        $("#tenantsindividualdiv").show();
        $("#tenantssavebuttondiv").show();
        $("#tenantsindividualtradenamediv").show();

        $("#tenantscorporation").val("");
    }
    else if (typeid === 2) { // Corporation
        $("#tenantscorporationdiv").show();
        $("#tenantsindividualdiv").hide();
        $("#tenantssavebuttondiv").show();
        $("#tenantsindividualtradenamediv").hide();

        $("#tenantsfname").val("");
        $("#tenantslname").val("");
        $("#tenantsmname").val("");
     
    }
    else {
        $("#tenantscorporationdiv").hide();
        $("#tenantsindividualdiv").hide();
        $("#tenantssavebuttondiv").hide();
    }
}
function Update_Show_Selected_Tenants_Type() {
    const typeid = parseInt($("#uptenantstypeid").val()) || 0;
    if (typeid === 1) { // Individual
        $("#uptenantscorporationdiv").hide();
        $("#uptenantsindividualdiv").show();
        $("#uptenantssavebuttondiv").show();
        $("#uptenantsindividualtradenamediv").show();

        $("#uptenantscorporation").val("");
    }
    else if (typeid === 2) { // Corporation
        $("#uptenantscorporationdiv").show();
        $("#uptenantsindividualdiv").hide();
        $("#uptenantssavebuttondiv").show();
        $("#uptenantsindividualtradenamediv").hide();

        $("#uptenantsfname").val("");
        $("#uptenantslname").val("");
        $("#uptenantsmname").val("");

    }
    else {
        $("#uptenantscorporationdiv").hide();
        $("#uptenantsindividualdiv").hide();
        $("#uptenantssavebuttondiv").hide();
    }
}
function Get_Tenants(Id) {
    $.ajax({
        url: '/Tenants/Get_Tenants',
        type: 'GET',
        data: { Id: Id },
        success: function (tenants) {
            $('#uptenantsid').val(tenants.id);
            $('#uptenantstypeid').val(tenants.type);
            $('#uptenantstin').val(tenants.tin);
            const TinCode = (tenants.tinCode || "")
                .toString()
                .replace(/\D/g, "")
                .slice(-4)
                .padStart(4, "0");
            $('#uptenantstincode').val(TinCode);
            $('#uptenantslname').val(tenants.lastname);
            $('#uptenantsfname').val(tenants.firstname);
            $('#uptenantsmname').val(tenants.middlename);
       
            $('#uptenantscorporation').val(tenants.corporation);
            $('#uptenantsaddress').val(tenants.addressDetails);
            $('#uptenantszipcode').val(tenants.zipcode);
            $('#uptenantscity').val(tenants.city);
    
            openupdatetenantsModal();
            Update_Show_Selected_Tenants_Type();
        },
        error: function () {
            Swal.fire(
                'Error',
                'Unable to load tenants information',
                'error');
        }
    });
}
function Update_Tenants() {
    const tenantsdata = {
        Id: $('#uptenantsid').val(),
        Type: $('#uptenantstypeid').val(),
        Tin: $('#uptenantstin').val(),
        TinCode: $('#uptenantstincode').val(),
        Lastname: $('#uptenantslname').val(),
        Firstname: $('#uptenantsfname').val(),
        Middlename: $('#uptenantsmname').val(),
 
        Corporation: $('#uptenantscorporation').val(),
        AddressDetails: $('#uptenantsaddress').val(),
        Zipcode: $('#uptenantszipcode').val(),
        City: $('#uptenantscity').val()
    };
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to update this tenants?",
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
            fetch('/Tenants/Update_Tenants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tenantsdata)
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
                            window.location.href = '/Tenants/Tenants_Index';
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