import './index.html';
import './cart.html';
import './card.html';
import './index.scss';

import Swiper, { Thumbs, Scrollbar, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
const thumbsSwiper = new Swiper('.card__slider-thumb', {
	spaceBetween: 44,
	slidesPerView: 3,
	scrollbar: {
		el: '.swiper-scrollbar',
		draggable: true,
	},
	modules: [Scrollbar],
});

new Swiper('.card__image', {
	spaceBetween: 10,
	slidesPerView: 1,
	thumbs: {
		swiper: thumbsSwiper,
		slideThumbActiveClass: 'card__thumb-btn_active',
	},
	modules: [Thumbs],
});

new Swiper('.recommended__carousel', {
	spaceBetween: 30,
	slidesPerView: 5,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	modules: [Pagination],
});
