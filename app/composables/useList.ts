// app/composables/useList.ts
import type { MediaType } from '~/types/tmdb'

export interface ListItem {
	id: number
	type: MediaType
	title: string
	posterPath: string | null
}

const STORAGE_KEY = 'streamlab:my-list'

export default function () {
	const items = useLocalStorage<ListItem[]>(STORAGE_KEY, [])
	const isOpen = useState<boolean>('my-list-open', () => false)

	const open = (): void => {
		isOpen.value = true
	}

	const close = (): void => {
		isOpen.value = false
	}

	const toggle = (): void => {
		isOpen.value = !isOpen.value
	}

	const has = (id: number, type: MediaType): boolean =>
		items.value.some((i) => i.id === id && i.type === type)

	const add = (item: ListItem): void => {
		if (has(item.id, item.type)) return
		items.value = [...items.value, item]
	}

	const remove = (id: number, type: MediaType): void => {
		items.value = items.value.filter((i) => !(i.id === id && i.type === type))
	}

	const toggleItem = (item: ListItem): void => {
		if (has(item.id, item.type)) remove(item.id, item.type)
		else add(item)
	}

	return {
		items,
		isOpen,
		open,
		close,
		toggle,
		has,
		add,
		remove,
		toggleItem,
	}
}
