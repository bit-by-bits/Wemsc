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
      title="Welcome To Wemsc Auth"
      description=""
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
                brand: "#0066F5",
                brandAccent: "#0066F5",
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
