import logo from './logo.svg';
import { motion } from 'framer-motion';
import CurrencyForm from './components/CurrencyForm';

export default function App() {
  return (
    <div className="app ">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ transition: 'easeOut', duration: 1 }}
        className="app-header p-5 text-center"
      >
        <img src={logo} alt="logo" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ transition: 'easeOut', duration: 1, delay: 1 }}
        className="text-amber-300 font-primary font-semibold text-center text-2xl pt-6 "
      >
        Currency Exchange Converter
      </motion.h2>
      <CurrencyForm />
    </div>
  );
}
