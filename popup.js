document.addEventListener('DOMContentLoaded', function() {
    var applyButton = document.getElementById('applyRotation');
    applyButton.addEventListener('click', function() {
      var tagName = document.getElementById('tagName').value;
      var duration = document.getElementById('duration').value;
      var degrees = document.getElementById('degrees').value;
  
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