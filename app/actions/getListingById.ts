import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export default async function getListingById(
    params: IParams
) {
    try {
        const {listingId} = params;

        if (!listingId) {
            return null;
        }

        const listing= await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: false,
            }
        });
        if (!listing) {
            return null;
        }
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            };
        } catch (error) {
        console.log(error);
        }
    }