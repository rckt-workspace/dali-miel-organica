import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "sonner";

import {
  getProduct,
  getProductPriceCop,
} from "@/lib/products";

export type CartItem = {
  slug: string;
  name: string;
  size: string;
  image: string;
  price: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];

  add: (
    item: Omit<
      CartItem,
      "qty"
    >,
    qty?: number,
  ) => void;

  setQty: (
    slug: string,
    size: string,
    qty: number,
  ) => void;

  remove: (
    slug: string,
    size: string,
  ) => void;

  clear: () => void;

  count: number;

  subtotalCop: number;

  pricesConfigured: boolean;
};

const Ctx =
  createContext<CartCtx | null>(
    null,
  );

const KEY =
  "dali-cart";

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] =
    useState<CartItem[]>([]);

  const [hydrated, setHydrated] =
    useState(false);

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem(
          KEY,
        );

      if (raw) {
        const parsed =
          JSON.parse(raw);

        if (
          Array.isArray(
            parsed,
          )
        ) {
          setItems(
            parsed as CartItem[],
          );
        }
      }
    } catch {
      localStorage.removeItem(
        KEY,
      );
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    try {
      localStorage.setItem(
        KEY,
        JSON.stringify(
          items,
        ),
      );
    } catch {
      // Storage can be disabled.
    }
  }, [
    hydrated,
    items,
  ]);

  const add:
    CartCtx["add"] = (
      item,
      qty = 1,
    ) => {
      const catalogProduct =
        getProduct(item.slug);

      if (
        catalogProduct &&
        !catalogProduct.available
      ) {
        toast.error(
          `${catalogProduct.name} no está disponible por ahora.`,
        );

        return;
      }

      const safeQty =
        Math.max(
          1,
          Math.min(
            10,
            Math.trunc(qty),
          ),
        );

      toast.success(
        "Producto agregado al carrito",
        {
          description:
            `${item.name} — ${item.size}`,
        },
      );

      setItems(
        (previous) => {
          const found =
            previous.find(
              (
                current,
              ) =>
                current.slug ===
                  item.slug &&
                current.size ===
                  item.size,
            );

          if (found) {
            return previous.map(
              (
                current,
              ) =>
                current.slug ===
                  item.slug &&
                current.size ===
                  item.size
                  ? {
                      ...current,
                      qty:
                        Math.min(
                          10,
                          current.qty +
                            safeQty,
                        ),
                    }
                  : current,
            );
          }

          return [
            ...previous,
            {
              ...item,
              qty: safeQty,
            },
          ];
        },
      );
    };

  const setQty:
    CartCtx["setQty"] = (
      slug,
      size,
      qty,
    ) => {
      const nextQty =
        Math.trunc(qty);

      setItems(
        (previous) =>
          previous
            .map(
              (
                item,
              ) =>
                item.slug ===
                  slug &&
                item.size ===
                  size
                  ? {
                      ...item,
                      qty:
                        Math.max(
                          0,
                          Math.min(
                            10,
                            nextQty,
                          ),
                        ),
                    }
                  : item,
            )
            .filter(
              (item) =>
                item.qty >
                0,
            ),
      );
    };

  const remove:
    CartCtx["remove"] = (
      slug,
      size,
    ) => {
      setItems(
        (previous) =>
          previous.filter(
            (item) =>
              !(
                item.slug ===
                  slug &&
                item.size ===
                  size
              ),
          ),
      );
    };

  const count =
    useMemo(
      () =>
        items.reduce(
          (
            total,
            item,
          ) =>
            total +
            item.qty,
          0,
        ),
      [items],
    );

  const {
    subtotalCop,
    pricesConfigured,
  } = useMemo(() => {
    let subtotal = 0;
    let configured = true;

    for (
      const item of items
    ) {
      const unitPrice =
        getProductPriceCop(
          item.slug,
          item.size,
        );

      if (
        unitPrice ===
        null
      ) {
        configured =
          false;
        continue;
      }

      subtotal +=
        unitPrice *
        item.qty;
    }

    return {
      subtotalCop:
        subtotal,
      pricesConfigured:
        configured,
    };
  }, [items]);

  return (
    <Ctx.Provider
      value={{
        items,
        add,
        setQty,
        remove,

        clear: () => {
          setItems([]);
        },

        count,

        subtotalCop,

        pricesConfigured,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx =
    useContext(Ctx);

  if (!ctx) {
    throw new Error(
      "useCart must be used inside CartProvider",
    );
  }

  return ctx;
}