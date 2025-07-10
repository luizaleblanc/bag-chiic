import Link from "next/link"

export function WritersDayBanner() {
  return (
    <section className="bg-zinc-950 text-white h-[22.2rem]">
      <div className="container h-full flex items-center">
        <div className="flex flex-col md:flex-row items-center h-full w-full">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="text-teal-500">#Literature</span>
              <span>Se</span>
            </h1>
            <p className="text-lg md:text-xl mb-4">O amor pela leitura começa com o seu pela escrita</p>
            <Link
              href="/dia-do-escritor"
              className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
            >
              Conheça mais
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
