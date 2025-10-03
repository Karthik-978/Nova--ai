// 📷 Start camera
const video = document.getElementById("video");

navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    document.getElementById("response").innerText = "Camera error: " + err;
  });

// 🎤 Start voice input
function startVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  document.getElementById("response").innerText = "Listening... 🎙️";

  recognition.onresult = async function (event) {
    const text = event.results[0][0].transcript;
    document.getElementById("response").innerText = "You said: " + text;

    const reply = await getAIResponse(text);
    document.getElementById("response").innerText = reply;

    const utter = new SpeechSynthesisUtterance(reply);
    window.speechSynthesis.speak(utter);
  };

  recognition.onerror = function () {
    document.getElementById("response").innerText = "Voice error. Try again.";
  };
}

// 🤖 Call backend to talk with OpenAI
async function getAIResponse(userInput) {
  try {
    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    return data.reply;
  } catch (error) {
    return "Error: Cannot reach AI server.";
  }
}
