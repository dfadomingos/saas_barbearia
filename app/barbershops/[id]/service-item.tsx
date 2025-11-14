import Image from "next/image";
import { Button } from "../../_components/ui/button";

interface ServiceItemProps {
  service: {
    id: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    priceInCents: number;
  };
}

export default function ServiceItem({ service }: ServiceItemProps) {
  const price = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format((service.priceInCents ?? 0) / 100);

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="bg-muted relative h-24 w-24 overflow-hidden rounded-md">
        {service.imageUrl ? (
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="bg-muted-foreground h-full w-full" />
        )}
      </div>

      <div className="flex-1">
        <div className="font-semibold">{service.name}</div>
        <div className="text-muted-foreground text-sm">
          {service.description}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="font-semibold">{price}</div>
        <Button
          onClick={(e) => e.preventDefault()}
          size="sm"
          className="rounded-full px-4 py-1"
        >
          Reservar
        </Button>
      </div>
    </div>
  );
}
