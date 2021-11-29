import React, { useEffect, useState } from "react";

import {
  Alert,
  useToast,
  AlertIcon,
  Select,
  Text,
  Box,
} from "@chakra-ui/react";
import useMarkUserPaid from "@Hooks/party/useMarkUserPaid";
import { PayPalButton } from "react-paypal-button-v2";

import { PartyPrice } from "@Models";

type PaymentSectionProps = {
  price: PartyPrice[];
  amountPaid?: number;
  paidAt?: number;
  eventId: string;
  userId: string;
};

const PaymentSection: React.FC<PaymentSectionProps> = ({
  price,
  amountPaid,
  eventId,
  userId,
}) => {
  const toast = useToast();

  const { markUserPaid, data } = useMarkUserPaid();

  const [selectedPrice, setSelectedPrice] = useState<number>();

  useEffect(() => {
    if (data) {
      toast({
        status: "success",
        title: "Payment received!",
      });
    }
  }, [data]);

  const handleSuccess = async (details: any, data: { orderID: string }) => {
    await markUserPaid(
      eventId,
      userId,
      selectedPrice as number,
      data.orderID as string
    );
  };

  return (
    <Box mt={2}>
      <Text fontSize="xl" fontWeight="bold" color="gray.700">
        Tickets
      </Text>

      {amountPaid ? (
        <Alert status="success">
          <AlertIcon />
          Already paid for ticket:{" "}
          {price.find((p) => p.price === amountPaid)?.title} ($
          {amountPaid / 100})
        </Alert>
      ) : (
        <>
          {price.map((p) => (
            <Box key={JSON.stringify(p)}>
              <Text fontSize="md">
                {p.title} - {p.price / 100}
              </Text>
              <Text fontSize="sm" color="gray500">
                {p.description}
              </Text>
            </Box>
          ))}

          <Text fontSize="xl" fontWeight="bold" color="gray.700" mt={2}>
            Purchase Ticket
          </Text>

          <Select
            placeholder="Select ticket"
            mb={2}
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(parseInt(e.target.value, 10))}
          >
            {price.map((p) => (
              <option
                value={p.price}
                key={p.title + p.price + "purchase option"}
              >
                {p.title} - {p.price / 100}
              </option>
            ))}
          </Select>

          {selectedPrice && (
            <PayPalButton
              amount={selectedPrice / 100}
              shippingPreference="NO_SHIPPING"
              onSuccess={handleSuccess}
              onError={() => {
                toast({
                  status: "error",
                  title: "Something went wrong :(",
                });
              }}
              options={
                {
                  enableFunding: "venmo",
                  clientId:
                    "AV6H4sxp_Q1Y_37MUsuykY6NLE951UA-qoAhA_VY-Xe8ocxmUcIXF6y39663yVdf6vJniR2l-ju1mXz5",
                } as any
              }
            />
          )}
        </>
      )}
    </Box>
  );
};

export default PaymentSection;
