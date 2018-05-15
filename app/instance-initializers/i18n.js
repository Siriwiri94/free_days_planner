export default {
  name: 'i18n',
  initialize: function(application) {
    let i18n = application.lookup('service:i18n');
    i18n.set('locale', calculateLocale(i18n.get('locales')));
  }
}

function calculateLocale(locales) {
  const language = navigator.languages[0] || navigator.language || navigator.userLanguage;
  return  locales.includes(language.toLowerCase()) ? language : 'en-GB';
}
