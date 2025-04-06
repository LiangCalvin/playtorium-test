export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string; // ✅ Added category
  }
  
  export interface DiscountCampaign {
    id: string;
    name: string;
    category: "Coupon" | "On Top" | "Seasonal";
    type: "Fixed" | "Percentage";
    value: number;
  }
  
  export class DiscountModule {
    static applyDiscounts(cart: CartItem[], campaigns: DiscountCampaign[]): number {
      if (!cart.length) return 0;
  
      let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      const selectedCampaigns: Record<string, DiscountCampaign> = {};
      campaigns.forEach((campaign) => {
        if (!selectedCampaigns[campaign.category] || campaign.value > selectedCampaigns[campaign.category].value) {
          selectedCampaigns[campaign.category] = campaign;
        }
      });
  
      const order = ["Coupon", "On Top", "Seasonal"];
      order.forEach((category) => {
        const campaign = selectedCampaigns[category];
        if (campaign) {
          if (campaign.type === "Fixed") {
            total -= campaign.value;
          } else if (campaign.type === "Percentage") {
            total -= (total * campaign.value) / 100;
          }
        }
      });
  
      return Math.max(total, 0);
    }
  }
  