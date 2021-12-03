import React, { useState } from "react";

import { Container, Select } from "@chakra-ui/react";

import { PageContainer } from "@Components";

const Temp = () => {
  const [userId, setUserId] = useState();
  const [price, setPrice] = useState();

  return (
    <PageContainer>
      <Container>
        {/*<Input value={userId} onChange={(v) => setUserId(v.)} />*/}
        <Select>
          <option value={20}>Girls</option>
          <option value={40}>Boys</option>
        </Select>
      </Container>
    </PageContainer>
  );
};

export default Temp;
