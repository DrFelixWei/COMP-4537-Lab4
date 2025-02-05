// ChatGPT was used to aid in the creation of the follow code.
import { messages } from '../locals/en.js';
document.getElementById('title').innerHTML = messages.searchDefinitionText;
document.getElementById('enterWord').innerHTML = messages.enterWordText;
document.getElementById('searchButton').innerHTML = messages.searchText;

const searchDefinition = () => {
    const xhttp = new XMLHttpRequest();
    const word = document.getElementById('search').value;
    const textPattern = /^[A-Za-z\s.,'’-]+$/;

    if (!word) {
        document.getElementById('response').innerHTML = `<strong>${messages.errorText}</strong> ${messages.provideWordText}`;
        return;
    }
    if (!textPattern.test(word)) {
        document.getElementById('response').innerHTML = `<strong>${messages.errorText}</strong> ${messages.onlyLettersText}`;
        return;
    }
    const url = `https://lab4-nc3tg.ondigitalocean.app/api/definitions?word=${word}`;
    xhttp.open('GET', url, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        console.log(response);
        document.getElementById('response').innerHTML = `<strong>${messages.definitionText}</strong> ${response.definition}`;
        console.log(response);
      }else {
        const response = JSON.parse(this.responseText);
        document.getElementById('response').innerHTML = `<strong>${messages.errorText}</strong> ${response.message}`;
      }
    };
  }
  window.searchDefinition = searchDefinition;
