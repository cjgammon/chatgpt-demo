
let apiKey = '';

let messages = [];

function init() {

  inputField.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      handle_QUERY();
    }
  });
  submitBtn.addEventListener('click', () => handle_QUERY());
}

function handle_QUERY() {

  const div = document.createElement('div');
  div.classList.add('message');
  div.classList.add('user');
  div.innerHTML = inputField.value;
  results.appendChild(div);
    
  results.scrollTop = results.scrollHeight;

  messages.push({
    'role': 'user',
    'content': inputField.value
  })

  fetch(`https://api.openai.com/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages 
    })
  })
  .then(response => response.json())
  .then(data => {

    messages.push({
      'role': 'assistant',
      'content': data.choices[0].message.content 
    });


    const div = document.createElement('div');
    div.classList.add('message');
    div.classList.add('bot');
    div.innerHTML = data.choices[0].message.content;
    results.appendChild(div);

    //scroll to bottom of results
    results.scrollTop = results.scrollHeight;
  });

}

fetch('./config.json')
  .then(response => response.json())
  .then(data => {
    apiKey = data.apiKey;
    init();
  });
