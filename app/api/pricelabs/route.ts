import cron from 'node-cron';
import axios from "axios";
import prisma from '@/lib/generated/prisma';
import { NextResponse } from 'next/server';

export const fetchPriceLabsData = async (listingId: string) => {
  try {
    const apiKey = process.env.PRICELABS_API_KEY;
    if (!apiKey) throw new Error('PriceLabs API key is missing.');

    const response = await axios.get(`https://api.pricelabs.co/v1/pricing/${listingId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching PriceLabs data:', error);
    throw error;
  }
};


const updateAllListingsPricing = async () => {
  const listings = await prisma.listing.findMany();

  for (const listing of listings) {
    try {
      const pricingData = await fetchPriceLabsData(listing.id);
      await prisma.listing.update({
        where: { id: listing.id },
        data: { price: pricingData.dynamicPrice },
      });
    } catch (error) {
      console.error(`Failed to update pricing for listing ${listing.id}:`, error);
    }
  }
};

export async function POST() {
  try {
    await updateAllListingsPricing();
    return NextResponse.json({ message: 'Pricing updated successfully.' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update pricing.' }, { status: 500 });
  }
}

// Schedule the task to run daily at midnight
cron.schedule('12 15 * * *', updateAllListingsPricing);

console.log('Task scheduler is running...');