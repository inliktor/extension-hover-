chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "applyRotation") {
      const elements = document.getElementsByTagName(request.tagName);
      
      if (elements.length === 0) {
        console.log(`Элементы с тегом ${request.tagName} не найдены.`);
        return;
      }
  
      const css = `
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(${request.degrees}deg); }
        }
      `;
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
  
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.animation = `rotate ${request.duration}s linear infinite`;
        elements[i].style.display = 'inline-block';
        elements[i].style.animationPlayState = 'paused';
        
        elements[i].addEventListener('mouseover', function() {
          this.style.animationPlayState = 'running';
        });
        
        elements[i].addEventListener('mouseout', function() {
          this.style.animationPlayState = 'paused';
        });
      }
    }
  });