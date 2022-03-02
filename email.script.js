function setNativeValue(element, value) {
  let lastValue = element.value;
  element.value = value;
  let event = new Event('input', { target: element, bubbles: true });
  // React 15
  event.simulated = true;
  // React 16
  let tracker = element._valueTracker;
  if (tracker) {
    tracker.setValue(lastValue);
  }
  element.dispatchEvent(event);
}

function generatePhoneNumber() {
  const dropdown = document.getElementById('input-dropdown-addon');
  if (dropdown) {
    dropdown.click();
    document.querySelector('.country-code-item > a').click();
    setNativeValue(document.getElementsByClassName('telephone-input')[0], '077 171 0515');
  }
}

function generateEmail(domain, pattern) {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let string = '';
  for (let i = 0; i < 10; i++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  if (pattern) {
    string = `${pattern}-${string}`;
  }
  return `${string}@${domain}`;
}

function fillAboutYouInputsWithEmails(email) {
  const EMAIL_FIELD_PATH = 'div.reg-form-body > div:nth-child(1) > input';
  const CONFIRM_EMAIL_FIELD_PATH =
    'div.reg-form-body > div:nth-child(2) > input';

  const emailField = document.querySelector(EMAIL_FIELD_PATH);

  if (emailField) {
    setNativeValue(emailField, email);
    emailField.disabled = true;
  }

  const confirmEmailField = document.querySelector(CONFIRM_EMAIL_FIELD_PATH);

  if (confirmEmailField) {
    setNativeValue(confirmEmailField, email);
    confirmEmailField.disabled = true;
  }
}

function fillBadgesWithEmail(defaultDomain, predefinedPattern) {
  const BADGE_EMAIL_FIELD = 'input[name="email"]';

  const emails = document.querySelectorAll(BADGE_EMAIL_FIELD);
  if (emails && emails.length > 0) {
    emails.forEach((field) => {
      const newEmail = generateEmail(defaultDomain, predefinedPattern);
      setNativeValue(field, newEmail);
      field.disabled = true;
    });
  }
}

function getStorageData(key) {
  return new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, (result) => resolve(result))
  );
}

async function main() {
  let defaultDomain = '@fakeemail.com';
  let predefinedPattern = '';

  const { domain } = await getStorageData('domain');
  if (domain) {
    defaultDomain = domain;
  }

  const { pattern } = await getStorageData('pattern');
  if (pattern) {
    predefinedPattern = pattern;
  }

  fillAboutYouInputsWithEmails(generateEmail(defaultDomain, predefinedPattern));
  fillBadgesWithEmail(defaultDomain, predefinedPattern);
  generatePhoneNumber();
}

main();
