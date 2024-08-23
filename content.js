// Слушатель сообщений от popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Обработка запроса на получение элементов страницы
  if (request.action === "getElements") {
    let elements = document.getElementsByTagName('*');
    let uniqueElements = [];
    let addedElements = new Set();

    // Сбор уникальных комбинаций тегов и классов
    for (let i = 0; i < elements.length; i++) {
      let tagName = elements[i].tagName.toLowerCase();
      let className = elements[i].className;
      let key = tagName + (className ? '.' + className : ''); 

      if (!addedElements.has(key)) {
        uniqueElements.push({tag: tagName, class: className});
        addedElements.add(key);
      }
    }

    // Отправка собранных элементов обратно в popup
    sendResponse({elements: uniqueElements});
    return true;
  } 
  // Обработка запроса на применение вращения
  else if (request.action === "applyRotation") {
    let elements;
    // Выбор элементов по тегу и классу (если указан)
    if (request.className) {
      elements = document.querySelectorAll(request.tagName + '.' + request.className);
    } else {
      elements = document.getElementsByTagName(request.tagName);
    }
    
    if (elements.length === 0) {
      console.log(`Элементы не найдены.`);
      return;
    }

    // Создание стиля с анимацией вращения
    const css = `
      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(${request.degrees}deg); }
      }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    // Применение анимации к каждому найденному элементу
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.animation = `rotate ${request.duration}s linear infinite`;
      elements[i].style.display = 'inline-block';
      
      // Если выбрано не постоянное вращение, добавляем обработчики событий
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
  }
});


