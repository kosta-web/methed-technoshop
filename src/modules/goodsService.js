import { API_URL } from './var';

export const getGoods = () => {
	const pageURL = new URL(location);
	const url = new URL(`${API_URL}api/goods`);

	for (const item of pageURL.searchParams.entries()) {
		url.searchParams.set(item[0], item[1]);
	}

	return fetch(url).then(response => response.json());
};

export const getGoodsItem = id =>
	fetch(`${API_URL}api/goods/${id}`).then(response => response.json());

export const getCategory = () => fetch(`${API_URL}api/category`).then(response => response.json());
