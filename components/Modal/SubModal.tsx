"use client";

import React, { FC, useState } from "react";
import Modal from "./ParentModal";
import { Price, ProductWithPrice } from "@/Interfaces";
import { useUser } from "@/utils/useUser";
import toast from "react-hot-toast";
import useSub from "./ModalUtils/useSub";

interface SubModalProps {
  products: ProductWithPrice[];
}

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
      if (!user) throw new Error("Must be logged in");
      if (sub) throw new Error("Already subscribed");

      setPriceIdLoading(price.id);

      // Uncomment the following lines when integrating with your checkout logic
      // const { sessionId } = await postData({
      //   url: "/api/create-checkout-session",
      //   data: { price },
      // });

      // const stripe = await getStripe();
      // stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content;

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
                className="mb-4"
              >
                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
              </button>
            ));
          }
        })}
      </div>
    );
  } else {
    content = (
      <div className="text-center">
        {sub ? "Already subscribed." : "No products available."}
      </div>
    );
  }

  return (
    <Modal
      title="Subscribe!"
      description="Subscribe to get access to all the features."
      isOpen={isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};

export default SubModal;
