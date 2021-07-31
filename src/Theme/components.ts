const components = {
  IconButton: {
    baseStyle: {
      variant: "ghost",
      borderRadius: "lg",
    },
  },
  UnorderedList: {
    baseStyle: {
      stylePosition: "inside",
    },
  },
  Link: {
    baseStyle: {
      textDecoration: "underline",
      color: "brand.500",
    },
  },
  Select: {
    baseStyle: {
      width: "auto",
    },
  },
  PinInput: {
    variants: {
      filled: {
        _selected: {
          backgroundColor: "white",
        },
        _active: {
          backgroundColor: "white",
        },
        _focus: {
          backgroundColor: "white",
        },
      },
    },
  },
  Button: {
    variants: {
      primary: {
        background: "gray.800",
        backgroundColor: "gray.800",
        color: "white",
        boxShadow: "6px 6px 0px rgba(0, 0, 0, 0.25)",
        _hover: {
          background: "gray.900",
          backgroundColor: "gray.900",
          boxShadow: "12px 12px 0px rgba(0, 0, 0, 0.25)",
          transform: "translate(-4px, -4px) scale(1.1)",
        },
        _active: {
          background: "gray.900",
          backgroundColor: "gray.900",
          boxShadow: "none",
          transform: "none",
        },
        _loading: {
          background: "gray.600",
          backgroundColor: "gray.600",
          boxShadow: "6px 6px 0px rgba(0, 0, 0, 0.25)",
          transform: "none",
        },
        _focus: {
          background: "gray.900",
          backgroundColor: "gray.900",
          boxShadow: "7px 7px 0px rgba(0, 0, 0, 0.25)",
        },
        _disabled: {
          background: "gray.600",
          backgroundColor: "gray.600",
          boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.25)",
        },
      },
    },
  },
  Text: {
    baseStyle: {
      color: "gray.800",
      fontWeight: 600,
    },
    variants: {
      title1: {
        fontSize: "3xl",
        fontWeight: "bold",
        as: "h1",
      },
      title2: {
        fontSize: "2xl",
        fontWeight: "bold",
        as: "h2",
      },
      title3: {
        fontSize: "lg",
        fontWeight: "semibold",
        color: "gray.600",
        as: "h3",
      },
      subtitle1: {
        fontSize: "lg",
        color: "gray.400",
        as: "h3",
      },
      subtitle2: {
        fontSize: "md",
        color: "gray.400",
        as: "h4",
      },
      subtitl3: {
        fontSize: "sm",
        color: "gray.400",
        as: "p",
      },
    },
  },
};

export default components;
