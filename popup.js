document.addEventListener('DOMContentLoaded', function() {
    let applyButton = document.getElementById('applyRotation');
    applyButton.addEventListener('click', function() {
      let tagName = document.getElementById('tagName').value;
      let duration = document.getElementById('duration').value;
      let classNameInput = document.getElementById('className');
      let degrees = document.getElementById('degrees').value;
  
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getElements"}, function(response) {
          if(response && response.elements) {
            response.elements.forEach(function(element) {
              let option = document.createElement('option');
              option.value = JSON.stringify(element);
              option.textContent = `${element.tag}${element.class ? '.' + element.class : ''}`;
              elementSelector.appendChild(option);
            });
          }
        });
      });
      elementSelector.addEventListener('change', function() {
        if(this.value) {
          var selectedElement = JSON.parse(this.value);
          tagNameInput.value = selectedElement.tag;
          classNameInput.value = selectedElement.class || '';
        }
      });
      applyButton.addEventListener('click', function() {
        var tagName = tagNameInput.value;
        var className = classNameInput.value;
        var duration = document.getElementById('duration').value;
        var degrees = document.getElementById('degrees').value;
        var continuousRotation = document.getElementById('continuousRotation').checked;
        
        if (!tagName || !duration || !degrees) {
          alert('Пожалуйста, заполните все обязательные поля');
          return;
        }
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "applyRotation",
          tagName: tagName,
          duration: duration,
          degrees: degrees
        });
      });
    });
  });


  // document.addEventListener('DOMContentLoaded', function() {
  //   var applyButton = document.getElementById('applyRotation');
  //   applyButton.addEventListener('click', function() {
  //     var tagName = document.getElementById('tagName').value;
  //     var duration = document.getElementById('duration').value;
  //     var degrees = document.getElementById('degrees').value;
  //     var continuousRotation = document.getElementById('continuousRotation').checked;
      
  //     if (!tagName || !duration || !degrees) {
  //       alert('Пожалуйста, заполните все поля');
  //       return;
  //     }
  
  //     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //       chrome.tabs.sendMessage(tabs[0].id, {
  //         action: "applyRotation",
  //         tagName: tagName,
  //         duration: duration,
  //         degrees: degrees,
  //         continuousRotation: continuousRotation
  //       });
  //     });
  //   });
  // });