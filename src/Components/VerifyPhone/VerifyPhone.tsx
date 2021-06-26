import { Box, Button, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import firebase from "../../Firebase";
import Input from "../Input";

type VerifyPhoneProps = {
  onVerify: (authId: string, phone: string) => void;
};

const VerifyPhone: React.FC<VerifyPhoneProps> = ({ onVerify }) => {
  const [confirmationResult, setConfirmationResult] = useState<any>();
  const [verifyMode, setVerifyMode] = useState<any>(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sendSmsLoading, setSendSmsLoading] = useState(false);
  const [verifyCodeLoading, setVerifyCodeLoading] = useState(false);
  const toast = useToast();

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
        onVerify(user.uid, phone);
        setVerifyCodeLoading(false);
      } else {
        throw new Error("SMS code cannot be verified. Please try again.");
      }
    } catch (err) {
      verifyCodeError();
      setVerifyCodeLoading(false);
    }
  };

  if (verifyMode) {
    return (
      <Box mt={4}>
        <Input
          label="Code"
          type="input"
          placeholder="123456"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          mt={4}
          colorScheme="orange"
          type="button"
          onClick={() => onVerifyCode(code)}
          isDisabled={code === ""}
          isLoading={verifyCodeLoading}
        >
          Verify Code
        </Button>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Input
        label="Phone"
        type="phone"
        placeholder="+15106427464"
        info="Make sure you match the +15106427464 format"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button
        mt={4}
        colorScheme="orange"
        type="button"
        onClick={() => onSendCode(phone)}
        isLoading={sendSmsLoading}
      >
        Send SMS code
      </Button>
      <div id="captchaContainer" />
    </Box>
  );
};

export default VerifyPhone;
