export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-max section-padding grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-white font-semibold text-lg">
            Godínez y Asociados
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            Consorcio contable y jurídico enfocado en brindar tranquilidad
            financiera y legal a las familias costarricenses.
          </p>
        </div>

        <div className="md:text-right text-sm">
          <p>San José, Costa Rica</p>
          <p>Tel: 2282-3145</p>
          <p>Email: godinezdh@gmail.com</p>
          <p className="mt-4 text-gray-500">
            © {new Date().getFullYear()} Godínez y Asociados
          </p>
        </div>
      </div>
    </footer>
  );
}
