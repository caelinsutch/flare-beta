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
      color: "orange.400",
    },
  },
  Text: {
    baseStyle: {
      color: "gray.800",
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
