import React from "react";

export default function HomeRodape() {
  return (
    <>
      <section className="flex flex-col justify-end">
        <h2 className="heading-1 text-center text-white pb-4">Localização</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.68313203527!2d-54.74778922389791!3d-18.498006795321132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x937e35291c349b8d%3A0x2262ffd99c51dc16!2sBarbearia%20Fio%20Navalha!5e0!3m2!1spt-BR!2sbr!4v1751064660333!5m2!1spt-BR!2sbr"
          width="100%"
          height="400"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <p className="text-white text-center py-3">Copyright {new Date().getFullYear()} - Todos direitos reservados.</p>
      </section>
    </>
  );
}
