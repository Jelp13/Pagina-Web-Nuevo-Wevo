import { revalidatePath } from 'next/cache';

const SECTION_PATH: Record<string, string> = {
  torres: '/torres',
  perifericos: '/perifericos',
  portatiles: '/portatiles',
};

export function revalidateProductPaths(section: string, id?: string): void {
  const base = SECTION_PATH[section];
  if (!base) return;
  revalidatePath(base);
  if (id) revalidatePath(`${base}/${id}`);
  revalidatePath('/');
  if (section === 'torres') revalidatePath('/quiz');
}
