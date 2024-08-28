import twContainerQueries from "@tailwindcss/container-queries";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        interface: {
          DEFAULT: "var(--white-100)",
          selected: {
            DEFAULT: "var(--blue-400)",
            subtle: "var(--blue-50)",
          },
          active: "var(--white-100)",
          hovered: "var(--white-200)",
          disabled: "var(--white-300)",
          light: "var(--white-100)",
          overlay: "var(--alpha-40)",
        },
        status: {
          neutral: "var(--white-400)",
          success: "var(--green-400)",
          warning: "var(--yellow-400)",
          danger: "var(--red-600)",
        },
        inverse: {
          DEFAULT: "var(--black-500)",
          hovered: "var(--black-600)",
          pressed: "var(--black-400)",
        },
        brand: {
          DEFAULT: "var(--brand-700)",
          hovered: { DEFAULT: "var(--brand-800)", subtle: "var(--brand-100)" },
          pressed: { DEFAULT: "var(--brand-900)", subtle: "var(--brand-200)" },
          subtle: "var(--brand-50)",
        },
        info: {
          DEFAULT: "var(--blue-700)",
          hovered: { DEFAULT: "var(--blue-800)", subtle: "var(--blue-100)" },
          pressed: { DEFAULT: "var(--blue-900)", subtle: "var(--blue-200)" },
          subtle: "var(--blue-50)",
        },
        success: {
          DEFAULT: "var(--green-600)",
          hovered: { DEFAULT: "var(--green-700)", subtle: "var(--green-100)" },
          pressed: { DEFAULT: "var(--green-800)", subtle: "var(--green-200)" },
          subtle: "var(--green-50)",
        },
        warning: {
          DEFAULT: "var(--yellow-600)",
          hovered: {
            DEFAULT: "var(--yellow-500)",
            subtle: "var(--yellow-100)",
          },
          pressed: {
            DEFAULT: "var(--yellow-700)",
            subtle: "var(--yellow-200)",
          },
          subtle: "var(--yellow-50)",
        },
        danger: {
          DEFAULT: "var(--red-600)",
          hovered: {
            DEFAULT: "var(--red-500)",
            subtle: "var(--red-100)",
          },
          pressed: {
            DEFAULT: "var(--red-700)",
            subtle: "var(--red-200)",
          },
          subtle: "var(--red-50)",
        },
      },
      textColor: {
        DEFAULT: "var(--black-800)",
        inverse: "var(--white-200)",
        subtle: "var(--white-1100)",
        placeholder: "var(--white-800)",
        disabled: "var(--white-700)",
        brand: "var(--brand-700)",
        info: "var(--blue-700)",
        success: "var(--green-600)",
        warning: "var(--yellow-600)",
        danger: "var(--red-700)",
        light: "var(--white-100)",
        dark: "var(--black-100)",
        onSelected: {
          DEFAULT: "var(--white-50)",
          subtle: "var(--blue-600)",
        },
        onInverse: {
          DEFAULT: "var(--white-100)",
        },
        onBrand: {
          DEFAULT: "var(--white-50)",
          subtle: "var(--brand-700)",
        },
        onInfo: {
          DEFAULT: "var(--white-50)",
          subtle: "var(--blue-700)",
        },
        onSuccess: {
          DEFAULT: "var(--white-50)",
          subtle: "var(--green-700)",
        },
        onWarning: {
          DEFAULT: "var(--white-50)",
          subtle: "var(--yellow-700)",
        },
        onDanger: {
          DEFAULT: "var(--white-50)",
          subtle: "var(--red-700)",
        },
      },
      borderColor: {
        DEFAULT: "var(--white-400)",
        subtle: "var(--white-300)",
        selected: "var(--brand-600)",
        light: "var(--brand-100)",
        brand: {
          DEFAULT: "var(--brand-600)",
          subtle: "var(--brand-400)",
        },
        info: {
          DEFAULT: "var(--blue-700)",
          subtle: "var(--blue-400)",
        },
        success: {
          DEFAULT: "var(--green-700)",
          subtle: "var(--green-400)",
        },
        warning: {
          DEFAULT: "var(--yellow-200)",
          subtle: "var(--yellow-400)",
        },
        danger: {
          DEFAULT: "var(--red-400)",
          subtle: "var(--red-500)",
        },
      },
    },
  },
  plugins: [twContainerQueries],
};
