
document.addEventListener("DOMContentLoaded", function () {
    $("#reconsearchitem").on("input", function () {
        $("#btnClearSearch").toggle($(this).val().length > 0);
    });

    $("#btnClearSearch").on("click", function () {
        $("#reconsearchitem").val("").trigger("input").focus();
    });

  /*  const today = new Date().toLocaleDateString('en-CA');

    $("#recondatefrom").val(today);
    $("#recondateto").val(today);*/

    $("#reconsearchitem ,#recontranstype ,#recondatefrom , #recondateto ").on("input change", function () {

        const getreconsearchitem = $("#reconsearchitem").val();
        const transtype = $("#recontranstype").val();
        const fromValue = $("#recondatefrom").val();
        const toValue = $("#recondateto").val();

        const getrecondatefrom = fromValue
            ? new Date(fromValue).toISOString().split('T')[0]
            : null;

        const getrecondateto = toValue
            ? new Date(toValue).toISOString().split('T')[0]
            : null;
        const gettranstype = Number(transtype);
        const results = $("#accountreconResults");

   /*     console.log(getreconsearchitem);*/
        console.log(gettranstype);
       /* console.log(getrecondatefrom);
        console.log(getrecondateto);
*/
        /*if (!reconsearchitem) {
            results.empty();
            return;
        }*/

        $.ajax({
            url: "/AccountRecon/Search_AccountRecoon",
            type: "GET",
            data: {
                TransType: gettranstype,
                SearchItem: getreconsearchitem,
                Datefrom: getrecondatefrom,
                Dateto: getrecondateto
            },

            success: function (response) {
                results.empty();

                if (!response || response.length === 0) {
                    results.html(`
                    <div class="text-center py-3">
                        <div class="text-muted mb-2">
                            <i class="bi bi-info-circle me-1"></i>
                            No Data found.
                        </div>
                    </div>
                `);

                    return;
                }

                response.forEach(function (data) {

                    let displayName = null;
                    const bodofficerpcf = data.bodoffcrId;
                    if (bodofficerpcf === 1 || bodofficerpcf === 2) {
                        displayName = [data.supplierName, data.bodoffcrName]
                            .filter(Boolean)
                            .join(" || ") || data.accounTitle;
                    } else {
                        displayName = data.supplierName || data.accounTitle;
                    }
                    const grossAmt = Number(data.grossAmt || 0).toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                    const exemptAmt = Number(data.exemptAmt || 0).toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                    const total = Number(data.total || 0).toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                    const getdate = data.date
                        ? new Date(data.date).toISOString().split('T')[0]
                        : null;
                 
                    // Main result container
                    const item = $("<div>")
                        .addClass("recon-result-item d-flex align-items-center justify-content-between gap-3");

                    // Supplier details on the left
                    const details = $("<div>")
                        .addClass("flex-grow-1");

                    $("<div>")
                        .addClass("recon-result-name")
                        .text(displayName)
                        .appendTo(details);
                    $("<small>")
                        .addClass("text-muted d-block")
                        .text("Date: " + getdate + " Branch: " + (data.branchDesc || "N/A"))
                        .appendTo(details);
                    $("<small>")
                        .addClass("text-muted d-block ")
                        .text("TIN: " + (data.tin || "N/A") + " Account Title: " + (data.accounTitle || "N/A"))
                        .appendTo(details);

                    $("<small>")
                        .addClass("text-muted d-block")
                        .text("Gross Amount: " + grossAmt +
                            " Exempt Amount: " + exemptAmt +
                        " Total: " + total)
                        .appendTo(details);

                    // Edit button on the right
                    const editButton = $("<button>")
                        .attr("type", "button")
                        .addClass("btn btn-sm btn-info border-0")
                        .html('<i class="bi bi-pencil-square"></i> Edit')
                        .on("click", function () {
                            //Get_Tenants(data.id);
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
