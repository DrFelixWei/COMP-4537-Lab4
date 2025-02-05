// ChatGPT was used to aid in the creation of the follow code.
import { messages } from '../locals/en.js';
document.getElementById('title').innerHTML = messages.storeDefinitionText;
document.getElementById('wordText').innerHTML = messages.wordText;
document.getElementById('definitionText').innerHTML = messages.definitionText;
document.getElementById('submitButton').innerHTML = messages.submitText;

function storeWord(){
    const xhttp = new XMLHttpRequest();
    const url = `https://lab4-nc3tg.ondigitalocean.app/api/definitions`;
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;

    if(!word || !definition){
        document.getElementById('response').innerHTML = `<strong>${messages.errorText}</strong> ${messages.provideWordText}`;
        return;
    }

    const textPattern = /^[A-Za-z\s.,'’-]+$/;
    if (!textPattern.test(word) || !textPattern.test(definition)) {
        document.getElementById('response').innerHTML = `<strong>${messages.errorText}</strong>${messages.onlyLettersText}`;
        return;
    }
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify({ word, definition }));
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200 || this.status === 201) { 
        const response = JSON.parse(this.responseText);
        console.log(response);
        document.getElementById('response').innerHTML = `<strong>${messages.successText}</strong> ${response.message}`;
      }else{
        const response = JSON.parse(this.responseText);
        document.getElementById('response').innerHTML = `<strong>${messages.errorText}</strong> ${response.message}`;
        }
    };
  }
 window.storeWord = storeWord;
