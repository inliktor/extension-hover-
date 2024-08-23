document.addEventListener('DOMContentLoaded', function() {
  const elementSelector = document.getElementById('elementSelector');
  const tagNameInput = document.getElementById('tagName');
  const classNameInput = document.getElementById('className');
  const applyButton = document.getElementById('applyRotation');
  const durationInput = document.getElementById('duration');
  const degreesInput = document.getElementById('degrees');
  const continuousRotationCheckbox = document.getElementById('continuousRotation');

  // Получаем список элементов со страницы
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "getElements"}, function(response) {
      if(response && response.elements) {
        response.elements.forEach(function(element) {
          const option = document.createElement('option');
          option.value = JSON.stringify(element);
          option.textContent = `${element.tag}${element.class ? '.' + element.class : ''}`;
          elementSelector.appendChild(option);
        });
      }
    });
  });

  // Обработчик изменения выбранного элемента
  elementSelector.addEventListener('change', function() {
    if(this.value) {
      const selectedElement = JSON.parse(this.value);
      tagNameInput.value = selectedElement.tag;
      classNameInput.value = selectedElement.class || '';
    }
  });

  applyButton.addEventListener('click', function() {
    const tagName = tagNameInput.value.trim();
    const className = classNameInput.value.trim();
    const duration = durationInput.value.trim();
    const degrees = degreesInput.value.trim();
    const continuousRotation = continuousRotationCheckbox.checked;
    
    if (!tagName || !duration || !degrees) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "applyRotation",
        tagName: tagName,
        className: className,
        duration: parseFloat(duration),
        degrees: parseFloat(degrees),
        continuousRotation: continuousRotation
      }, function(response) {
        if (response && response.success) {
          alert('Вращение применено успешно!');
        } else {
          alert('Произошла ошибка при применении вращения.');
        }
      });
    });
  });
});
