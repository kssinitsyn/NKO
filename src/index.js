import flktyl from './scripts/carousel.js';
import getCounter from './scripts/counter.js';
import popup from './scripts/main.js';
import scroll from './scripts/scroll.js';
import {WOW} from 'wowjs';

scroll();

popup();

getCounter();

new WOW().init();

import './style.css';
