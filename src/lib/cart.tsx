import { toast } from "sonner";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "dali-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add: CartCtx["add"] = (item, qty = 1) => {
    toast.success("Producto agregado al carrito", { description: `${item.name} — ${item.size}` });
    setItems((prev) => {
      const found = prev.find((i) => i.slug === item.slug && i.size === item.size);
      if (found) {
        return prev.map((i) => (i === found ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...item, qty }];
    });
  };

  const setQty: CartCtx["setQty"] = (slug, size, qty) =>
    setItems((prev) =>
      prev
        .map((i) => (i.slug === slug && i.size === size ? { ...i, qty: Math.max(0, qty) } : i))
        .filter((i) => i.qty > 0),
    );

  const remove: CartCtx["remove"] = (slug, size) =>
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));

  return (
    <Ctx.Provider
      value={{
        items,
        add,
        setQty,
        remove,
        clear: () => setItems([]),
        count: items.reduce((n, i) => n + i.qty, 0),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
