"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import ParentModal from "./ParentModal";
import useAuth from "./ModalUtils/useAuth";

const AuthModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useAuth();

  const { session } = useSessionContext();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => !open && onClose();

  return (
    <ParentModal
      title="Welcome back"
      description="Login to your account."
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        magicLink={true}
        providers={["github", "google"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
        theme="dark"
      />
    </ParentModal>
  );
};

export default AuthModal;