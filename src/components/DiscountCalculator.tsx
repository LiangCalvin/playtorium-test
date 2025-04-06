import React, { useState } from 'react'
import { DiscountCampaign, DiscountModule } from '../utils/discount-module';

interface DiscountCalculatorProps {
  cart: Item[];
}

type Item = {
  id: string;
  name: string;
  price: number;
  category: string;  
  quantity: number;
};
const campaigns: DiscountCampaign[] = [
    { id: "A1", name: "50 THB Off", category: "Coupon", type: "Fixed", value: 50 },
    { id: "A2", name: "10% Off", category: "Coupon", type: "Percentage", value: 10 },
    { id: "B1", name: "5% on Accessories", category: "On Top", type: "Percentage", value: 5 },
    { id: "B2", name: "Use Points - 200 THB", category: "On Top", type: "Fixed", value: 200 },
    { id: "C1", name: "5% Seasonal Discount", category: "Seasonal", type: "Percentage", value: 5 },
  ];
export default function DiscountCalculatorX(props: DiscountCalculatorProps) {
    const { cart } = props;
    const [finalPrice, setFinalPrice] = useState<number | null>(null);
    const [selectedCampaigns, setSelectedCampaigns] = useState<Record<string, string>>({});
    
    const handleSelect = (category: string, campaignId: string) => {
        setSelectedCampaigns((prev) => ({
            ...prev,
            [category]: campaignId,
        }));
    };

    const applyDiscounts = () => {
        const selected: DiscountCampaign[] = campaigns.filter(
            (campaign) => selectedCampaigns[campaign.category] === campaign.id
        );
        const price = DiscountModule.applyDiscounts(cart, selected);
        setFinalPrice(price);
    };

    const groupedCampaigns = campaigns.reduce<Record<string, DiscountCampaign[]>>((acc, campaign) => {
        if (!acc[campaign.category]) acc[campaign.category] = [];
        acc[campaign.category].push(campaign);
        return acc;
    }, {});

  return (
 <div>
      <h2>Discount Calculator</h2>

      {Object.entries(groupedCampaigns).map(([category, options]) => (
        <div key={category}>
          <h4>{category}</h4>
          {options.map((campaign) => (
            <label key={campaign.id} style={{ display: "block" }}>
              <input
                type="radio"
                name={category}
                value={campaign.id}
                checked={selectedCampaigns[category] === campaign.id}
                onChange={() => handleSelect(category, campaign.id)}
              />
              {campaign.name}
            </label>
          ))}
        </div>
      ))}

      <button onClick={applyDiscounts}>Apply Discounts</button>
      {finalPrice !== null && <p>Final Price: {finalPrice} THB</p>}
    </div>  )
}
