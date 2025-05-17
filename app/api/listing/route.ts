import { NextResponse } from 'next/server';
import prisma from '@/lib/generated/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = body;

    // Convert string fields to integers
    const parsedRoomCount = parseInt(roomCount, 10);
    const parsedBathroomCount = parseInt(bathroomCount, 10);
    const parsedGuestCount = parseInt(guestCount, 10);
    const parsedPrice = parseInt(price, 10);

    if (isNaN(parsedRoomCount) || isNaN(parsedBathroomCount) || isNaN(parsedGuestCount) || isNaN(parsedPrice)) {
      return NextResponse.json({ error: 'Invalid numeric values provided.' }, { status: 400 });
    }

    // Save the listing to the database
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount: parsedRoomCount,
        bathroomCount: parsedBathroomCount,
        guestCount: parsedGuestCount,
        locationValue: location.value,
        userId: user.id,
        price,
      },
    });

    return NextResponse.json(listing);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create listing.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const listings = await prisma.listing.findMany();
    return NextResponse.json(listings);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch listings.' }, { status: 500 });
  }
}