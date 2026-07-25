import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const links = [
  ['New In', '#new-in'],
  ['Sale', '#sale'],
  ['Women', '#women'],
  ['Men', '#categories'],
  ['Kids', '#categories'],
  ['Curve', '#categories'],
  ['Beachwear', '#sunny'],
  ['Shoes', '#categories'],
  ['Accessories', '#categories'],
  ['Beauty & Health', '#categories'],
  ['Home & Living', '#categories'],
  ['Underwear & Sleepwear', '#women'],
  ['Bags & Luggage', '#categories'],
  ['Sports & Outdoor', '#categories'],
  ['Electronics', '#categories'],
  ['Toys & Games', '#categories'],
  ['App', '#app'],
  ['Customer Care', '#customer-care']
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <motion.header
      className="site-header"
      initial={{ opacity: 0, y: reduce ? 0 : -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.2 : 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="utility shell">
        <a className="logo" href="#top" aria-label="SHEIN home">SHEIN</a>
        <div className="header-actions">
          <motion.a href="#customer-care" className="icon-action" whileHover={reduce ? {} : { y: -2, rotate: -1 }} whileTap={{ y: 1 }}>
            <i className="bi bi-person" /><span>Sign In</span>
          </motion.a>
          <motion.a href="#customer-care" className="icon-action register" whileHover={reduce ? {} : { y: -2, rotate: -1 }} whileTap={{ y: 1 }}>
            <i className="bi bi-person-plus" /><span>Register</span>
          </motion.a>
          <motion.a href="#new-in" className="icon-action" whileHover={reduce ? {} : { y: -2, rotate: -1 }} whileTap={{ y: 1 }}>
            <i className="bi bi-bag" /><span>Cart</span>
          </motion.a>
          <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="primary-navigation">
            <i className={open ? 'bi bi-x-lg' : 'bi bi-list'} /><span>Menu</span>
          </button>
        </div>
      </div>
      <nav id="primary-navigation" className={open ? 'category-nav is-open' : 'category-nav'} aria-label="Primary navigation">
        <div className="category-track shell">
          {links.map(([label, href], index) => (
            <motion.a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : [0.03, 0.045, 0.03][index % 3] * index, duration: 0.2 }}
              whileHover={reduce ? {} : { y: -2 }}
            >
              {label}
            </motion.a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
