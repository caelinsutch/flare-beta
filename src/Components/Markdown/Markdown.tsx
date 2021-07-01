import React from "react";

import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown/src/ast-to-react";

type MarkdownProps = {
  children: string;
};

const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  const components: Components = {
    h1({ children }) {
      return <Text variant="title3">{children}</Text>;
    },
    ol({ children }) {
      return <OrderedList stylePosition="inside">{children}</OrderedList>;
    },
    li({ children }) {
      return <ListItem>{children}</ListItem>;
    },
  };

  return (
    <Box whiteSpace="pre-wrap">
      <ReactMarkdown components={components}>
        {children as string}
      </ReactMarkdown>
    </Box>
  );
};

export default Markdown;
