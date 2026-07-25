import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from 'framer-motion';
import ImageFrame from './ImageFrame.jsx';

const spring = { type: 'spring', stiffness: 360, damping: 18, mass: 0.8 };
const softSpring = { type: 'spring', stiffness: 280, damping: 22, mass: 0.9 };
const view = { once: true, amount: 0.18 };

const heroImage = 'https://img.ltwebstatic.com/v4/j/ccc/2026/07/20/1c/178452963728a95f68cca5fba43c39afd51369eeca_thumbnail_1575x.avif';
const flashImages = [
  'https://img.ltwebstatic.com/v4/j/ccc/2026/07/20/db/1784530163771e665f2a7521b6c77c290a7571dec3.jpg',
  'https://img.ltwebstatic.com/v4/j/ccc/2026/07/06/e0/178332201862b43a0cea2ef35eda4b3f777b1f4054.jpg'
];
const newDropImages = [
  'https://img.ltwebstatic.com/v4/j/ccc/2026/05/11/e4/1778484133c03dd9c50cec126215de6a6330830b89_thumbnail_624x.avif',
  'https://img.ltwebstatic.com/v4/j/pi/2026/05/21/96/1779354105512d471fda5bf49ed27e7d80b0b994c2_thumbnail_405x552.avif',
  'https://img.ltwebstatic.com/v4/j/pi/2026/05/21/52/17793541079ed01197dbded8a299eecf1a8dac08cd_thumbnail_405x552.jpg',
  'https://img.ltwebstatic.com/v4/j/pi/2026/05/06/0b/17780591253cf812192054ddec5b7acd617f4ddfda_thumbnail_405x552.avif',
  'https://img.ltwebstatic.com/v4/j/pi/2026/05/06/68/1778059127e3763a0048f5e71647cf3e2af18dba39_thumbnail_405x552.jpg'
];
const sunnyImage = 'https://img.ltwebstatic.com/v4/j/ccc/2026/07/13/3d/1783926214cfecd9919994f278d8147c66b9651986_thumbnail_624x.avif';
const lookImages = [
  'https://img.ltwebstatic.com/v4/j/pi/2026/07/10/dc/178368144883b420f0befb0f713927eafdec338a7a_thumbnail_405x552.jpg',
  'https://img.ltwebstatic.com/v4/j/pi/2026/07/10/6c/178368145058b7b26a3588ae9af3c91177681b2441_thumbnail_405x552.jpg',
  'https://img.ltwebstatic.com/v4/j/pi/2026/06/16/18/17815726371ea1cb95fc04e97e22b878906b015eeb_thumbnail_405x552.jpg',
  'https://img.ltwebstatic.com/v4/j/pi/2026/06/16/ae/17815726389f23ae63e56acca40ee8d4788379f401_thumbnail_405x552.jpg'
];
const categories = [
  ['Women', 'bi-gender-female', 'https://img.ltwebstatic.com/images3_pi/2024/12/31/a4/1735633484c8f31e500ba182a2e7011e05ff904ab6_thumbnail_405x552.jpg'],
  ['Men', 'bi-person', 'https://img.ltwebstatic.com/images3_pi/2024/12/31/b4/17356334872283655f8818293dc00d3b573decc117_thumbnail_405x552.jpg'],
  ['Kids', 'bi-balloon', 'https://img.ltwebstatic.com/v4/p/ccc/2026/01/06/30/17676695739694bae4397bf0a9cba4f6d6e62b426c_thumbnail_240x.avif'],
  ['Curve', 'bi-stars', 'https://img.ltwebstatic.com/v4/p/abccv/2026/04/22/0d/1776852843745c09a3614fa4cea5e79632cb4e0423_thumbnail_240x.avif'],
  ['Beachwear', 'bi-umbrella', 'https://img.ltwebstatic.com/v4/p/abccv/2026/04/16/54/177634555554b30deac4f669b5f2884162381f6fd0_thumbnail_240x.avif'],
  ['Beauty & Health', 'bi-heart', 'https://img.ltwebstatic.com/v4/p/abccv/2026/04/09/46/177572859893ce5610b0d280a5dc09ecc9c2a19c61_thumbnail_240x.avif'],
  ['Home & Living', 'bi-house', 'https://img.ltwebstatic.com/v4/p/abc/2026/05/25/b0/1779690405017753e6e4ea27d48fee19153beb8957_thumbnail_240x.avif'],
  ['Shoes', 'bi-arrow-right', 'https://img.ltwebstatic.com/v4/p/abccv/2026/05/27/22/177986202385a225b1d8cc288abaa3f5874db3c878_thumbnail_240x.avif']
];
const saleImages = [
  'https://img.ltwebstatic.com/v4/p/abccv/2026/05/28/87/17799689084beec13925366da75f44b77b694bcc55_thumbnail_240x.avif',
  'https://img.ltwebstatic.com/v4/p/abccv/2026/05/28/c3/1779969068bec4358e977a391d2d89155385d49cb3_thumbnail_240x.avif',
  'https://img.ltwebstatic.com/v4/p/abccv/2026/05/27/57/1779868566e843962ada357c34cde5db24e106610f.png',
  'https://img.ltwebstatic.com/v4/p/abc/2026/06/01/f4/1780286195076576ea627db758db0b5ee2a28a260c.png',
  'https://img.ltwebstatic.com/v4/p/abccv/2026/04/17/22/1776429728b057a22a834c8f948342563547a4bc14.png',
  'https://img.ltwebstatic.com/v4/p/abccv/2026/04/21/78/177677102190976fe4def6ad2b341b0dfba4c7cbf5.png',
  'https://img.ltwebstatic.com/v4/p/abc/2026/05/27/a1/1779859122bbbbfb9d26ae32db37aebc550b716486.png',
  'https://img.ltwebstatic.com/v4/p/abc/2026/05/25/95/1779719633afa821914457145a33fcc85758f9ca5d.png',
  'https://img.ltwebstatic.com/v4/p/abc/2026/05/25/76/17796784364600bb9a7b15d67fa39f29fa1a3de47a.png',
  'https://img.ltwebstatic.com/v4/p/abc/2026/05/25/b0/177970252530b59da50338acf3294022ad66c03f84.png',
  'https://img.ltwebstatic.com/v4/p/pics1/2026/04/16/2a/177635060999e44be76165861874b9d42baff2574e.png'
];
const womenImages = [
  'https://img.ltwebstatic.com/v4/j/spmp/2025/08/09/2d/1754715889fcc1f44cc468bfcedb430430ff84650c_thumbnail_288x.avif',
  'https://img.ltwebstatic.com/v4/j/spmp/2025/08/05/23/175437510719c4e69cb5198990202f1a339e1b0e15_thumbnail_405x552.jpg',
  'https://img.ltwebstatic.com/images3_spmp/2024/12/11/2e/1733904942870f984d95d5a565e2668e66355bc249_thumbnail_405x552.jpg',
  'https://img.ltwebstatic.com/v4/j/pi/2026/05/23/83/177952690696b2a7eceb287deb7ebcc014b8590d31_thumbnail_288x.avif',
  'https://img.ltwebstatic.com/v4/j/pi/2026/05/23/cf/177952690770cc5ccd94594824ff285e5011dda11e_thumbnail_405x552.jpg',
  'https://img.ltwebstatic.com/v4/j/pi/2025/07/03/1c/17515090399bd925e46191a82eb95ef34c136f5268_thumbnail_288x.avif',
  'https://img.ltwebstatic.com/v4/j/pi/2025/07/03/3e/175150904032d421a38c322f666c29f631b561d8d6_thumbnail_405x552.jpg',
  'https://img.ltwebstatic.com/v4/p/spmp/2025/05/31/be/1748666387095b98732badc8e4d7f23023d4b512cd_thumbnail_405x552.png'
];

function SectionTitle({ icon = 'bi-stars', eyebrow, title, action, href = '#new-in' }) {
  return (
    <motion.div className="section-heading" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={softSpring}>
      <div>
        <span className="eyebrow"><i className={`bi ${icon || 'bi-stars'}`} />{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {action && <a className="text-link" href={href}>{action}<i className="bi bi-arrow-right" /></a>}
    </motion.div>
  );
}

function Hero() {
  const tags = ['#VcayBikini', '#TimelessBlack', '#SunnyEscapes', '#NewIn'];
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-8, 12]);
  const chipY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [6, -8]);

  return (
    <section className="hero section" ref={ref} aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <motion.div className="tag-rail" initial={{ opacity: 0, y: reduce ? 0 : 72 }} animate={{ opacity: 1, y: 0 }} transition={reduce ? { duration: 0.2 } : spring}>
          <span className="eyebrow"><motion.i className="bi bi-hash" initial={{ rotate: reduce ? 0 : -12, scale: reduce ? 1 : 0.7 }} animate={{ rotate: 0, scale: 1 }} transition={spring} />Hashtag Runway</span>
          <h1 id="hero-title">Your feed.<br />Your runway.</h1>
          <div className="tag-list" role="list" aria-label="Trending tags">
            {tags.map((tag, index) => (
              <motion.button
                type="button"
                role="listitem"
                key={tag}
                className={active === index ? 'tag active' : 'tag'}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                initial={{ opacity: 0, x: reduce ? 0 : index % 2 ? 18 : -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...spring, delay: reduce ? 0 : index * 0.08 }}
                whileHover={reduce ? {} : { x: 8, rotate: -1 }}
              >
                <span className="lime-dot" />{tag}
              </motion.button>
            ))}
          </div>
          <div className="button-row">
            <motion.a className="button lime" href="#new-in" whileHover={reduce ? {} : { y: -4 }} whileTap={{ scale: 0.97 }}>Shop Tag<i className="bi bi-lightning" /></motion.a>
            <motion.a className="button outline" href="#new-in" whileHover={reduce ? {} : { x: 5 }} whileTap={{ scale: 0.97 }}>View All New In</motion.a>
          </div>
        </motion.div>
        <motion.div className="hero-visual" initial={{ clipPath: reduce ? 'inset(0)' : 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: reduce ? 0.2 : 0.72, delay: reduce ? 0 : 0.14, ease: [0.77, 0, 0.18, 1] }}>
          <div className="organic organic-one" />
          <div className="organic organic-two" />
          <AnimatePresence mode="wait">
            <motion.div key={active} className="hero-image-wrap" style={{ y: imageY }} initial={{ opacity: 0, scale: reduce ? 1 : 0.98, x: reduce ? 0 : 10 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: reduce ? 1 : 1.015, x: reduce ? 0 : -8 }} transition={{ duration: reduce ? 0.15 : 0.36, ease: [0.16, 1, 0.3, 1] }}>
              <ImageFrame src={heroImage} alt="SHEIN Hashtag Runway" className="hero-image" />
            </motion.div>
          </AnimatePresence>
          <motion.div className="trend-chip" style={{ y: chipY }} key={`chip-${active}`} initial={{ scale: reduce ? 1 : 0.8, rotate: reduce ? 0 : -2 }} animate={{ scale: [1, 1.05, 0.98, 1], rotate: reduce ? 0 : [0, -2, 1, 0] }} transition={{ duration: reduce ? 0.15 : 0.42 }}>
            <span>LIVE TREND</span>
            <AnimatePresence mode="wait"><motion.strong key={tags[active]} initial={{ opacity: 0, y: reduce ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : -18 }} transition={spring}>{tags[active]}</motion.strong></AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Countdown() {
  const [remaining, setRemaining] = useState(4 * 60 * 60 + 27 * 60 + 19);
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining((value) => value > 0 ? value - 1 : 4 * 60 * 60), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const hours = String(Math.floor(remaining / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
  const seconds = String(remaining % 60).padStart(2, '0');
  return <span className="countdown" aria-label={`${hours} hours ${minutes} minutes ${seconds} seconds`}>{hours}:{minutes}:{seconds}</span>;
}

function FlashSale() {
  const [slide, setSlide] = useState(0);
  const reduce = useReducedMotion();
  const change = (direction) => setSlide((value) => (value + direction + flashImages.length) % flashImages.length);

  return (
    <section className="section flash-section" aria-labelledby="flash-title">
      <div className="shell">
        <motion.div className="sale-ticker" initial={{ clipPath: reduce ? 'inset(0)' : 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={view} transition={{ duration: reduce ? 0.2 : 0.58, ease: [0.77, 0, 0.18, 1] }}>
          <div className="ticker-line" aria-hidden="true">OFF · HOT DEAL · FLASH SALE · OFF · HOT DEAL · FLASH SALE ·</div>
          <div className="sale-slide" aria-roledescription="carousel" aria-label="Flash Sale">
            <motion.div className="sale-copy" drag={reduce ? false : 'x'} dragConstraints={{ left: 0, right: 0 }} onDragEnd={(_, info) => { if (info.offset.x < -40) change(1); if (info.offset.x > 40) change(-1); }}>
              <span className="eyebrow inverted"><i className="bi bi-stopwatch" />Hot Deal</span>
              <h2 id="flash-title">Flash Sale</h2>
              <p className="off-label"><i className="bi bi-percent" /> OFF</p>
              <a className="button white" href="#sale">Shop Flash Sale<i className="bi bi-arrow-right" /></a>
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.div key={slide} className="sale-media" initial={{ opacity: 0, x: reduce ? 0 : 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduce ? 0 : -20 }} transition={{ duration: reduce ? 0.2 : 0.32 }}>
                <ImageFrame src={flashImages[slide]} alt={`Flash Sale slide ${slide + 1}`} className="sale-image" />
              </motion.div>
            </AnimatePresence>
            <motion.div className="count-chip" initial={{ x: reduce ? 0 : 28, rotate: reduce ? 0 : 6, scale: reduce ? 1 : 0.82 }} whileInView={{ x: 0, rotate: reduce ? 0 : -2, scale: 1 }} viewport={view} transition={spring}>
              <span>ENDS IN</span><Countdown />
            </motion.div>
          </div>
          <div className="carousel-controls">
            <button type="button" onClick={() => change(-1)} aria-label="Previous Flash Sale slide"><i className="bi bi-arrow-left" /></button>
            <div className="dots" aria-label="Choose Flash Sale slide">{flashImages.map((_, index) => <button key={index} className={slide === index ? 'active' : ''} type="button" onClick={() => setSlide(index)} aria-label={`Slide ${index + 1}`} aria-current={slide === index ? 'true' : undefined} />)}</div>
            <button type="button" onClick={() => change(1)} aria-label="Next Flash Sale slide"><i className="bi bi-arrow-right" /></button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NewDrops() {
  const reduce = useReducedMotion();
  return (
    <section id="new-in" className="section" aria-labelledby="drops-title">
      <div className="shell">
        <SectionTitle icon="bi-stars" eyebrow="Just Dropped" title="New In Micro-Drops" action="Shop New In" />
        <div className="product-grid five-grid">
          {newDropImages.map((src, index) => (
            <motion.a href="#new-in-banner" className="product-card" key={src} initial={{ opacity: 0, y: reduce ? 0 : index % 2 ? 16 : 28, rotate: reduce ? 0 : index % 2 ? -1.5 : 1.5 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={view} transition={{ ...spring, delay: reduce ? index * 0.02 : [0, 0.045, 0.105, 0.15, 0.23][index] }} whileHover={reduce ? {} : { y: -7, rotate: index % 2 ? 0.7 : -0.7 }}>
              <ImageFrame src={src} alt={`Just Dropped ${index + 1}`} className="product-image" />
              <span className="drop-dot" />
              <span className="card-meta"><strong>Just Dropped</strong><i className="bi bi-bag" /></span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SunnyEscapes() {
  const reduce = useReducedMotion();
  return (
    <section id="sunny" className="section sunny" aria-labelledby="sunny-title">
      <div className="shell sunny-grid">
        <motion.div className="sunny-copy" initial={{ opacity: 0, x: reduce ? 0 : -40, rotate: reduce ? 0 : -2 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={view} transition={softSpring}>
          <span className="eyebrow"><motion.i className="bi bi-sun" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />Spotlight</span>
          <h2 id="sunny-title">Sunny<br />Escapes</h2>
          <a className="button dark" href="#categories">Shop Beachwear<i className="bi bi-arrow-right" /></a>
        </motion.div>
        <motion.div className="sunny-tile" initial={{ opacity: 0, x: reduce ? 0 : 36, y: reduce ? 0 : 18 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={view} transition={{ ...softSpring, delay: reduce ? 0 : 0.11 }} whileHover={reduce ? {} : { y: -8, rotate: 1 }}>
          <ImageFrame src={sunnyImage} alt="Sunny Escapes beachwear" className="sunny-image" />
          <span className="corner-flag"><i className="bi bi-umbrella" />Sunny Escapes</span>
        </motion.div>
      </div>
    </section>
  );
}

function ShopLook() {
  const reduce = useReducedMotion();
  return (
    <section className="section look-section" aria-labelledby="look-title">
      <div className="shell look-grid">
        <motion.div className="look-copy" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={view}>
          <span className="eyebrow"><i className="bi bi-layers" />Complete the fit</span>
          <h2 id="look-title"><motion.span initial={{ x: reduce ? 0 : -26 }} whileInView={{ x: 0 }} viewport={view} transition={spring}>Shop</motion.span> <motion.span initial={{ x: reduce ? 0 : 26 }} whileInView={{ x: 0 }} viewport={view} transition={spring}>the Look</motion.span></h2>
          <p>Tap to add the whole fit or pick pieces.</p>
          <motion.a className="button lime" href="#new-in" whileHover={reduce ? {} : { y: -4, rotate: -1 }} whileTap={{ y: 1, scale: 0.96 }}>Add All to Bag<i className="bi bi-bag" /></motion.a>
        </motion.div>
        <div className="collage">
          {lookImages.map((src, index) => (
            <motion.a href="#new-in" className={`collage-card collage-${index + 1}`} key={src} initial={{ opacity: 0, y: reduce ? 0 : 32, rotate: reduce ? 0 : index % 2 ? 4 : -5, scale: reduce ? 1 : 0.94 }} whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }} viewport={view} transition={{ ...softSpring, delay: reduce ? 0 : [0, 0.07, 0.165, 0.235][index] }} whileHover={reduce ? {} : { y: -9, rotate: index % 2 ? 1.5 : -1.5 }}>
              <ImageFrame src={src} alt={`Shop the Look piece ${index + 1}`} className="collage-image" />
              <span className="item-chip"><i className="bi bi-heart" />Pick {index + 1}</span>
            </motion.a>
          ))}
          <span className="connector connector-one" /><span className="connector connector-two" />
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const reduce = useReducedMotion();
  return (
    <section id="categories" className="section categories" aria-labelledby="categories-title">
      <div className="shell">
        <SectionTitle icon="bi-grid" eyebrow="Quick Jump" title="Shop Categories" />
        <div className="category-grid">
          {categories.map(([label, icon, src], index) => (
            <motion.a href={label === 'Women' ? '#women' : label === 'Beachwear' ? '#sunny' : '#new-in'} className="category-card" key={label} initial={{ opacity: 0, scale: reduce ? 1 : 0.9, rotate: reduce ? 0 : index % 2 ? 2 : -2 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={view} transition={{ ...spring, delay: reduce ? 0 : [0, 0.035, 0.07, 0.12, 0.155, 0.205, 0.24, 0.3][index] }} whileHover={reduce ? {} : { y: -5, rotate: -1 }}>
              <ImageFrame src={src} alt={label} className="category-image" />
              <span className="category-label"><i className={`bi ${icon || 'bi-grid'}`} /><strong>{label}</strong><i className="bi bi-arrow-right" /></span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppPromo() {
  const reduce = useReducedMotion();
  return (
    <section className="section app-promo" aria-labelledby="app-promo-title">
      <motion.div className="shell app-promo-card" initial={{ opacity: 0, x: reduce ? 0 : -44, rotate: reduce ? 0 : -2 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={view} transition={softSpring} whileHover={reduce ? {} : { y: -6, rotate: 0.5 }}>
        <ImageFrame src="https://img.ltwebstatic.com/images3_ccc/2024/09/24/52/17271621745085066a31d3319febe2bb96177ca62c.png" alt="SHEIN app offer" className="app-promo-art" />
        <div className="app-promo-copy">
          <span className="eyebrow"><i className="bi bi-phone" />Get it in the app.</span>
          <h2 id="app-promo-title">Enjoy <span>30% OFF</span> on your first order!</h2>
          <div className="button-row">
            <a className="store-button" href="#app"><i className="bi bi-google-play" />Get on Google Play</a>
            <a className="store-button" href="#app"><i className="bi bi-apple" />Download on the App Store</a>
          </div>
        </div>
        <motion.span className="coupon-sticker" initial={{ y: reduce ? 0 : -28, rotate: reduce ? 0 : 12, scale: reduce ? 1 : 0.72 }} whileInView={{ y: 0, rotate: reduce ? 0 : -5, scale: 1 }} viewport={view} transition={{ ...spring, delay: reduce ? 0 : 0.16 }}>30%<br />OFF</motion.span>
      </motion.div>
    </section>
  );
}

function ShippingBanner() {
  return (
    <section id="shipping" className="shipping-band" aria-label="Shipping and returns benefits">
      <motion.div className="shell shipping-grid" initial={{ opacity: 0, clipPath: 'inset(0 50% 0 50%)' }} whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0%)' }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}>
        <motion.div className="shipping-item" whileHover={{ y: -3, x: 3 }}><i className="bi bi-truck" /><span>Free Shipping on SHEIN-shipped Orders <strong>$15+</strong></span><i className="bi bi-check-lg check" /></motion.div>
        <motion.div className="shipping-item" whileHover={{ y: -3, x: 3 }}><i className="bi bi-arrow-counterclockwise" /><span>Free Returns on all orders <a href="#customer-care">*T&amp;Cs apply</a></span><i className="bi bi-check-lg check" /></motion.div>
      </motion.div>
    </section>
  );
}

export function HomeSections() {
  return <><Hero /><FlashSale /><NewDrops /><SunnyEscapes /><ShopLook /><Categories /><AppPromo /><ShippingBanner /></>;
}

export function SaleSection() {
  const [filter, setFilter] = useState('Women');
  const reduce = useReducedMotion();
  const filters = ['Women', 'Men', 'Kids', 'Beauty', 'Home'];
  return (
    <section id="sale" className="section sale-page" aria-labelledby="sale-title">
      <div className="shell">
        <div className="sale-hero">
          <motion.div className="sale-hero-copy" initial={{ opacity: 0, x: reduce ? 0 : -48 }} whileInView={{ opacity: 1, x: 0 }} viewport={view} transition={spring}>
            <span className="eyebrow"><i className="bi bi-percent" />Sale</span>
            <h2 id="sale-title">Flash Sale &amp;<br />Hot Deals</h2>
            <div className="filters" aria-label="Deal filters">{filters.map((item, index) => <motion.button type="button" key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} whileHover={reduce ? {} : { y: -4, rotate: index % 2 ? 1 : -1 }}><i className="bi bi-funnel" />{item}</motion.button>)}</div>
            <a className="button dark" href="#deep-deals">Shop All Deals</a>
          </motion.div>
          <motion.div className="sale-hero-images" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={view}>
            <ImageFrame src="https://img.ltwebstatic.com/v4/j/ccc/2026/03/02/25/1772440306264914f38566d24883a39192369f4d8b_thumbnail_624x.avif" alt="Flash Sale" className="sale-hero-image front" />
            <ImageFrame src="https://img.ltwebstatic.com/v4/j/ccc/2026/03/02/6f/177244031653665566b7a772e851241cff85d42b13_thumbnail_624x.avif" alt="Hot Deals" className="sale-hero-image back" />
            <span className="sale-ribbon">% OFF · HOT DEAL</span>
          </motion.div>
        </div>
        <div id="deep-deals" className="subsection">
          <SectionTitle icon="bi-percent" eyebrow={filter} title="Deep Deals Grid" />
          <div className="deal-grid">
            {saleImages.map((src, index) => (
              <motion.a className="deal-card" href="#sale" key={src} initial={{ opacity: 0, y: reduce ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ ...softSpring, delay: reduce ? 0 : (index % 5) * 0.045 }} whileHover={reduce ? {} : { y: -7, rotate: index % 2 ? 0.7 : -0.7 }}>
                <ImageFrame src={src} alt={`Hot Deal ${index + 1}`} className="deal-image" />
                <span className="deal-meta"><strong>Hot Deal</strong><span><i className="bi bi-percent" /> OFF</span></span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewInSection() {
  const reduce = useReducedMotion();
  return (
    <section id="new-in-banner" className="section new-banner-section" aria-labelledby="new-banner-title">
      <motion.div className="shell new-banner" initial={{ opacity: 0, scaleX: reduce ? 1 : 0.92 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reduce ? 0.2 : 0.42, ease: [0.16, 1, 0.3, 1] }} whileHover={reduce ? {} : { y: -5, rotate: -0.4 }}>
        <div className="new-banner-copy">
          <motion.span className="new-badge" initial={{ y: reduce ? 0 : -30, rotate: reduce ? 0 : 9, scale: reduce ? 1 : 0.75 }} whileInView={{ y: 0, rotate: reduce ? 0 : -3, scale: 1 }} viewport={view} transition={spring}>NEW</motion.span>
          <span className="eyebrow"><i className="bi bi-stars" />Just Dropped</span>
          <h2 id="new-banner-title">New In</h2>
          <a className="button lime" href="#new-in">Shop Latest<i className="bi bi-lightning" /></a>
        </div>
        <ImageFrame src="https://img.ltwebstatic.com/v4/j/ccc/2026/05/11/91/17784841551d4d9ab986b5a9a541e06dba9b8959be_thumbnail_624x.avif" alt="New In" className="new-banner-image" />
      </motion.div>
    </section>
  );
}

export function WomenSection() {
  const reduce = useReducedMotion();
  const links = ['Dresses', 'Tops', 'Underwear & Sleepwear', 'Shoes'];
  return (
    <section id="women" className="section women-section" aria-labelledby="women-title">
      <div className="shell">
        <div className="women-hero">
          <motion.div className="women-copy" initial={{ opacity: 0, x: reduce ? 0 : -52, rotate: reduce ? 0 : -2 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={view} transition={softSpring}>
            <span className="eyebrow"><i className="bi bi-gender-female" />Women</span>
            <h2 id="women-title">Women<br /><span>Clothing</span></h2>
            <div className="women-links">{links.map((item) => <a key={item} href="#editors-picks">{item}<i className="bi bi-arrow-right" /></a>)}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: reduce ? 0 : 56, rotate: reduce ? 0 : 2 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={view} transition={{ ...softSpring, delay: reduce ? 0 : 0.11 }} whileHover={reduce ? {} : { rotate: 0.7 }}>
            <ImageFrame src="https://img.ltwebstatic.com/v4/j/spmp/2026/06/09/32/1780999635a1be4c0fc434e8a8be0762330f370519_thumbnail_405x552.jpg" alt="Women Clothing" className="women-main-image" />
          </motion.div>
        </div>
        <div id="editors-picks" className="subsection">
          <SectionTitle icon="bi-grid" eyebrow="Women Clothing" title="Editors’ Picks" />
          <div className="editor-grid">
            {womenImages.map((src, index) => (
              <motion.a href="#women" className="editor-card" key={src} initial={{ opacity: 0, y: reduce ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ ...softSpring, delay: reduce ? 0 : (index % 4) * 0.07 }} whileHover={reduce ? {} : { y: -7, rotate: index % 2 ? 0.7 : -0.7 }}>
                <ImageFrame src={src} alt={`Editors’ Pick ${index + 1}`} className="editor-image" />
                <span><strong>Editors’ Pick</strong><i className="bi bi-heart" /></span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AppSection() {
  const reduce = useReducedMotion();
  const benefits = [
    ['Faster checkout', 'https://us.shein.com/?url_from=pkbingbrandshein_LEN_srsa_20241205&pf=bing&keyword=SHEIN&cid=568993595&setid=1181976802197305&adid=73873754980747&targetid=kwd-73873907657814:loc-144&matchtype=e&network=o&orderitemid=73873907657814&cdn_rsite=cf&rep=dir&ret=us'],
    ['Personalized picks', 'https://sc.ltwebstatic.com/she_dist/images/shein-right-config-coupon-82b37f3015.gif']
  ];
  return (
    <section id="app" className="section app-section" aria-labelledby="app-title">
      <div className="shell app-grid">
        <motion.div className="app-copy" initial={{ opacity: 0, x: reduce ? 0 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={view} transition={spring}>
          <span className="eyebrow"><i className="bi bi-gift" />30% OFF</span>
          <h2 id="app-title">Get the<br />SHEIN App</h2>
          <ul className="benefit-list"><li><i className="bi bi-check-lg" />Faster checkout</li><li><i className="bi bi-check-lg" />Personalized picks</li></ul>
          <div className="button-row"><a className="store-button dark-store" href="#app"><i className="bi bi-google-play" />Get on Google Play</a><a className="store-button dark-store" href="#app"><i className="bi bi-apple" />Download on the App Store</a></div>
        </motion.div>
        <motion.div className="phone-panel" initial={{ opacity: 0, y: reduce ? 0 : 46, rotate: reduce ? 0 : 3, scale: reduce ? 1 : 0.92 }} whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={softSpring} whileHover={reduce ? {} : { y: -7, rotate: 1 }}>
          <ImageFrame src="https://img.ltwebstatic.com/images3_acp/2025/02/12/8d/1739342426981c4e935b9124cec41167a1f933ef22.avif" alt="Get the SHEIN App" className="app-main-image" />
          <span className="download-bubble"><i className="bi bi-download" />DOWNLOAD</span>
        </motion.div>
      </div>
      <div className="shell app-benefits">
        {benefits.map(([label, src], index) => (
          <motion.article className="benefit-card" key={label} initial={{ opacity: 0, y: reduce ? 0 : 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ ...softSpring, delay: reduce ? 0 : index * 0.075 }}>
            <ImageFrame src={src} alt={label} className="benefit-image" />
            <div><i className="bi bi-check-lg" /><strong>{label}</strong></div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function CareSection() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  const services = [
    ['Free Shipping on SHEIN-shipped Orders $15+', 'bi-truck'],
    ['Free Returns on all orders *T&Cs apply', 'bi-arrow-counterclockwise']
  ];
  const utilities = [
    ['OOPS Server Error', 'https://sc.ltwebstatic.com/she_dist/images/error_img-071b96b14b.png'],
    ['Cookie Preferences', 'https://sc.ltwebstatic.com/she_dist/images/qustionnaire_popup-19c3d203ec.png']
  ];
  return (
    <section id="customer-care" className="section care-section" aria-labelledby="care-title">
      <div className="shell">
        <SectionTitle icon="bi-info-circle" eyebrow="Customer Care" title="Shipping & Returns" />
        <div className="service-grid">
          {services.map(([label, icon], index) => (
            <motion.article className="service-card" key={label} initial={{ opacity: 0, x: reduce ? 0 : index % 2 ? 24 : -24, rotate: reduce ? 0 : index % 2 ? 1.5 : -1.5 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={view} transition={{ ...softSpring, delay: reduce ? 0 : index * 0.065 }} whileHover={reduce ? {} : { y: -5, rotate: index % 2 ? 0.6 : -0.6 }}>
              <i className={`bi ${icon || 'bi-info-circle'}`} />
              <strong>{label}</strong>
              <button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>Customer Care<i className={open === index ? 'bi bi-chevron-up' : 'bi bi-chevron-down'} /></button>
              <AnimatePresence initial={false}>{open === index && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reduce ? 0 : 0.26 }}>Shipping &amp; Returns</motion.p>}</AnimatePresence>
            </motion.article>
          ))}
        </div>
        <div id="cookies" className="utility-grid">
          {utilities.map(([label, src], index) => (
            <motion.article className="utility-card" key={label} initial={{ opacity: 0, y: reduce ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ ...softSpring, delay: reduce ? 0 : index * 0.07 }}>
              <ImageFrame src={src} alt={label} className="utility-image" />
              <div><i className="bi bi-info-circle" /><strong>{label}</strong></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
