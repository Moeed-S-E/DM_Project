import { convertParagraphsToBullets } from "./convertParagraphsToBullets";

// Example usage:
const blogText = `1. Infinix Hot 60 Pro – 8/128 – PKR 42,200
The Hot 60 Pro is the best option if you want a dependable and quick phone at a reasonable price. It seems clean overall, with a large 5000 mAh battery, and a quick processor. It offers significant value in this price range.

It's a terrific choice because of its smooth operation, excellent cameras, and long battery life. Fantastic, drama-free phone for everyday use.

2. The 6/128 Infinix Hot 60i costs PKR 31,000.
Right now, this is among the greatest low-cost phones. The performance doesn't feel cheap despite the low price. It functions flawlessly for basic use and has a large display and good RAM.

Why purchase it?
Ideal for casual users or students looking for a phone that just functions.

3. Vivo Y29 – 8/128 – PKR 43,500 (Active)
The Y29 is a unique model in the Vivo family. Vivo cameras look good, work well, and are always dependable. This is the best option for anyone looking for a fashionable phone around $50,000.

Why it stands out: For this price range, the cameras, display quality, and general user experience feel high-end.

4. Vivo Y200 – 8/128 – PKR 50,000 (Inactive)
The Y200 offers a very apparent improvement in display quality and performance, even though it slightly exceeds the 50k threshold. You could get it close to $50,000 because certain stores give discounts on inactive units.

Why think about it?
Fast performance and a fantastic AMOLED display.

5. Samsung A16, 6/128, PKR 44,500
Fans of Samsung now have a solid choice under $50,000 once more. The A16 has a large battery, dependable updates, and a consistent user interface. Samsung phones are renowned for their extended lifespan, and they always feel sturdy in the hand.`;

console.log(convertParagraphsToBullets(blogText));
