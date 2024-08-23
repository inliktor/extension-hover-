chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getElements") {
    const elements = document.getElementsByTagName('*');
    const uniqueElements = [];
    const addedElements = new Set();

    for (let i = 0; i < elements.length; i++) {
      const tagName = elements[i].tagName.toLowerCase();
      let className = elements[i].className;

      if (typeof className !== 'string') {
        className = '';
      } else {
        className = className.trim();
      }

      const key = tagName + (className ? '.' + className : '');

      if (!addedElements.has(key)) {
        uniqueElements.push({tag: tagName, class: className});
        addedElements.add(key);
      }
    }

    sendResponse({elements: uniqueElements});
    return true;
  } else if (request.action === "applyRotation") {
    let elements;
    if (request.className) {
      elements = document.querySelectorAll(`${request.tagName}.${request.className}`);
    } else {
      elements = document.getElementsByTagName(request.tagName);
    }
    
    if (elements.length === 0) {
      console.log(`Элементы не найдены.`);
      sendResponse({success: false});
      return true;
    }

    const styleId = 'rotate-animation-style';
    let style = document.getElementById(styleId);
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }

    const css = `
      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(${request.degrees}deg); }
      }
    `;
    style.textContent = css;

    for (let i = 0; i < elements.length; i++) {
      elements[i].style.animation = `rotate ${request.duration}s linear infinite`;
      elements[i].style.display = 'inline-block';
      
      if (!request.continuousRotation) {
        elements[i].style.animationPlayState = 'paused';
        
        elements[i].addEventListener('mouseover', function() {
          this.style.animationPlayState = 'running';
        });
        
        elements[i].addEventListener('mouseout', function() {
          this.style.animationPlayState = 'paused';
        });
      }
    }

    sendResponse({success: true});
    return true;
  }
});
