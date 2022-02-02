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

function generateEmail() {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let string = '';
  for (let i = 0; i < 15; i++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  return string + '@fakemail.com';
}

function fillAboutYouInputsWithEmails(email) {
  const EMAIL_FIELD_PATH = 'div.reg-form-body > div:nth-child(1) > input';
  const CONFIRM_EMAIL_FIELD_PATH =
    'div.reg-form-body > div:nth-child(2) > input';

  const emailField = document.querySelector(EMAIL_FIELD_PATH);

  if (emailField) {
    setNativeValue(emailField, email);
  }

  const confirmEmailField = document.querySelector(CONFIRM_EMAIL_FIELD_PATH);

  if (confirmEmailField) {
    setNativeValue(confirmEmailField, email);
  }
}

function fillBadgesWithEmail() {
  const BADGE_EMAIL_FIELD = 'input[name="email"]';

  const emails = document.querySelectorAll(BADGE_EMAIL_FIELD);
  if (emails && emails.length > 0) {
    emails.forEach((field) => {
      const newEmail = generateEmail();
      setNativeValue(field, newEmail);
    });
  }
}

function main() {
  fillAboutYouInputsWithEmails(generateEmail());
  fillBadgesWithEmail();
}

main();
