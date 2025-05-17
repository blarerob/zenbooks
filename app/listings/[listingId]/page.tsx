import getListingById from '@/app/actions/getListingById';
import EmptyState from "@/app/_components/EmptyState";
import ListingClient from './ListingClient';

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: Promise<IParams> }) => {
    const resolvedParams = await params; // Await the params if they are a Promise
    const listing = await getListingById(resolvedParams);

    if (!listing) {
        return (
            <EmptyState />
        );
    }

    return (
        <ListingClient
            listing={listing}
        />
    );
};

export default ListingPage;