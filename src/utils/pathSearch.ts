import type NavItem from '../types/NavItem';

const searchSlugIdByPath = (
	path: string,
	navArr: Array<NavItem>,
	pathLevel: number = 0
): number => {
	const pathArr: Array<string> = path.split('/')[0].length
		? path.split('/')
		: path.split('/').slice(1);
	const pathArrLastIndex: number = pathArr.length - 1;
	const nextPathLevel: number = pathArrLastIndex > pathLevel ? pathLevel + 1 : pathArrLastIndex;

	for (let navItem of navArr) {
		const slug = navItem.slug.slug.split('/')[pathLevel];

		if (
			slug === pathArr[pathLevel] &&
			pathLevel !== pathArrLastIndex &&
			navItem.nestedNavigations.length
		) {
			return searchSlugIdByPath(path, navItem.nestedNavigations, nextPathLevel);
		} else if (slug === pathArr[pathLevel] && pathLevel === pathArrLastIndex) {
			return navItem.slug.id;
		}
	}

	return -1;
};

export default searchSlugIdByPath;
