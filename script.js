function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-IN";
  recognition.start();

  document.getElementById("response").innerText = "Listening... 🎙️";

  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript.toLowerCase();
    document.getElementById("response").innerText = "You said: " + text;
    const reply = getAIResponse(text);
    document.getElementById("response").innerText = reply;

    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(reply);
    synth.speak(utter);
  };

  recognition.onerror = function () {
    document.getElementById("response").innerText = "Sorry, I didn’t catch that. Try again!";
  };
}

function getAIResponse(userInput) {
  if (userInput.includes("hello") || userInput.includes("hi")) {
    return "Hey there! I’m Nova 👋";
  } else if (userInput.includes("your name")) {
    return "I'm Nova, your intelligent companion!";
  } else if (userInput.includes("how are you")) {
    return "I’m doing great, thanks for asking!";
  } else if (userInput.includes("who created you")) {
    return "I was built by Karthik, my creator!";
  } else if (userInput.includes("bye")) {
    return "Goodbye! Take care!";
  } else {
    return "Hmm, I’m not sure how to answer that yet, but I’m learning!";
  }
}

const video = document.getElementById("video");
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    document.getElementById("response").innerText = "Camera error: " + err;
  });
