const snippetList = document.getElementById('snippetList');

function loadSnippets() {
  const snippets = JSON.parse(localStorage.getItem('snippets') || '[]');
  snippetList.innerHTML = '<h2>Saved Snippets</h2>';
  snippets.forEach((snippet, index) => {
const div = document.createElement('div');
div.className = 'snippet';
div.innerHTML = `
  <strong>${snippet.title}</strong>
  <pre>${snippet.code}</pre>
  <button class="delete-btn" onclick="deleteSnippet(${index})">Delete</button>
  <button class="download-btn" onclick="downloadSnippet('${snippet.title}', \`${snippet.code}\`)">Download</button>
`;
snippetList.appendChild(div);
  });
}

function addSnippet() {
  const title = document.getElementById('title').value.trim();
  const code = document.getElementById('code').value.trim();
  if (!title || !code) return alert('Please enter both title and code!');
  const snippets = JSON.parse(localStorage.getItem('snippets') || '[]');
  snippets.push({ title, code });
  localStorage.setItem('snippets', JSON.stringify(snippets));
  document.getElementById('title').value = '';
  document.getElementById('code').value = '';
  loadSnippets();
}

function deleteSnippet(index) {
  const snippets = JSON.parse(localStorage.getItem('snippets') || '[]');
  snippets.splice(index, 1);
  localStorage.setItem('snippets', JSON.stringify(snippets));
  loadSnippets();
}

function downloadSnippet(title, code) {
  const blob = new Blob([code], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `saves/${title.replace(/\s+/g, '_')}.md`;
  a.click();
}

function downloadAllSnippets() {
  const snippets = JSON.parse(localStorage.getItem('snippets') || '[]');
  snippets.forEach(snippet => {
downloadSnippet(snippet.title, snippet.code);
  });
}

// Load starter snippets if none exist
if (!localStorage.getItem('snippets')) {
  const starterSnippets = [
{
  title: 'Basic HTML Page',
  code: `<html>\n  <head><title>Hello</title></head>\n  <body>\n<h1>Hello World!</h1>\n  </body>\n</html>`
},
{
  title: 'Simple CSS Button',
  code: `button {\n  background: blue;\n  color: white;\n  padding: 10px;\n  border-radius: 5px;\n}`
},
{
  title: 'JS Alert on Click',
  code: `document.querySelector('button').addEventListener('click', () => {\n  alert('Button clicked!');\n});`
}
  ];
  localStorage.setItem('snippets', JSON.stringify(starterSnippets));
}

loadSnippets();