import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-[#f8f7f3] px-5 py-24 text-stone-950 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-8 border-b border-stone-300 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500">
              VELORA Studio
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-none md:text-7xl">
              ABOUT VELORA
            </h1>
          </div>
          <Link
            href="/products/clothing"
            className="inline-flex min-h-11 items-center justify-center border border-stone-950 px-7 text-[11px] font-medium uppercase tracking-[0.24em] text-stone-950 transition duration-300 hover:bg-stone-950 hover:text-white"
          >
            Shop Collection
          </Link>
        </div>

        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <article className="border-t border-stone-300 pt-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500">
              The Edit
            </p>
            <h2 className="mt-6 font-serif text-4xl leading-none md:text-6xl">
              Quiet objects for considered everyday dressing.
            </h2>
            <p className="mt-8 max-w-2xl text-sm leading-7 text-stone-600 md:text-[15px]">
              Discover carefully selected pieces designed to bring timeless
              style, quality, and simplicity into your everyday wardrobe.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-stone-300 pt-8">
              <div>
                <span className="block text-[11px] uppercase tracking-[0.22em] text-stone-500">
                  Edit 01
                </span>
                <span className="mt-3 block font-serif text-3xl text-stone-950">
                  Clothing
                </span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.22em] text-stone-500">
                  Edit 02
                </span>
                <span className="mt-3 block font-serif text-3xl text-stone-950">
                  Objects
                </span>
              </div>
            </div>
          </article>

          <aside className="border border-stone-300 bg-white px-8 py-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500">
              Our Approach
            </p>
            <div className="mt-8 space-y-7">
              <div className="border-b border-stone-200 pb-5">
                <span className="text-[10px] uppercase tracking-[0.24em] text-stone-500">
                  01
                </span>
                <p className="mt-3 text-sm leading-7 text-stone-700">
                  We study proportion, texture, and silhouette for lasting ease.
                </p>
              </div>
              <div className="border-b border-stone-200 pb-5">
                <span className="text-[10px] uppercase tracking-[0.24em] text-stone-500">
                  02
                </span>
                <p className="mt-3 text-sm leading-7 text-stone-700">
                  We edit wardrobes with a balance of premium essentials and modern rhythm.
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-stone-500">
                  03
                </span>
                <p className="mt-3 text-sm leading-7 text-stone-700">
                  We create pieces that move with your routine and refine your daily uniform.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-16 grid gap-8 border-t border-stone-300 pt-10 md:grid-cols-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
              Material
            </span>
            <span className="mt-3 block font-serif text-3xl leading-none text-stone-950">
              Purposeful
            </span>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
              Edit
            </span>
            <span className="mt-3 block font-serif text-3xl leading-none text-stone-950">
              Essential
            </span>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
              Experience
            </span>
            <span className="mt-3 block font-serif text-3xl leading-none text-stone-950">
              Modern
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
