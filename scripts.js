document.getElementById('ask-btn').addEventListener('click', async () => {
    const question = document.getElementById('question-input').value.trim();
    const outputDiv = document.getElementById('output');
  
    if (!question) {
      alert("Please type a question!");
      return;
    }
  
    outputDiv.innerHTML = "<p>Thinking...</p>";
    outputDiv.style.display = "block";
  
    try {
      const response = await fetch('http://127.0.0.1:5000/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
  
      const data = await response.json();
  
      if (data.answer) {
        outputDiv.innerHTML = `<h3>Answer:</h3><p>${data.answer}</p>`;
      } else {
        outputDiv.innerHTML = `<p>Error: ${data.error || "Unable to get a response"}</p>`;
      }
    } catch (error) {
      outputDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  });
  
