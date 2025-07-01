function startVoice() {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.start();
  document.getElementById("response").innerText = "Listening... 🎙️";
  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript;
    document.getElementById("response").innerText = "You said: " + text;
    respond(text);
  };
}
function respond(text) {
  let response = "I'm not sure how to answer that.";
  if (text.includes("hello")) response = "Hi, I’m Nova! How can I help you?";
  else if (text.includes("your name")) response = "I am Nova, your personal AI assistant.";
  else if (text.includes("how are you")) response = "I’m running perfectly, thanks for asking!";
  else if (text.includes("who created you")) response = "I was created by Karthik, the soul behind Nova.";
  document.getElementById("response").innerText = response;
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(response);
  synth.speak(utter);
}
const video = document.getElementById("video");
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    document.getElementById("response").innerText = "Camera error: " + err;
  });function getAIResponse(userInput) {
  userInput = userInput.toLowerCase();

  if (userInput.includes("hello")) {
    return "Hello! I'm Nova 👋";
  } else if (userInput.includes("your name")) {
    return "I'm Nova, your AI companion!";
  } else if (userInput.includes("how are you")) {
    return "I'm doing great! How about you?";
  } else if (userInput.includes("bye")) {
    return "Goodbye! See you soon!";
  } else {
    return "Hmm... I'm not sure how to answer that yet, but I'm learning!";
  }
}
