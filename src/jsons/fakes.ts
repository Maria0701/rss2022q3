import { CartItem } from "../store/cartSlice";

  
    export type CheckoutResponse = { success: boolean; error?: string };
  
  export async function checkout(items: CartItem[]): Promise<CheckoutResponse> {
    const modifier = items.length > 0 ? "success" : "error";
    const url = `/checkout-${modifier}.json`;
    await sleep(500);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(items),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error);
    }
    return data as CheckoutResponse;
  }
  
  // utility function to simulate slowness in an API call
  const sleep = (time: number) =>
    new Promise((res) => setTimeout(res, time));