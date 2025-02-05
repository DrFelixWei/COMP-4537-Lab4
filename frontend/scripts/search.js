// Get request for search
function searchDefinition(){
    const xhttp = new XMLHttpRequest();
    const word = document.getElementById('search').value;
    const url = `http://localhost:8080/api/definitions?word=${word}`;
    xhttp.open('GET', url, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        document.getElementById('response').innerHTML = `<strong>Definition:</strong> ${response.definition}`;
        console.log(response);
      }else if(this.status === 404){
        console.log(this.status, typeof this.status);
        const response = JSON.parse(this.responseText);
        document.getElementById('response').innerHTML = `<strong>Error:</strong> ${response.message}`;
      }else if(this.status === 400){
        const response = JSON.parse(this.responseText);
        document.getElementById('response').innerHTML = `<strong>Error:</strong> ${response.message}`;
        }
    };
  
  }