import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  HStack,
  PinInput,
  PinInputField,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import firebase from "@Firebase";
import { useGetUserByPhone } from "@Hooks";

import Input from "../Input";

type VerifyPhoneProps = {
  onVerify?: (authId: string, phone: string) => void;
  register?: boolean;
};

const VerifyPhone: React.FC<VerifyPhoneProps> = ({ onVerify, register }) => {
  const { getUserByPhone } = useGetUserByPhone();
  const toast = useToast();
  const router = useRouter();

  const [confirmationResult, setConfirmationResult] = useState<any>();
  const [verifyMode, setVerifyMode] = useState<any>(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sendSmsLoading, setSendSmsLoading] = useState(false);
  const [verifyCodeLoading, setVerifyCodeLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (window as any).recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "captchaContainer",
      {
        size: "invisible",
      }
    );
    return () => (window as any).recaptchaVerifier.clear();
  }, []);

  const onSendCode = async (phoneNumber: string) => {
    // get captcha object
    const users = await getUserByPhone(phoneNumber);

    if (users.length > 0 && register) {
      setError("Phone already registered");
      return;
    }

    setSendSmsLoading(true);
    const appVerifier = (window as any).recaptchaVerifier;
    try {
      const cR = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier);
      setConfirmationResult(cR);
      setVerifyMode(true);
      setSendSmsLoading(false);
    } catch (err) {
      toast({
        title: "Error signing up",
        description: err.message,
        status: "error",
      });
      setSendSmsLoading(false);
      if ((window as any).captchaWidgetId) {
        (window as any).grecaptcha.reset((window as any).captchaWidgetId);
      } else {
        (window as any).recaptchaVerifier
          .render()
          .then((widgetId: any) => {
            (window as any).captchaWidgetId = widgetId;
            (window as any).grecaptcha.reset(widgetId);
          })
          .catch((err: any) => {
            console.error(err);
          });
      }
    }
  };

  const verifyCodeError = () =>
    toast({
      status: "error",
      title: "Error verifying code!",
    });

  const onVerifyCode = async (enteredCode: string) => {
    setVerifyCodeLoading(true);
    try {
      if (confirmationResult) {
        const result = await confirmationResult.confirm(enteredCode);
        const user = result.user;
        if (onVerify) {
          onVerify(user.uid, phone);
        }
        setVerifyCodeLoading(false);
      } else {
        throw new Error("SMS code cannot be verified. Please try again.");
      }
    } catch (err) {
      verifyCodeError();
      setVerifyCodeLoading(false);
    }
  };

  return (
    <Box mt={4}>
      {verifyMode ? (
        <>
          <HStack mx="auto" justifyContent="center">
            <PinInput
              otp
              value={code}
              onChange={(e) => setCode(e)}
              variant="filled"
            >
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>

          <Button
            mt={4}
            type="button"
            onClick={() => onVerifyCode(code)}
            isDisabled={code.length !== 6}
            isLoading={verifyCodeLoading}
          >
            Verify Code
          </Button>
        </>
      ) : (
        <>
          <Input
            label="Phone"
            type="phone"
            placeholder="+15106427464"
            info="Make sure you match the +15106427464 format"
            value={phone}
            error={error}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button
            mt={4}
            type="button"
            onClick={() => onSendCode(phone)}
            isLoading={sendSmsLoading}
          >
            {register ? "Sign Up" : "Sign In"}
          </Button>
        </>
      )}
      <div id="captchaContainer" />
    </Box>
  );
};

export default VerifyPhone;
