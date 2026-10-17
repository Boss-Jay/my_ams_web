
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
});
function OpenModal_CreateAccount(selcoaid, selcoadesc, sellevel) {

    $.ajax({
        url: '/ChartofAccounts/Get_Max_Accnt_Code',
        type: 'GET',
        data: { coaid: selcoaid, level: sellevel },
        success: function (account) {
            $('#coasubcoaid').val(account);
            $('#coacoaid').text(selcoaid);
            $('#coacoaid').val(selcoaid);
            $('#coacoadesc').val(selcoadesc);
         
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
$(document).on("click", ".open-account", function (e) {
    e.preventDefault();

    const selcoaid = $(this).data("coaid");
    const selcoadesc = $(this).attr("data-account-desc");
    const sellevel = $(this).data("data-level");

    OpenModal_CreateAccount(selcoaid, selcoadesc, sellevel);
});