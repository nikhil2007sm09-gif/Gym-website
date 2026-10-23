const brands = [
  "https://ap-nutreko.myshopify.com/cdn/shop/files/Vector_8.png?v=1731121775&width=300",
  "https://ap-nutreko.myshopify.com/cdn/shop/files/Vector_9.png?v=1731121780&width=300",
  "https://ap-nutreko.myshopify.com/cdn/shop/files/Vector_10.png?v=1731121785&width=300",
  "https://ap-nutreko.myshopify.com/cdn/shop/files/Vector_11_73a8bdd6-2278-4620-b0e2-f619ea68cdd7.png?v=1731121808&width=300",
  "https://ap-nutreko.myshopify.com/cdn/shop/files/Vector_12.png?v=1731121811&width=300",
  "https://ap-nutreko.myshopify.com/cdn/shop/files/Vector_13.png?v=1731121815&width=300",
];

export default function BrandLogos() {
  return (
    <section className="container mx-auto py-10">

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 items-center justify-items-center">
          {brands.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-full h-24 sm:h-28 lg:h-32"
            >
              <img
                src={logo}
                alt={`Brand ${index + 1}`}
                className="max-h-20 sm:max-h-24 lg:max-h-28 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}

      </div>
    </section>
  );
}