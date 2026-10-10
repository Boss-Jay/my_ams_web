/* =================================================
   SIDEBAR
================================================= */

const sidebar =
    document.getElementById("sidebar");

const sidebarToggle =
    document.getElementById("sidebarToggle");

if (sidebarToggle) {
    sidebarToggle.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle("collapsed");

        }

    );
}

const branchButton =
    document.getElementById("branchButton");

const branchMenu =
    document.getElementById("branchMenu");

if (branchButton)
    branchButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            /*
             * Don't open dropdown while
             * sidebar is collapsed.
             */

            if (
                sidebar.classList.contains("collapsed")
            ) {

                return;

            }
            if (branchMenu)
            branchMenu.classList.toggle("open");

        }
    );



/* =================================================
   SELECT BRANCH
================================================= */

const branchOptions =
    document.querySelectorAll(".branch-option");

const currentBranch =
    document.getElementById("currentBranch");

const dashboardBranch =
    document.getElementById("dashboardBranch");


branchOptions.forEach(
    function (option) {

        option.addEventListener(
            "click",
            function () {


                /*
                 * Get branch name
                 */

                const branch =
                    this.dataset.branch;


                /*
                 * Change selected branch
                 */
                if (currentBranch)
                    currentBranch.textContent =
                        branch;


                /*
                 * Change dashboard
                 */
                if (dashboardBranch)
                    dashboardBranch.textContent =
                        branch;


                /*
                 * Remove selected
                 * from all options
                 */

                branchOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                /*
                 * Select current option
                 */

                this.classList.add(
                    "selected"
                );


                /*
                 * Close dropdown
                 */

                branchMenu.classList.remove(
                    "open"
                );


                /*
                 * Store branch
                 */

                localStorage.setItem(
                    "selectedBranch",
                    branch
                );

            }
        );

    }
);



/* =================================================
   LOAD SAVED BRANCH
================================================= */

const savedBranch =
    localStorage.getItem("selectedBranch");


if (savedBranch) {
    if (currentBranch)
    currentBranch.textContent =
        savedBranch;
    if (dashboardBranch)
        dashboardBranch.textContent =
            savedBranch;


    branchOptions.forEach(
        function (option) {

            if (
                option.dataset.branch ===
                savedBranch
            ) {

                option.classList.add(
                    "selected"
                );

            } else {

                option.classList.remove(
                    "selected"
                );

            }

        }
    );

}



/* =================================================
   CLOSE BRANCH DROPDOWN
   WHEN CLICKING OUTSIDE
================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.closest(
                ".branch-selector"
            )
        ) {
            if (branchMenu)
            branchMenu.classList.remove(
                "open"
            );

        }

    }
);



/* =================================================
   SIDEBAR MENU DROPDOWNS
================================================= */

const dropdownButtons =
    document.querySelectorAll(
        ".sidebar-dropdown"
    );


dropdownButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                /*
                 * Don't open menu if
                 * sidebar is collapsed.
                 */

                if (
                    sidebar.classList.contains(
                        "collapsed"
                    )
                ) {

                    return;

                }


                const submenu =
                    this.nextElementSibling;


                /*
                 * Close other menus
                 */

                dropdownButtons.forEach(
                    function (otherButton) {

                        if (
                            otherButton !== button
                        ) {

                            otherButton.classList
                                .remove("open");


                            const otherSubmenu =
                                otherButton
                                    .nextElementSibling;


                            if (otherSubmenu) {

                                otherSubmenu.classList
                                    .remove("open");

                            }

                        }

                    }
                );


                /*
                 * Toggle current menu
                 */

                this.classList.toggle(
                    "open"
                );


                submenu.classList.toggle(
                    "open"
                );

            }
        );

    }
);
