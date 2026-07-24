import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, Clock, HeadphonesIcon, Wrench, TrendingUp } from 'lucide-react';

const uspIcons = {
  quality: Award,
  time: Clock,
  care: HeadphonesIcon,
  service: Wrench,
  experience: TrendingUp,
};

export default function WhyUs() {
  const { t } = useTranslation();

  const usps = ['quality', 'time', 'care', 'service', 'experience'];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-green-50 to-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            {t('why.title')}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('why.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp, index) => {
            const Icon = uspIcons[usp as keyof typeof uspIcons];
            return (
              <motion.div
                key={usp}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-sky-400 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {t(`why.${usp}.title`)}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t(`why.${usp}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
