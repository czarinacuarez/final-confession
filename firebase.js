

// Your web app's Firebase configuration
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
  
   var confessionDB = firebase.database().ref("confessionwall");
   document.getElementById("confession").addEventListener("submit", submitForm);
  
  
   function submitForm(e) {
    e.preventDefault();
  
    var name = getElementVal("name").replace(/'/g, '');
    var msgContent = getElementVal("msgContent").replace(/'/g, '');
    var date = getElementVal("date");


    saveMessages(name, date, msgContent);

   
    Swal.fire({
      title: "Message Sent!",
      text: "Your message has been successfully sent!",
      icon: "success"
    });
 
  

    // Reload the page after a short delay (adjust the timeout value as needed)
    setTimeout(function() {
      window.location.reload();
  }, 1000); //

   }
  
  const saveMessages = (name, date, msgContent) => {
    var newContactForm = confessionDB.push();
  
    newContactForm.set({
      name: name,
      date:date,
      msgContent: msgContent,
    });
  };
  
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };
  
  

// Function to show the modal
function showModal(data) {
  data = JSON.parse(decodeURIComponent(data));

  // Update modal content with data for the clicked entry
  document.getElementById('to-modal-content').textContent = "" + data.name;
  document.getElementById('date-modal-content').textContent = "" + data.date;
  document.getElementById('message-modal-content').textContent = data.msgContent;

  // Show the modal
  document.getElementById('customModal').classList.remove('hidden');
}



// Function to handle DOMContentLoaded event
function onDOMContentLoaded() {
  console.log('DOM is ready!');
 
  $("#simple-search").on('keyup', function(){
      let value = $(this).val().toLowerCase();  
      $('#main-grid a[data-name]').each(function () {
        if ($(this).text().toLowerCase().indexOf(value) === -1) {
            $(this).hide();
        } else {
            $(this).show();
        }
      });
    });
  confessionDB.orderByKey().once("value")
      .then(function (snapshot) {
          // Check if there are any children
          if (snapshot.exists()) {
              // Get the parent element where you want to append the entry content
              const parentElement = document.getElementById('main-grid');
              const entries = [];

              // Iterate through each child snapshot and store data in an array
              snapshot.forEach(function (childSnapshot) {
                  const data = childSnapshot.val();
                  if (data !== null && typeof data !== 'undefined') {
                      entries.push(data);
                  }
              });

              entries.reverse();
                // Update the HTML content of the parent element
          entries.forEach(function (data) {
              parentElement.innerHTML += `
                  <a id="displayContainer" data-name="${data.name}" onclick="showModal('${encodeURIComponent(JSON.stringify(data))}')" class="block cursor-pointer bg-rose-300 max-w-2xl p-8 border border-gray-200 rounded-lg shadow overflow-hidden">
                      <h5 id="to-label" class="mb-2 text-xl text-white inline whitespace-normal break-all font-semibold"> ${data.name}</h5>
                      <div id="" class="bg-white my-2 rounded-xl p-5 max-w-full">
                          <p id="message-content" class="font-normal line-clamp-2 whitespace-normal break-all lg:text-base md:text-sm text-xs text-gray-500 dark:text-gray-400 overflow-hidden">
                              ${data.msgContent}
                          </p>
                      </div>
                      <p id="date-content" class="font-normal text-right py-1 text-white dark:text-gray-400 overflow-hidden max-w-full">Posted ${data.date}</p>
                  </a>
              `;
          });
      } else {
          console.error("No data found in the database");
      }
  })
  .catch(function (error) {
      console.error("Error reading data: ", error);
  });
}

// Add event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
