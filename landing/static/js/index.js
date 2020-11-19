// import * as THREE from 'three';
import DOTS from 'vanta/dist/vanta.dots.min';
import $ from 'jquery';
import 'jquery-validation';
// import 'jquery-modal';

$(document).ready(() => {
    setInterval(() => {
        setTimeout(() => {
            $('#explore').addClass('transparency')
            setTimeout(() => {
                $('#explore').removeClass('transparency')
            }, 1500)
        }, 1000);
        
        setTimeout(() => {
            $('#build').addClass('transparency')
            setTimeout(() => {
                $('#build').removeClass('transparency')
            }, 1500)
        }, 2500);
    
        setTimeout(() => {
            $('#develop').addClass('transparency')
            setTimeout(() => {
                $('#develop').removeClass('transparency')
            }, 1500)
        }, 4000);
    }, 5500);
});


$(document).ready(() => {
  // const _sendMailBtn = document.querySelector(".sendmail-btn");
  // _sendMailBtn.onclick = (e) => {
  //   e.preventDefault();
  //   const _form = document.forms.sendmail;
  //   console.log("Do sendmail");
  //   return false;
  // };
});


$(document).ready(() => {
  // const _subscribeForms = document.querySelectorAll(".do-subscribe");
  // _subscribeForms.forEach((form) => {
  //   const _subscribeBtn = form.querySelector(".subscribe-btn");
  //   _subscribeBtn.onclick = (e) => {
  //     e.preventDefault();
  //     console.log("Do Subscribe");
  //   };
  // });
});

let langs = {
    messageSuccess: {
        uk: 'Тепер Ви будете в курсі всіх новин про DataOcean!',
        en: 'Now you will be able to keep up with all of DataOcean updates!',
    },
    messageError: {
        uk: 'Помилка. Дані не відправлені',
        en: 'Error. Data isn\'t sent',
    },
    messageErrorUnknown: {
        uk: 'Невідома помилка: ',
        en: 'Unknown error: ',
    },
    minSymbols: {
        uk: 'Замала кількість символів',
        en: 'Too few symbols',
    },
    maxSymbols: { 
        uk: 'Завелика кількість символів',
        en: 'Too many symbols',
    },
    usernameRequired: {
        uk: 'Будь ласка, введіть Ваше ім\'я',
        en: 'Enter your First Name, please',
    },
    surnameRequired: {
        uk: 'Будь ласка, введіть Ваше прізвище',
        en: 'Enter your Last Name, please',
    },
    emailRequired: {
        uk: 'Будь ласка, введіть адресу',
        en: 'Enter your email, please',
    },
    emailCorrect: {
        uk: 'Будь ласка, введіть коректно адресу',
        en: 'Enter your correct email, please',
    },
    phoneRequired: {
        uk: 'Будь ласка, введіть коректний номер телефону',
        en: 'Enter your number, please',
    },
    phoneNumber: {
        uk: 'Будь ласка, введіть коректний номер телефону',
        en: 'Enter your correct number, please',
    },
    questionAsk: {
        uk: 'Будь ласка, поставте своє запитання',
        en: 'Ask us your question, please',
    },
    placeholderName: {
        uk: 'Петро',
        en: 'John',
    },
    placeholderLastName: {
        uk: 'Іваненко',
        en: 'Galt',
    },
    placeholderQuestion: {
        uk: 'Привіт, Data Ocean! Я хотів запитати...',
        en: 'Hello, Data Ocean! I would like to ask about...'
    }
};

const t = (key) => {
    let currentLang = localStorage.getItem('lang');
    return langs[key][currentLang];
};

const getSchema = () => {
    return {
        errorClass: "input_error",
        rules: {
            username: {
                required: true,
                minlength: 2,
            },
            surname: {
                required: true,
                minlength: 2,
            },
            email: {
                required: true,
                email: true,
            },
            phone: {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 15
            },
            question: {
                required: true,
            },
        },
        messages: {
            username: {
                required: t('usernameRequired'),
                minlength: t('minSymbols'),
            },
            surname: {
                required: t('surnameRequired'),
                minlength: t('minSymbols'),
            },
            email: {
                required: t('emailRequired'),
                email: t('emailCorrect'),
            },
            phone: {
                required: t('phoneRequired'),
                number: t('phoneNumber'),
                minlength: t('minSymbols'),
                maxlength: t('maxSymbols'),
            },
            question: {
                required: t('questionAsk'),
            }
        }
    }
};

$('#contact-form').submit(function(event){
    event.preventDefault();
    if (!$(this).validate(getSchema())) {
         return $(this).parents
    }

    let form = $('#contact-form');
    let data = {
            name: this.username.value + ' ' + this.surname.value,
            email: this.email.value,
            subject: this.phone.value,
            message: this.question.value,
    }

    $.ajax({
        url: "https://ipa.dataocean.us",
        type: "POST",
        dataType: "json",
        data: data,
        success: function(data, status, xhr) {
            if (xhr.status !== 200) {
                return
            }
            alert(t('messageSuccess'));
        },
        error: function (jqXhr, textStatus, errorMessage) {
            if (jqXhr.status === 400 || jqXhr.status === 503) {
                alert(t('messageError'));
            }
            else {
                alert(t('messageErrorUnknown') + errorMessage);
            }
        }
    })
});

const allowedLanguages = ['uk', 'en'];

function changeLanguage (langCode) {
    $('#select_language').val(langCode);
    if (allowedLanguages.includes(langCode)) {
        $("[lang]").each(function () {
            if ($(this).attr("lang") === langCode) {
                $(this).show();
                $('#name')[0].placeholder = t('placeholderName');
                $('#surname')[0].placeholder = t('placeholderLastName');
                $('#question')[0].placeholder = t('placeholderQuestion');
            }
            else {
                $(this).hide();
            }
        });
    } else {
        throw new Error("LangCode " + langCode + " not supported");
        }
}

$('#select_language').on("change", function() {
    const language = $(this).val();
    const userlang = window.localStorage.setItem('lang', language); 
    changeLanguage(language);
});

$(document).ready(() => {
    const langFromLocalStorage = localStorage.getItem('lang');
    if (allowedLanguages.includes(langFromLocalStorage)) {
        changeLanguage(langFromLocalStorage);
    } else {
        changeLanguage('uk');
    }
});
