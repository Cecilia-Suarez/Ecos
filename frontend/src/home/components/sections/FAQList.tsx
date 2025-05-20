import FAQItem from "../FAQItem";

const FAQList = () => {
  return (
    <section id="#preguntas" className="text-ecos-blue flex w-full flex-col">
      <h2 className="mt-12 ml-36 w-full text-start text-6xl font-bold lg:mb-36">
        Preguntas Frecuentes
      </h2>
      <FAQItem />
    </section>
  );
};

export default FAQList;
