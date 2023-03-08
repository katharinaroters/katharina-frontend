import type NavItem from '../types/NavItem';

const searchSlugIdByPath = (
	path: string,
	navArr: Array<NavItem>,
	pathLevel = 0
): number => {
	const pathArr: Array<string> = path.split('/')[0].length
		? path.split('/')
		: path.split('/').slice(1);
	const pathArrLastIndex: number = pathArr.length - 1;
	const nextPathLevel: number = pathArrLastIndex > pathLevel ? pathLevel + 1 : pathArrLastIndex;

	for (const navItem of navArr) {
		const slug = navItem.attributes.slug.slug.split('/')[pathLevel];

		if (
			slug === pathArr[pathLevel] &&
			pathLevel !== pathArrLastIndex &&
			navItem.attributes.nestedNavigations.data.length
		) {
			return searchSlugIdByPath(path, navItem.attributes.nestedNavigations.data, nextPathLevel);
		} else if (slug === pathArr[pathLevel] && pathLevel === pathArrLastIndex) {
			return navItem.attributes.slug.id;
		}
	}

	return -1;
};

export default searchSlugIdByPath;
