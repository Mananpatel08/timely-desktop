import { useEffect, useCallback } from "react";
import { useOutsideClickDetector } from "./use-outside-click-detector";

type Args = {
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  isOpen: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  query?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
};

export function useDropdown({
  dropdownRef,
  inputRef,
  isOpen,
  onClose,
  onOpen,
  query,
  setIsOpen,
  setQuery,
}: Args) {
  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
    setQuery?.("");
  }, [setIsOpen, onClose, setQuery]);

  const toggle = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true);
      onOpen?.();
    } else {
      close();
    }
  }, [isOpen, setIsOpen, onOpen, close]);

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    if (e.key === "Enter") toggle();
  };

  const searchInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (query && e.key === "Escape") {
      e.stopPropagation();
      setQuery?.("");
    }
  };

  // Close only when clicked OUTSIDE
  useOutsideClickDetector(dropdownRef, () => {
    if (isOpen) close();
  });

  // Autofocus input when opened
  useEffect(() => {
    if (isOpen && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [isOpen, inputRef]);

  return {
    handleClose: close,
    handleKeyDown,
    handleOnClick,
    searchInputKeyDown,
  };
}
