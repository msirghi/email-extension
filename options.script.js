function saveToStorage(key, value, callback) {
  chrome.storage.sync.set({ [key]: value }, callback);
}

function getFromStorage(key, callback) {
  chrome.storage.sync.get([key], callback);
}

function save(e) {
  e.preventDefault();
  const domainField = document.getElementById('domain-field');
  const patternField = document.getElementById('pattern-field');

  if (domainField) {
    saveToStorage('domain', domainField.value.replace(/\s/g, ''), () => {});
  }

  if (patternField.value) {
    saveToStorage('pattern', patternField.value.replace(/\s/g, ''), () => {});
  }
  alert('Data was successfully saved.');
}

function initialize() {
  const domainField = document.getElementById('domain-field');
  const patternField = document.getElementById('pattern-field');

  if (domainField) {
    getFromStorage('domain', (res) => {
      if (res && res.domain) {
        domainField.value = res.domain;
      }
    });
  }

  if (patternField) {
    getFromStorage('pattern', (res) => {
      if (res && res.pattern) {
        patternField.value = res.pattern;
      }
    });
  }
}

document.getElementById('save-button').addEventListener('click', save);
window.addEventListener('load', initialize);
