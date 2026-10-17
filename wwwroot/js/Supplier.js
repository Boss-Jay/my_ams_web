document.addEventListener("DOMContentLoaded", function () {

    const createsupplier = document.getElementById("createsupplier");

    if (createsupplier) {

        const Modal = new bootstrap.Modal(createsupplier, {
            backdrop: "static",
            keyboard: true
        });

        // Open modal
        window.opencreatesupplierModal = function () {
            Modal.show();
        };

        // Close modal safely
        window.closecreatesupplierModal = function () {
            Modal.hide();
        };

        // Press Escape to close
        createsupplier.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                e.preventDefault();
                Modal.hide();
            }
        });

        // After modal is fully closed
        createsupplier.addEventListener("hidden.bs.modal", function () {

            // Restore focus outside the modal
            const openButton = document.getElementById("btnOpencreatesupplier");

            if (openButton) {
                openButton.focus();
            }

            // Reset form
            const form = createsupplier.querySelector("form");

            if (form) {
                form.reset();
            }

        });
    }
    const updatesupplier = document.getElementById("updatesupplier");

    if (updatesupplier) {

        const Modal = new bootstrap.Modal(updatesupplier, {
            backdrop: "static",
            keyboard: true
        });

        // Open modal
        window.openupdatesupplierModal = function () {
            Modal.show();
        };

        // Close modal safely
        window.closeupdatesupplierModal = function () {
            Modal.hide();
        };

        // Press Escape to close
        updatesupplier.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                e.preventDefault();
                Modal.hide();
            }
        });

        // After modal is fully closed
        createsupplier.addEventListener("hidden.bs.modal", function () {

            // Restore focus outside the modal
            const openButton = document.getElementById("btnOpenupdatesupplier");

            if (openButton) {
                openButton.focus();
            }

            // Reset form
            const form = createsupplier.querySelector("form");

            if (form) {
                form.reset();
            }

        });
    }

    const frmcreatesupplier = document.getElementById("frmcreatesupplier");
    const btncreatesupplier = document.getElementById("btncreatesupplier");
    if (btncreatesupplier) {
        btncreatesupplier.addEventListener("click", function (e) {
            e.preventDefault();
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to save this supplier?",
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
                    fetch('/Supplier/Create_Supplier', {
                        method: 'POST',
                        body: new FormData(frmcreatesupplier)
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
                                    window.location.href = '/Supplier/Supplier_Index';
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

    $("#searchSuppliertin").on("input", function () {
        let value = $(this).val().replace(/\D/g, "").substring(0, 11);

        value = value.replace(
            /^(\d{3})(\d{0,3})(\d{0,3})(\d{0,3}).*/,
            function (_, a, b, c, d) {
                return [a, b, c, d].filter(Boolean).join("-");
            }
        );

        $(this).val(value);
    });
    $("#searchSupplierBranchCode").on("input", function () {
        this.value = this.value.replace(/\D/g, "").substring(0, 4);
    });
    $("#supplierzipcode").on("input", function () {
        this.value = this.value.replace(/\D/g, "").substring(0, 4);
    });

   
    $("#searchSuppliertin ,#searchSupplierBranchCode").on("input", function () {

        const SearchTIN = $("#searchSuppliertin").val().trim();
        const SearchBranchCode = $("#searchSupplierBranchCode").val();
        const results = $("#supplierResults");

        if (!SearchTIN) {
            results.empty();
            return;
        }

        $.ajax({
            url: "/Supplier/Search_Supplier",
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

                        <a onclick="Open_Create_Supplier()"
                           class="btn btn-primary px-4">
                            <i class="bi bi-plus-lg me-2"></i>Add New Supplier
                        </a>
                    </div>
                `);

                    $("#btnAddSupplier").on("click", function () {
                        // Open your create supplier modal
                        $("#createsupplier").modal("show");

                        // Optional: use the search text to prefill a field
                        // $("#tin").val($("#searchSupplier").val().trim());
                    });

                    return;
                }

                response.forEach(function (supplier) {

                    const fullname = [
                        supplier.lastname,
                        supplier.firstname
                    ].filter(Boolean).join(", ");

                    const displayName =
                        supplier.corporation || fullname || "Unnamed Supplier";

                    const tinBranch = [
                        supplier.tin,
                        supplier.branchCode
                    ].filter(Boolean).join("-");

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
                        .text(supplier.address || "No address")
                        .appendTo(details);

                    // Edit button on the right
                    const editButton = $("<button>")
                        .attr("type", "button")
                        .addClass("btn btn-sm btn-info border-0")
                        .html('<i class="bi bi-pencil-square"></i> Edit')
                        .on("click", function () {
                            Get_Supplier(supplier.id);
                        });

                    item.append(details, editButton);
                    results.append(item);
                });
            },

            error: function (xhr) {
                console.error(xhr.responseText);

                results.html(`
                <div class="text-danger text-center py-2">
                    Failed to load suppliers.
                </div>
            `);
            }
        });
    });
});
function validateTIN(tin) {
    return /^\d{3}-\d{3}-\d{3}$/.test(tin);
}
function Open_Create_Supplier() {
    const inputtin = ($("#searchSuppliertin").val() || "").trim();

    const inputtincode = ($("#searchSupplierBranchCode").val() || "")
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

    $("#createsuppliertin").val(inputtin);
    $("#createsuppliertincode").val(inputtincode);
    $("#corporation").hide();
    $("#individual").hide();
    $("#suppliersavebutton").hide();
  
    // Open modal only after successful validation
    opencreatesupplierModal();
}

function Create_Show_Selected_Type() {
    const typeid = parseInt($("#suppliettypeid").val()) || 0;
    if (typeid === 1) { // Individual
        $("#corporation").hide();
        $("#individual").show();
        $("#suppliersavebutton").show();
        $("#individualtradename").show();

        $("#suppliercorporation").val("");
    }
    else if (typeid === 2) { // Corporation
        $("#corporation").show();
        $("#individual").hide();
        $("#suppliersavebutton").show();
        $("#individualtradename").hide();

        $("#supplierfname").val("");
        $("#supplierlname").val("");
        $("#suppliermname").val("");
        $("#suppliersufix").val("");
    }
    else {
        $("#corporation").hide();
        $("#individual").hide();
        $("#suppliersavebutton").hide();
    }
}
function Update_Show_Selected_Type() {
    const typeid = parseInt($("#upsuppliettypeid").val()) || 0;
    if (typeid === 1) { // Individual
        $("#upcorporation").hide();
        $("#upindividual").show();
        $("#upsuppliersavebutton").show();
        $("#upindividualtradename").show();

        $("#upsuppliercorporation").val("");
    }
    else if (typeid === 2) { // Corporation
        $("#upcorporation").show();
        $("#upindividual").hide();
        $("#suppliersavebutton").show();
        $("#individualtradename").hide();

        $("#upsupplierfname").val("");
        $("#upsupplierlname").val("");
        $("#upsuppliermname").val("");
        $("#upsuppliersufix").val("");
    }
    else {
        $("#upcorporation").hide();
        $("#upindividual").hide();
        $("#upsuppliersavebutton").hide();
    }
}
function Get_Supplier(Id) {
    $.ajax({
        url: '/Supplier/Get_Supplier',
        type: 'GET',
        data: { Id: Id },
        success: function (supplier) {
            $('#upsupplierid').val(supplier.id);
            $('#upsuppliettypeid').val(supplier.type);
            $('#upsuppliertin').val(supplier.tin);
            const branchCode = (supplier.branchCode || "")
                .toString()
                .replace(/\D/g, "")
                .slice(-4)
                .padStart(4, "0");
            $('#upsuppliertincode').val(branchCode);
            $('#upsupplierlname').val(supplier.lastname);
            $('#upsupplierfname').val(supplier.firstname);
            $('#upsuppliermname').val(supplier.middleInitial);
            $('#upsuppliersufix').val(supplier.suffix);
            $('#upsuppliercorporation').val(supplier.corporation);
            $('#upsupplieraddress').val(supplier.address);
            $('#upsupplierzipcode').val(supplier.zipCode);
            $('#upsuppliertradename').val(supplier.tradename);
            $('#upsuppliertagreg').val(supplier.taxReg);

            openupdatesupplierModal();
            Update_Show_Selected_Type();
        },
        error: function () {
            Swal.fire(
                'Error',
                'Unable to load supplier information',
                'error');
        }
    });
}
function Update_Supplier() {
    const supplierdata = {
        Id: $('#upsupplierid').val(),
        Type: $('#upsuppliettypeid').val(),
        Tin: $('#upsuppliertin').val(),
        BranchCode: $('#upsuppliertincode').val(),
        Lastname: $('#upsupplierlname').val(),
        Firstname: $('#upsupplierfname').val(),
        MiddleInitial: $('#upsuppliermname').val(),
        Suffix: $('#upsuppliersufix').val(),
        Corporation: $('#upsuppliercorporation').val(),
        Address: $('#upsupplieraddress').val(),
        ZipCode: $('#upsupplierzipcode').val(),
        Tradename: $('#upsuppliertradename').val(),
        TaxReg: $('#upsuppliertagreg').val()
    };
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to update this supplier?",
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
            fetch('/Supplier/Update_Supplier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(supplierdata)
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
                            window.location.href = '/Supplier/Supplier_Index';
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