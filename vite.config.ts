import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

// Funkcja pomocnicza do kodowania danych dla Netlify Forms
const encode = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: '',
  });

  // Klucze usług dokładnie takie jak w Twoim pliku pl.json
  const services = ['pv', 'storage', 'smart', 'electrical', 'ev', 'funding'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formData })
    })
      .then(() => {
        setStatus('success');
        setFormData({ name: '', phone: '', service: '', message: '' });
        // Ukryj komunikat sukcesu po 5 sekundach
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch(() => {
        setStatus('error');
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-slate-600">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          // Atrybuty niezbędne dla Netlify
          name="contact"
          method="POST"
          data-netlify="true"
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Ukryte pole wymagane przez Netlify w React */}
          <input type="hidden" name="form-name" value="contact" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                {t('contact.form.phone')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-2">
              {t('contact.form.service')}
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors"
            >
              <option value="">{t('contact.form.selectService')}</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {t(`services.items.${service}.title`)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
              {t('contact.form.message')}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-4 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:bg-slate-400"
          >
            {status === 'sending' ? 'Wysyłanie...' : t('contact.form.submit')}
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {status === 'success' && (
            <p className="mt-4 text-green-600 text-center font-medium">Wiadomość została wysłana pomyślnie!</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-red-600 text-center font-medium">Wystąpił błąd przy wysyłaniu. Spróbuj ponownie.</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}