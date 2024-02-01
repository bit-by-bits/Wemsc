"use client";

import urls from "@/URL";
import React, { FC, useState } from "react";
import { Price } from "@/Interfaces";
import { useUser } from "@/utils/useUser";
import toast from "react-hot-toast";
import useSub from "./ModalUtils/useSub";
import { postData } from "@/utils/useAPI";
import { fetchSTRIPE } from "@/utils/useStripe";
import { SubModalProps } from "./Interfaces";
import ParentModal from "./ParentModal";

const formatPrice = (price: Price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);
};

const SubModal: FC<SubModalProps> = ({ products }) => {
  const { isOpen, onClose } = useSub();
  const { user, loading, sub } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string | undefined>();

  const onChange = (open: boolean) => !open && onClose();

  const handleCheckout = async (price: Price) => {
    try {
      if (!user) throw new Error("User Not Found");
      if (sub) throw new Error("User Already Subscribed");

      setPriceIdLoading(price.id);

      const { sessionId } = await postData({
        URL: urls.CHECKOUT_SESSION,
        data: { price },
      });

      const STRIPE = await fetchSTRIPE();
      STRIPE?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error");
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content = <div className="text-center mb-2">No products available.</div>;

  if (products.length) {
    content = (
      <div>
        {products.map(product => {
          const { id, prices } = product;

          if (!id) {
            return <div key={product.id}>No product id</div>;
          } else if (prices?.length === 0) {
            return <div key={product.id}>No prices available</div>;
          } else {
            return prices?.map(price => (
              <button
                key={price.id}
                onClick={() => handleCheckout(price)}
                disabled={loading || price.id === priceIdLoading}
                className="w-full rounded-full py-2 px-4 bg-link-active hover:bg-opacity-75 text-white mb-4"
              >
                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
              </button>
            ));
          }
        })}
      </div>
    );
  }

  if (sub)
    content = <div className="text-center mb-2">Already subscribed.</div>;

  return (
    <ParentModal
      title="Subscribe!"
      description="Subscribe to get access to all the features."
      isOpen={isOpen}
      onChange={onChange}
    >
      {content}
    </ParentModal>
  );
};

export default SubModal;
