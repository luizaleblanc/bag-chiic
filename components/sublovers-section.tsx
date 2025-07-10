import Link from "next/link"
import Image from "next/image"

export function SubloversSection() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mais ideias para sua próxima leitura:</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mimolovers Indicam */}
        <Link href="/mimolovers" className="block bg-zinc-900 text-white rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">MIMOLOVERS</h3>
            <h4 className="text-lg mb-4">INDICAM</h4>
            <p className="text-sm mb-2">Livros</p>
            <p className="text-sm">que a galera leu e recomenda</p>
          </div>
        </Link>

        {/* Listas do Mimo */}
        <Link href="/listas" className="block bg-primary text-white rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">LISTAS</h3>
            <h4 className="text-lg mb-4">DO MIMO</h4>
            <p className="text-sm mb-2">Seleções para</p>
            <p className="text-sm">todos os gostos</p>
          </div>
        </Link>
      </div>

      {/* Mimonoar - Dia do Escritor */}
      <div className="mt-8 bg-zinc-100 rounded-lg p-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 flex items-center">
            <div className="mr-4">
              <Image
                src="/placeholder.svg?key=v2ofz"
                alt="Autor em destaque"
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center">
                <div className="bg-red-600 rounded-full h-4 w-4 mr-2"></div>
                <h3 className="font-bold text-lg">MIMONOAR</h3>
              </div>
              <h4 className="text-sm font-medium mb-2">ESPECIAL DIA DO ESCRITOR</h4>
              <p className="text-sm">+ Itamar Vieira Junior</p>
              <p className="text-sm">22/07, no APP</p>
            </div>
          </div>
          <div className="md:w-1/3 mt-4 md:mt-0 flex justify-end">
            <Image src="/qr-code.png" alt="QR Code" width={100} height={100} className="rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
