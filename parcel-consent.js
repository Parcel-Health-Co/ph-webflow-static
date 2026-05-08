// Parcel Health — Cookie Consent + Footer Form behavior
// Hosted externally to stay under Webflow's 10K char limit on inline code.

window.addEventListener('load', function() {

  CookieConsent.run({
    mode: 'opt-in',
    autoShow: true,
    manageScriptTags: true,
    autoClearCookies: true,
    hideFromBots: true,

    cookie: {
      name: 'cc_cookie',
      expiresAfterDays: 365,
      sameSite: 'Lax'
    },

    guiOptions: {
      consentModal: {
        layout: 'box',
        position: 'bottom right',
        flipButtons: false,
        equalWeightButtons: true
      },
      preferencesModal: {
        layout: 'box',
        position: 'right',
        flipButtons: false,
        equalWeightButtons: true
      }
    },

    categories: {
      necessary: {
        enabled: true,
        readOnly: true
      },
      analytics: {
        enabled: false,
        autoClear: {
          cookies: [
            { name: /^_ga/ },
            { name: '_gid' }
          ]
        }
      },
      marketing: {
        enabled: false,
        autoClear: {
          cookies: [
            { name: '_fbp' },
            { name: /^_gcl/ },
            { name: /^li_/ },
            { name: 'lidc' },
            { name: 'bcookie' },
            { name: 'bscookie' }
          ]
        }
      }
    },

    language: {
      default: 'en',
      translations: {
        en: {
          consentModal: {
            title: 'We use cookies',
            description: 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept all", you consent to our use of cookies.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Manage preferences',
            footer: '<a href="/legal/privacy-policy">Privacy Policy</a><a href="/contact-us">Contact Us</a>'
          },
          preferencesModal: {
            title: 'Cookie Preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Save preferences',
            closeIconLabel: 'Close',
            serviceCounterLabel: 'Service|Services',
            sections: [
              {
                title: 'Cookie Usage',
                description: 'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want.'
              },
              {
                title: 'Strictly Necessary Cookies',
                description: 'These cookies are essential for the proper functioning of the website. Without these cookies, the website would not work properly.',
                linkedCategory: 'necessary'
              },
              {
                title: 'Analytics Cookies',
                description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                linkedCategory: 'analytics',
                cookieTable: {
                  headers: {
                    name: 'Cookie',
                    domain: 'Domain',
                    expiration: 'Expiration',
                    description: 'Description'
                  },
                  body: [
                    { name: '_ga', domain: 'google.com', expiration: '2 years', description: 'Used to distinguish users' },
                    { name: '_gid', domain: 'google.com', expiration: '24 hours', description: 'Used to distinguish users' }
                  ]
                }
              },
              {
                title: 'Marketing Cookies',
                description: 'These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.',
                linkedCategory: 'marketing',
                cookieTable: {
                  headers: {
                    name: 'Cookie',
                    domain: 'Domain',
                    expiration: 'Expiration',
                    description: 'Description'
                  },
                  body: [
                    { name: 'li_*', domain: 'linkedin.com', expiration: 'Varies', description: 'LinkedIn Insight Tag tracking' },
                    { name: '_gcl_*', domain: 'google.com', expiration: '90 days', description: 'Google Ads conversion tracking' }
                  ]
                }
              },
              {
                title: 'More Information',
                description: 'For any queries in relation to our policy on cookies and your choices, please <a href="/contact-us">contact us</a>.'
              }
            ]
          }
        }
      }
    },

    onConsent: function() {
      if (CookieConsent.acceptedCategory('analytics')) {
        gtag('consent', 'update', { 'analytics_storage': 'granted' });
      }
      if (CookieConsent.acceptedCategory('marketing')) {
        gtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
        if (window._hsq) window._hsq.push(['setPrivacyConsentMode', true]);
        if (typeof fbq === 'function') fbq('consent', 'grant');
      }
    },

    onChange: function(args) {
      var changedCategories = args.changedCategories;

      if (changedCategories.indexOf('analytics') !== -1) {
        gtag('consent', 'update', {
          'analytics_storage': CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied'
        });
      }

      if (changedCategories.indexOf('marketing') !== -1) {
        var granted = CookieConsent.acceptedCategory('marketing');
        gtag('consent', 'update', {
          'ad_storage': granted ? 'granted' : 'denied',
          'ad_user_data': granted ? 'granted' : 'denied',
          'ad_personalization': granted ? 'granted' : 'denied'
        });
        if (window._hsq) window._hsq.push(['setPrivacyConsentMode', granted]);
        if (typeof fbq === 'function') fbq('consent', granted ? 'grant' : 'revoke');
      }
    }
  });
});

// Footer Subscribe Form — hide reCAPTCHA until user starts typing
document.addEventListener('DOMContentLoaded', function() {
  var form = document.querySelector('[data-name="Footer Subscribe Form"]');
  if (!form) return;

  var emailInput = form.querySelector('input[type="email"]');
  var recaptchaContainer = form.querySelector('.w-form-formrecaptcha');

  if (recaptchaContainer) {
    recaptchaContainer.style.display = 'none';
  }

  var hasShownRecaptcha = false;
  emailInput.addEventListener('input', function() {
    if (!hasShownRecaptcha && recaptchaContainer) {
      recaptchaContainer.style.display = 'block';
      hasShownRecaptcha = true;
    }
  });
});
