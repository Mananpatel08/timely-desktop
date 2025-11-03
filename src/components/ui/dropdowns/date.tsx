import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { Calendar, CalendarDays, X } from "lucide-react";
import { Combobox } from "@headlessui/react";
import type { TDropdownProps } from "@/types/date";
import { useDropdown } from "@/hooks/use-dropdown";
import type { Matcher } from "react-day-picker";
import { cn } from "../helper";
import { ComboDropDown } from "../custom-dropdown";
import { BUTTON_VARIANTS_WITH_TEXT } from "@shared/constants/date";
import { getDate, renderFormattedDate } from "@/helpers/date.helper";

type Props = TDropdownProps & {
  clearIconClassName?: string;
  optionsClassName?: string;
  icon?: React.ReactNode;
  isClearable?: boolean;
  minDate?: Date;
  maxDate?: Date;
  onChange: (val: Date | null) => void;
  onClose?: () => void;
  value: Date | string | null;
  closeOnSelect?: boolean;
  formatToken?: string;
  renderByDefault?: boolean;
  spanClassName?: string;
};

export const DateDropdown: React.FC<Props> = ((props) => {
  const {
    buttonClassName = "",
    buttonContainerClassName,
    buttonVariant,
    className = "",
    clearIconClassName = "",
    optionsClassName = "",
    closeOnSelect = true,
    disabled = false,
    hideIcon = false,
    icon = <CalendarDays className="h-3 w-3 flex-shrink-0" />,
    isClearable = true,
    minDate,
    maxDate,
    onChange,
    onClose,
    placeholder = "Date",
    placement,
    showTooltip = false,
    tabIndex,
    value,
    formatToken,
    renderByDefault = true,
    spanClassName
  } = props;
  // states
  const [isOpen, setIsOpen] = useState(false);
  // refs
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // hooks
//   const { data } = useUserProfile();
//   const startOfWeek = data?.start_of_the_week;
  // popper-js refs
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  // popper-js init
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement ?? "bottom-start",
    modifiers: [
      {
        name: "preventOverflow",
        options: {
          padding: 12,
        },
      },
    ],
  });

  const isDateSelected = value && value.toString().trim() !== "";

  const onOpen = () => {
    if (referenceElement) referenceElement.focus();
  };

  const { handleClose, handleKeyDown, handleOnClick } = useDropdown({
    dropdownRef,
    isOpen,
    onClose,
    onOpen,
    setIsOpen,
  });

  const dropdownOnChange = (val: Date | null) => {
    onChange(val);
    if (closeOnSelect) {
      handleClose();
      referenceElement?.blur();
    }
  };

  const disabledDays: Matcher[] = [];
  if (minDate) disabledDays.push({ before: minDate });
  if (maxDate) disabledDays.push({ after: maxDate });

  const comboButton = (
    <button
      type="button"
      className={cn(
        "clickable block h-full max-w-full outline-none",
        {
          "cursor-not-allowed text-custom-text-200": disabled,
          "cursor-pointer": !disabled,
        },
        buttonContainerClassName
      )}
      ref={setReferenceElement}
      onClick={handleOnClick}
      disabled={disabled}
    >
      <DropdownButton
        className={buttonClassName}
        isActive={isOpen}
        tooltipHeading={placeholder}
        tooltipContent={value ? renderFormattedDate(value, formatToken) : "None"}
        showTooltip={showTooltip}
        variant={buttonVariant}
        renderToolTipByDefault={renderByDefault}
      >
        {!hideIcon && icon}
        {BUTTON_VARIANTS_WITH_TEXT.includes(buttonVariant) && (
          <span className={cn("flex-grow truncate", spanClassName)}>{value ? renderFormattedDate(value, formatToken) : placeholder}</span>
        )}
        {isClearable && !disabled && isDateSelected && (
          <X
            className={cn("h-2.5 w-2.5 flex-shrink-0", clearIconClassName)}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onChange(null);
            }}
          />
        )}
      </DropdownButton>
    </button>
  );

  return (
    <ComboDropDown
      as="div"
      ref={dropdownRef}
      tabIndex={tabIndex}
      className={cn("h-full", className)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if (!isOpen) handleKeyDown(e);
        } else handleKeyDown(e);
      }}
      button={comboButton}
      disabled={disabled}
      renderByDefault={renderByDefault}
    >
      {isOpen &&
        createPortal(
          <Combobox.Options data-prevent-outside-click static>
            <div
              className={cn(
                "my-1 bg-custom-background-100 shadow-custom-shadow-rg border-[0.5px] border-custom-border-300 rounded-md overflow-hidden z-20",
                optionsClassName
              )}
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <Calendar
                captionLayout="dropdown"
                classNames={{ root: `p-3 rounded-md` }}
                selected={getDate(value)}
                defaultMonth={getDate(value)}
                onSelect={(date) => {
                  dropdownOnChange(date ?? null);
                }}
                showOutsideDays
                initialFocus
                disabled={disabledDays}
                mode="single"
                fixedWeeks
              />
            </div>
          </Combobox.Options>,
          document.body
        )}
    </ComboDropDown>
  );
});
