import FAQItem from "../FAQItem";

const FAQList = () => {
  return (
    <section
      id="preguntas-frecuentes"
      className="text-ecos-blue flex flex-col items-center space-y-8"
    >
      <h2 className="subtitles w-full text-start lg:text-center">Preguntas frecuentes</h2>
      <FAQItem />
    </section>
  );
};

export default FAQList;
