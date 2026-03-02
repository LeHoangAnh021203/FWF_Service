"use client";

import { useCallback, useEffect, useState } from "react";

export type SharedCartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: "service" | "voucher";
};

const STORAGE_KEY = "fwf-shared-cart-v1";
const EVENT_NAME = "fwf-shared-cart-updated";

type SharedCartState = {
  items: Record<string, SharedCartItem>;
  customerPhone: string;
};

const EMPTY_STATE: SharedCartState = {
  items: {},
  customerPhone: "",
};

const readState = (): SharedCartState => {
  if (typeof window === "undefined") return EMPTY_STATE;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as
      | SharedCartState
      | Record<string, SharedCartItem>;

    // Backward compatibility for old storage shape (items-only object)
    if (parsed && typeof parsed === "object" && !("items" in parsed)) {
      return {
        items: parsed as Record<string, SharedCartItem>,
        customerPhone: "",
      };
    }

    return {
      items: parsed?.items ?? {},
      customerPhone: parsed?.customerPhone ?? "",
    };
  } catch {
    return EMPTY_STATE;
  }
};

const writeState = (state: SharedCartState) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: state }));
};

export default function useSharedCart() {
  const [cartItems, setCartItems] = useState<Record<string, SharedCartItem>>({});
  const [customerPhone, setCustomerPhoneState] = useState("");

  useEffect(() => {
    const syncState = () => {
      const current = readState();
      setCartItems(current.items);
      setCustomerPhoneState(current.customerPhone);
    };

    syncState();

    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        syncState();
      }
    };

    window.addEventListener(EVENT_NAME, syncState);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(EVENT_NAME, syncState);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const addItem = useCallback((item: SharedCartItem) => {
    const current = readState();
    const existing = current.items[item.id];

    const next = {
      ...current.items,
      [item.id]: existing ? { ...existing, quantity: existing.quantity + item.quantity } : item,
    };

    writeState({ ...current, items: next });
  }, []);

  const changeQuantity = useCallback((id: string, delta: number) => {
    const current = readState();
    const target = current.items[id];
    if (!target) return;

    const nextQuantity = target.quantity + delta;
    if (nextQuantity <= 0) {
      const next = { ...current.items };
      delete next[id];
      writeState({ ...current, items: next });
      return;
    }

    writeState({
      ...current,
      items: {
        ...current.items,
        [id]: { ...target, quantity: nextQuantity },
      },
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    const current = readState();
    if (!current.items[id]) return;

    const next = { ...current.items };
    delete next[id];
    writeState({ ...current, items: next });
  }, []);

  const setCustomerPhone = useCallback((phone: string) => {
    const current = readState();
    writeState({ ...current, customerPhone: phone });
  }, []);

  return {
    cartItems,
    customerPhone,
    setCustomerPhone,
    addItem,
    changeQuantity,
    removeItem,
  };
}
