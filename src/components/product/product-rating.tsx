import { Star } from "lucide-react";

type ProductRatingProps = {
    productRating: number
    className: string
}

export default function ProductRating({ productRating, className }: ProductRatingProps): React.ReactNode {
    const generatedStars = [];
    const isNotWhole = productRating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(productRating)) {
            generatedStars.push(<Star key={i} size={16} strokeWidth={1} className="text-primary fill-primary" />);
        } else if (isNotWhole && i < Math.round(productRating)) {
            generatedStars.push(
                <div key={i} className="relative inline-block">
                    <Star size={16} strokeWidth={1} className="fill-accent" />
                    <div className="absolute inset-0 w-1/2 overflow-hidden">
                        <Star size={16} strokeWidth={1} className="fill-primary text-primary" />
                    </div>
                </div>
            );
        } else {
            generatedStars.push(<Star key={i} size={16} strokeWidth={1} fillRule='inherit' className="fill-accent" />);
        }
    }

    return (
        <p className={`${className}`}>
            {generatedStars}
        </p>
    )
}