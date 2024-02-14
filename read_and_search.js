document.addEventListener("DOMContentLoaded", function() {
    const firebaseConfig = {
        apiKey: "AIzaSyCBHLkEHuq0AloJT6PmfBbMdNiU48exOFQ",
        authDomain: "confessionwall-70aca.firebaseapp.com",
        databaseURL: "https://confessionwall-70aca-default-rtdb.firebaseio.com",
        projectId: "confessionwall-70aca",
        storageBucket: "confessionwall-70aca.appspot.com",
        messagingSenderId: "1007893096286",
        appId: "1:1007893096286:web:df104b2100717e7c11d1cf"
    };

    firebase.initializeApp(firebaseConfig);
    let confessionDB = firebase.database().ref("confessionwall");
    let searchInput = document.getElementById("simple-search");



    confessionDB.once('value', function(snapshot) {
        let mainGrid = document.getElementById("main-grid");
        let defaultModal = document.getElementById("default-modal");

        snapshot.forEach(function(childSnapshot) {
            let date = childSnapshot.val().date;
            let name = childSnapshot.val().name;
            let message_content = childSnapshot.val().msgContent;
            let course = childSnapshot.val().program;
            let truncatedMessage = message_content;
            let fullMessage = message_content;

            if (message_content.length > 100) {
                truncatedMessage = message_content.substring(0, 100) + "...";
            }

            let a_link = document.createElement("a");
            a_link.className = "block cursor-pointer bg-rose-300 max-w-2xl p-8 border border-gray-200 rounded-lg shadow overflow-hidden";
            a_link.setAttribute("data-modal-target", "default-modal");
            a_link.setAttribute("data-modal-toggle", "default-modal");
            mainGrid.appendChild(a_link);

            let toLabel = document.createElement("h5");
            toLabel.className = "mb-2 sender_name text-xl text-white inline whitespace-normal break-all font-semibold";
            toLabel.textContent = "To: " + name;
            a_link.appendChild(toLabel);

            let message_display = document.createElement("div");
            message_display.className = "bg-white my-2  rounded-xl p-5 max-w-full";
            a_link.appendChild(message_display);

            let paragraph_display = document.createElement("p");
            paragraph_display.className = "font-normal message-content inline whitespace-normal break-all lg:text-base md:text-sm text-xs text-gray-500 dark:text-gray-400 overflow-hidden";
            paragraph_display.textContent = truncatedMessage;
            paragraph_display.setAttribute("data-full-message", fullMessage);
            message_display.appendChild(paragraph_display);

            let time_display = document.createElement("p");
            time_display.className = "font-normal text-right py-1 text-white dark:text-gray-400 overflow-hidden max-w-full";
            time_display.textContent = date;
            a_link.appendChild(time_display);

            // BASTA YUNG MODAL

            message_container_modal = document.getElementById("message-container-modal");
            message_container_modal.style.wordWrap = "break-word";

            mainGrid.addEventListener("click", function(event) {
                let target = event.target;
                let message_modal = document.getElementById("message-modal");
                let name_modal_display = document.getElementById("to-modal");
            
                if (target && target.tagName === "A") {
                    let modalTarget = target.getAttribute("data-modal-target");
                    let fullMessage = target.querySelector(".message-content").getAttribute("data-full-message");
                    let name = target.querySelector("h5").textContent;

                    if (modalTarget) {
                        message_modal.textContent = fullMessage;
                        name_modal_display.textContent = name;
                        defaultModal.classList.remove("hidden");
                    }
                }
            });
            
            defaultModal.addEventListener("click", function(event) {
                let target = event.target;
                if (target && target.getAttribute("data-modal-hide")) {
                    defaultModal.classList.add("hidden");
                }
            });
            
            window.addEventListener("click", function(event) {
                if (event.target === defaultModal) {
                    defaultModal.classList.add("hidden");
                }
            });
        });

        // NEED PA AYUSIN KASI NAG SSHRINK HJFIAJSOIFAS

        searchInput.addEventListener("input", function() {
            let searchValue = searchInput.value.toLowerCase();
            let confessionLinks = mainGrid.querySelectorAll("a");

            confessionLinks.forEach(function(link) {
                let toLabel = link.querySelector("h5");
                let name = toLabel.textContent.toLowerCase();
                if (name.includes(searchValue)) {
                    link.style.display = "inline";
                } else {
                    link.style.display = "none";
                }
            });
        });
    });
});
