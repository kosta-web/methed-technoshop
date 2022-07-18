import { API_URL } from './var';

import Swiper, { Thumbs, Scrollbar, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';

const createCardImagesSlider = largeImages => {
	const ul = document.createElement('ul');
	ul.className = 'swiper-wrapper';
	const cardImagesSlides = largeImages.map(url => {
		const li = document.createElement('li');
		li.className = 'swiper-slide';
		const img = new Image();
		img.src = `${API_URL}${url}`;
		li.append(img);
		return li;
	});
	ul.append(...cardImagesSlides);
	return ul;
};

const createCardImageThumbsSlider = smallImages => {
	const ul = document.createElement('ul');
	ul.className = 'swiper-wrapper';
	const cardImagesSlides = smallImages.map(url => {
		const li = document.createElement('li');
		li.className = 'swiper-slide';
		const button = document.createElement('button');
		button.className = 'card__thumb-btn';
		const img = new Image();
		img.src = `${API_URL}${url}`;
		button.append(img);
		li.append(button);
		return li;
	});
	ul.append(...cardImagesSlides);
	return ul;
};

const createParams = params => {
	const list = [];

	for (const key in params) {
		const li = document.createElement('li');
		li.className = 'card__params-item';

		li.innerHTML = `
			<span>${key}</span>
			<span>${params[key]}</span>
		`;
		list.push(li);
	}
	return list;
};
const createDescription = descriptions => {
	const list = [];

	for (const description of descriptions) {
		const p = document.createElement('p');

		p.innerHTML = description;
		list.push(p);
	}
	return list;
};

export const renderItem = item => {
	const cardImage = document.querySelector('.card__image');
	cardImage.append(createCardImagesSlider(item.images.large));

	const cardSliderThumbWrapper = document.querySelector('.card__slider-thumb-wrapper');
	const cardSliderThumb = document.createElement('div');
	cardSliderThumb.className = 'swiper card__slider-thumb';
	const swiperScrollbar = document.createElement('div');
	swiperScrollbar.className = 'swiper-scrollbar card__slider-thumb-scrollbar';
	cardSliderThumb.append(createCardImageThumbsSlider(item.images.small));
	cardSliderThumbWrapper.append(cardSliderThumb, swiperScrollbar);

	const cardTitle = document.querySelector('.card__title');
	cardTitle.textContent = item.title;

	const cardVendorCode = document.querySelector('.card__vendor-code');
	cardVendorCode.textContent = `Артикул: ${item.id}`;

	const cardPrice = document.querySelector('.card__price');
	cardPrice.textContent = new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		maximumFractionDigits: 0,
	}).format(item.price);

	const cardAddCart = document.querySelector('.card__add-cart');
	cardAddCart.dataset.idGoods = item.id;

	const cardParamsList = document.querySelector('.card__params-list');
	cardParamsList.append(...createParams(item.characteristic));

	const cardDescriptionText = document.querySelector('.card__description');
	cardDescriptionText.append(...createDescription(item.description));

	const thumbsSwiper = new Swiper(cardSliderThumb, {
		spaceBetween: 15,
		slidesPerView: 3,
		scrollbar: {
			el: swiperScrollbar,
			draggable: true,
		},
		breakpoints: {
			768: {
				spaceBetween: 20,
			},
			1024: {
				spaceBetween: 27,
			},
			1600: {
				spaceBetween: 44,
			},
		},
		modules: [Scrollbar],
	});

	new Swiper(cardImage, {
		spaceBetween: 10,
		slidesPerView: 1,
		thumbs: {
			swiper: thumbsSwiper,
			slideThumbActiveClass: 'card__thumb-btn_active',
		},
		modules: [Thumbs],
	});
};
