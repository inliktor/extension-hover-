chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "applyRotation") {
      var elements = document.getElementsByTagName(request.tagName);
      var css = `
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(${request.degrees}deg); }
        }
      `;
      var style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
  
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.animation = `rotate ${request.duration}s linear infinite`;
        elements[i].style.display = 'inline-block';
        
        elements[i].addEventListener('mouseover', function() {
          this.style.animationPlayState = 'running';
        });
        
        elements[i].addEventListener('mouseout', function() {
          this.style.animationPlayState = 'paused';
        });
      }
    }
  });