import { useRef, useState } from 'react';

import { useOutsideClick } from '@/hooks/common/use-outside-click';

export function useDropdown<T extends HTMLElement>() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<T>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  useOutsideClick({ ref, handler: () => setDropdownOpen(false) });

  return { targetRef: ref, isDropdownOpen, toggleDropdown };
}
