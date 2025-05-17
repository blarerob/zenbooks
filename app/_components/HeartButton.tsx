"use client";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
 }) => {
    const hasFavorited = false; // Replace with actual logic to check if the listing is favorited
    const toggleFavorite = () => {
        // Logic to toggle favorite status
    };

    return (
        <div
         onClick={toggleFavorite}
            className="relative hover:opacity-80 transition cursor-pointer"
        >
            <AiOutlineHeart
                size={28}
                className="fill-white absolute -top-[2px] -right-[2px]"
                />
            <AiFillHeart
                size={24}
                className={
                hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
                }
                />
        </div>
    );
}

export default HeartButton;