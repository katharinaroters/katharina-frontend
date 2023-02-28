<script>
	import { page, navigating } from '$app/stores';
	import { navToLeftOpened } from '$store';
	export let navItems;
	export let iteration = 1;
	const getPrevLevel = () => {
		const splitted = $page.path.split('/');
		const sliced = splitted.slice(0, splitted.length - 1);
		const prevLevel = splitted.length > 2 ? sliced.join('/') : '/';
		return prevLevel;
	};
	const isSelectedParent = (itemSlug, currentPath) => {
		if (currentPath === '/') return true;

		if (itemSlug.split('/')[0] === currentPath.split('/')[1]) return true;

		return false;
	};
	const isFirstIteration = (_) => iteration === 1;
	const isFaded = (slug, path) => isFirstIteration() && !isSelectedParent(slug, path);

	const hasActiveItem = (slug, currentPath, navigating = null) =>
		currentPath.includes(`/${slug}`) ||
		(navigating !== null && navigating.to.path.includes(`/${slug}`));

	const isSelectedItem = (navItem, currentPath) => '/' + navItem.slug?.slug === currentPath;
</script>

{#if navItems && navItems.length}
	<ul class="noselect">
		{#each navItems as navItem, index}
			<li
				class:hasActive={hasActiveItem(navItem.slug?.slug, $page.path, $navigating) ||  $navToLeftOpened === navItem.slug?.slug}
				class:selected={isSelectedItem(navItem, $page.path)}
				class:faded={isFaded(navItem.slug?.slug, $page.path) &&
					$navToLeftOpened !== navItem.slug?.slug}
			>
				<a
					href={isSelectedItem(navItem, $page.path)
						? getPrevLevel()
						: `/${navItem.slug.slug}`}
				>
					<span>{navItem.title}</span>
				</a>
				{#if hasActiveItem(navItem.slug?.slug, $page.path, $navigating) || $navToLeftOpened === navItem.slug?.slug}
					<svelte:self iteration={iteration + 1} navItems={navItem.nestedNavigations} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style type="scss">
	ul {
		list-style-type: none;
		margin-bottom: 25px;

		padding-left: 0;
		font-weight: normal;
		font-size: var(--navigation-fs);
		text-transform: uppercase;
	}
	li {
		:global(ul) {
			padding-top: 10px;
		}
		cursor: pointer;
		padding-top: var(--navigation-padding);
		&:first-child {
			padding-top: calc(var(--navigation-padding) + 1px);
		}
		&:not(:last-child) {
			padding-bottom: var(--navigation-padding);
		}
		overflow: hidden;
		&:hover {
			color: #000;
		}
		&.hasActive {
			:global(ul) {
				top: 0;
				display: block;
			}
		}

		&.selected {
			:global(ul) {
				top: 0;
				display: block;
			}
			& > a > span:first-child {
				color: #000;
				font-weight: bold;
			}
		}
		&.faded {
			& > a > span:first-child {
				&:hover {
					color: #000;
				}
				color: #9c9c9c;
				font-weight: bold;
			}
		}
	}
</style>
