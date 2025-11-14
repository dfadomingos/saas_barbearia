import Image from "next/image";
import { Barbershop } from "../generated/prisma/client"
import Link from "next/link";

interface BarbershopItemProps {
    barbershop: Barbershop;
}

const BarbershopItem = ({barbershop}: BarbershopItemProps) => {
    return (
    <Link href={`/barbershops/${barbershop.id}`} className="relative rounded-xl min-h-[200px] min-w-[290px]">
        <div className="absolute top-0 left-0 z-10 h-full w-full rounded-lg bg-linear-to-t from-black to-transparent"></div>
        <Image 
            src={barbershop.imageUrl} 
            alt={barbershop.name} 
            fill 
            className="rounded-xl object-cover" 
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
            <h3 className="text-background text-lg font-bold">{barbershop.name}</h3>
            <div className="text-background text-xs">{barbershop.address}</div>
        </div>
    </Link>
    );
};

export default BarbershopItem;