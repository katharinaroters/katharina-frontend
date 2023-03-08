export default interface NavItem {
	id: number;
	attributes: {
		title: string;
		isMenuItem: boolean;
		isParent: boolean;
		order: number;
		created_by: number;
		updated_by: number;
		created_at: string;
		updated_at: string;
		nestedNavigations: { data: Array<NavItem> };
		slug: {
			data: {
				id: number;
				attributes: {
					slug: string;
					navigation: number;
					published_at: string;
					created_by: number;
					updated_by: number;
					created_at: string;
					updated_at: string;
				}
			}
		};
	}
}
