const components = {
  Link: {
    baseStyle: {
      textDecoration: "underline",
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
      },
      title2: {
        fontSize: "2xl",
        fontWeight: "bold",
      },
      title3: {
        fontSize: "lg",
        fontWeight: "semibold",
        color: "gray.600",
      },
      subtitle1: {
        fontSize: "lg",
        color: "gray.400",
      },
      subtitle2: {
        fontSize: "md",
        color: "gray.400",
      },
    },
  },
};

export default components;
