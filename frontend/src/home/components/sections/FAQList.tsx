import FAQItem from "../FAQItem";

const FAQList = () => {
  return (
    <section id="#preguntas" className="flex w-full flex-col text-[#19233A]">
      <h2 className="mt-12 ml-36 w-full text-start text-5xl font-medium lg:mb-36">
        Preguntas frecuentes
      </h2>
      <FAQItem />
    </section>
  );
};

export default FAQList;
