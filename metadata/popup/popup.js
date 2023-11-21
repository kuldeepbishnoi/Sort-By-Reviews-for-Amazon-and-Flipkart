const savedValue = localStorage.getItem("sliderValue");
sendValue(savedValue);

if (document.readyState !== "loading") {
  inputListner();
  inputRetriever();
  // testing();
}else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded");
    inputListner();
    inputRetriever();
    // testing();
  })
} 


async function sendValue(value){
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": value});
    console.log("sent message " + value);
});
}

// function inputRetriever(){
//   const savedValue = localStorage.getItem("sliderValue");
//   if (savedValue) {
//     const slider = document.getElementById("slider");
//     const sliderValue = document.getElementById("sliderValue");
//     slider.value = savedValue;
//     sliderValue.textContent = savedValue;
//     // chrome.runtime.sendMessage({sliderValue: savedValue});
//        // Send the sliderValue to the content script
//       //  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       //   chrome.scripting.executeScript({
//       //     target: { tabId: tabs[0].id },
//       //     function: (value) => {
//       //       chrome.runtime.sendMessage({ sliderValue: value });
//       //     },
//       //     args: [savedValue],
//       //   });
//       // });
//       sendValue(savedValue);
//   }
// };

function inputListner() {
  const slider = document.getElementById("slider");
  const sliderValue = document.getElementById("sliderValue");

  slider.addEventListener('input', () => {
    const value = slider.value;
    sliderValue.textContent = value;
    console.log(value);
    // Save the value to localStorage
    localStorage.setItem("sliderValue", value);
    // chrome.runtime.sendMessage({sliderValue: value});
       // Send the sliderValue to the content script
      //  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //   chrome.scripting.executeScript({
      //     target: { tabId: tabs[0].id },
      //     function: (value) => {
      //       chrome.runtime.sendMessage({ sliderValue: value });
      //     },
      //     args: [savedValue],
      //   });
      // });
      sendValue(value);
  });
};

// function testing(){
//     // console.log("running test");
//     // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     //   if (request.sliderValue){
//     //     console.log(message.sliderValue + " " + typeof(message.sliderValue));
//     // }});
// };