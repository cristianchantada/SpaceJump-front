import { initReactI18next } from 'react-i18next';
import esTranslation from './locales/es.json';
import enTranslation from './locales/en.json';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: enTranslation },
		es: { translation: esTranslation },
	},
	lng: 'en', // Inglés será nuiestro idioma por defecto
	fallbackLng: 'en', // En caso de no encontrar alguna traducción en otro idioma mostrariemos la palabra en inglés por defecto
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
