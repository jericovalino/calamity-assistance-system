import { useCallback } from "react";
import { IconType } from "react-icons";
import { HiInformationCircle } from "react-icons/hi";

import { cn } from "@/utils";

const MAP_THEME_NORMAL_CLASS = {
  primary: "bg-brand text-onBrand",
  info: "bg-info text-onInfo",
  success: "bg-success text-onSuccess",
  warning: "bg-warning text-onWarning",
  danger: "bg-danger text-onDanger",
  default: "border border-subtle bg-interface-hovered",
  inverse: "bg-inverse text-onInverse",
};

const MAP_THEME_OUTLINED_CLASS = {
  primary: "border border-primary-subtle text-onBrand-subtle bg-brand-subtle",
  info: "border border-info-subtle text-onInfo-subtle bg-info-subtle",
  success:
    "border border-success-subtle text-onSuccess-subtle bg-success-subtle",
  warning:
    "border border-warning-subtle text-onWarning-subtle bg-warning-subtle",
  danger: "border border-danger-subtle text-onDanger-subtle bg-danger-subtle",
  default: "border bg-interface-subtle",
  inverse:
    "border border-inverse-subtle text-onInverse-subtle bg-inverse-subtle",
};

const MAP_THEME_ACCENT_CLASS = {
  primary: "text-onBrand-subtle bg-brand-subtle",
  info: "text-onInfo-subtle bg-info-subtle",
  success: "text-onSuccess-subtle bg-success-subtle",
  warning: "text-onWarning-subtle bg-warning-subtle",
  danger: "text-onDanger-subtle bg-danger-subtle",
  default: "active:bg-interface-hovered-subtle",
  inverse: "text-onInverse-subtle bg-inverse-subtle",
};

type IndicatorPosition = "left" | "right";
type IndicatorProperties = {
  indicatorType: "solidDot" | "icon" | "image";
  indicatorPosition?: IndicatorPosition;
  onIndicatorClicked?: () => void;
};

type Props = {
  label: string;
  style?: "normal" | "outline" | "accent";
  theme?: keyof typeof MAP_THEME_NORMAL_CLASS;
  isRounded?: boolean;
} & (
  | {
      indicatorType?: "none";
    }
  | ({
      indicatorType: "solidDot" | "icon" | "image";
      indicatorPosition?: IndicatorPosition;
      onIndicatorClicked?: () => void;
    } & (
      | {
          indicatorType: "solidDot";
          indicatorTheme?: keyof typeof MAP_THEME_NORMAL_CLASS;
        }
      | {
          indicatorType: "icon";
          icon?: IconType;
        }
      | {
          indicatorType: "image";
          imgSrc: string;
        }
    ))
);
type DefaultPropertyKeys = Omit<
  Props,
  "label" | "style" | "theme" | "isRounded"
>;

const Badge = ({
  label,
  isRounded = false,
  style = "normal",
  theme = "default",
  ...rest
}: Props) => {
  const Indicator = useCallback(() => {
    if (rest.indicatorType === "solidDot") {
      return (
        <span
          className={cn(
            "m-0.5 h-2 w-2 rounded-full border border-transparent",
            {
              primary: "bg-brand",
              info: "bg-info",
              success: "bg-status-success",
              warning: "bg-status-warning",
              danger: "bg-status-danger",
              default: "bg-status-neutral",
              inverse: "bg-inverse",
            }[rest.indicatorTheme ?? "default"]
          )}
        />
      );
    }
    if (rest.indicatorType === "icon") {
      const Icon = rest.icon ?? HiInformationCircle;
      return <Icon className="m-0.5 h-3 w-3" />;
    }
    if (rest.indicatorType === "image") {
      return (
        <img
          src={rest.imgSrc}
          className={cn(
            "h-4 w-4",
            isRounded ? "rounded-full" : "rounded-[0.13rem]"
          )}
        />
      );
    }
    return null;
  }, [rest, isRounded]);

  const checkIfHasIndicator = useCallback(
    (rest: DefaultPropertyKeys): rest is IndicatorProperties =>
      rest.indicatorType === "icon" ||
      rest.indicatorType === "image" ||
      rest.indicatorType === "solidDot",
    []
  );

  const checkIfHasIndicatorOnClickedFunction = useCallback(
    (rest: DefaultPropertyKeys): rest is IndicatorProperties =>
      checkIfHasIndicator(rest) &&
      typeof rest.onIndicatorClicked === "function",
    [checkIfHasIndicator]
  );

  return (
    <div
      className={cn(
        "flex h-max w-max items-center p-0.5",
        isRounded ? "rounded-full" : "rounded",
        checkIfHasIndicator(rest) && rest.indicatorPosition === "right"
          ? "flex-row-reverse"
          : "",
        {
          normal: MAP_THEME_NORMAL_CLASS[theme],
          outline: MAP_THEME_OUTLINED_CLASS[theme],
          accent: MAP_THEME_ACCENT_CLASS[theme],
        }[style]
      )}
    >
      {checkIfHasIndicatorOnClickedFunction(rest) ? (
        <button type="button" onClick={rest.onIndicatorClicked}>
          <Indicator />
        </button>
      ) : (
        <Indicator />
      )}
      <p className="whitespace-nowrap px-1 text-xs font-bold leading-[0.875rem]">
        {label}
      </p>
    </div>
  );
};

export default Badge;
