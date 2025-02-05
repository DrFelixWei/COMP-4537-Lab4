
function storeWord(){
    const xhttp = new XMLHttpRequest();
    const url = `http://localhost:8080/api/definitions`;
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify({ word, definition }));
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        const response = JSON.parse(this.responseText);
        console.log(response);
      }else if(this.status === 400){
        const response = JSON.parse(this.responseText);
        document.getElementById('response').innerHTML = `<strong>Error:</strong> ${response.message}`;
        }
    };
  }