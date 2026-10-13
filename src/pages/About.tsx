
import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Heart,
  Leaf,
  Sparkles,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Heart,
    title: "People first",
    description:
      "We believe good business starts with people. Every decision should serve the people behind the brand and the people it reaches.",
  },
  {
    icon: Sparkles,
    title: "Made with intention",
    description:
      "We focus on thoughtful details, purposeful design, and products that bring something meaningful to everyday life.",
  },
  {
    icon: Leaf,
    title: "Always evolving",
    description:
      "We keep learning, improving, and exploring new ways to create better experiences for our community.",
  },
];

const faqs = [
  {
    question: "What makes your brand different?",
    answer:
      "We combine thoughtful design, quality, and a people-first approach. Our goal is to create products that feel intentional, useful, and distinctive rather than simply following trends.",
  },
  {
    question: "Where do you ship?",
    answer:
      "Shipping destinations and available delivery methods depend on your location. Visit our Shipping & Returns page for the latest information.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Delivery estimates vary by destination, shipping method, and product availability. Your order confirmation and shipping updates will provide the most relevant details.",
  },
  {
    question: "Can I return or exchange an item?",
    answer:
      "We want you to feel confident in your purchase. Please review our return policy for eligible items, timeframes, and instructions for requesting a return or exchange.",
  },
  {
    question: "How can I contact your team?",
    answer:
      "You can reach our team through the contact information listed in the footer of our website. Include your order number if your question relates to an existing purchase.",
  },
];

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main>
      {/* Hero */}
      <section className="overflow-hidden border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Our story
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
            More than products.
            <span className="block text-gray-400">
              A point of view.
            </span>
          </h1>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              We believe the things we bring into our lives should
              have a purpose, tell a story, and make the everyday
              feel a little more meaningful.
            </p>

            <a
              href="#our-mission"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium hover:opacity-60"
            >
              Get to know us
              <ArrowDown size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Mission and photo */}
      <section
        id="our-mission"
        className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8 lg:py-32"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gray-100">
          <img
            src="/images/about-mission.jpg"
            alt="A glimpse into the people, process, or inspiration behind our brand"
            className="aspect-[4/5] w-full object-cover"
            loading="lazy"
          />

          <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-gray-800 backdrop-blur">
            A little about us
          </div>
        </div>

        <div className="lg:py-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Our mission
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            We believe the everyday deserves a little more thought.
          </h2>

          <div className="mt-7 space-y-5 text-base leading-8 text-gray-600">
            <p>
              Our brand began with a simple idea: everyday products
              can be practical without being ordinary. The details
              matter, the experience matters, and the story behind
              what we create matters.
            </p>

            <p>
              We are here to bring together considered design,
              dependable quality, and a genuine understanding of
              what people need. Every collection is an opportunity
              to make something useful feel special.
            </p>

            <p>
              This is more than what we sell. It is how we think,
              how we create, and the kind of experience we want
              every person who discovers us to have.
            </p>
          </div>

          <div className="mt-8">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Explore our collection
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              What guides us
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              The values behind everything we do.
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600">
              Our approach is shaped by a few simple principles
              that influence what we make and how we show up.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="border-t border-gray-300 pt-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium tracking-widest text-gray-400">
                      0{index + 1}
                    </span>

                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-8 text-xl font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brand statement */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-28 lg:py-32">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Our philosophy
        </p>

        <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl sm:leading-tight">
          Good design gets your attention.
          <span className="text-gray-400">
            {" "}A meaningful experience keeps it.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600">
          We want every interaction with our brand to feel
          considered, from discovering a product to opening
          your order and making it part of your everyday life.
        </p>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8 lg:py-28">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              Good to know
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Frequently asked questions.
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-gray-600">
              Have a question? Start here. If you still need help,
              our team is happy to point you in the right direction.
            </p>

            <a
              href="mailto:hello@example.com"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              Contact our team
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <article key={faq.question} className="py-1">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-base font-medium leading-6">
                      {faq.question}
                    </span>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-300">
                      {isOpen ? (
                        <X size={15} />
                      ) : (
                        <ArrowDown size={15} />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="max-w-2xl pb-6 pr-10 text-sm leading-7 text-gray-600">
                      {faq.answer}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div className="rounded-3xl bg-black px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
            Your next discovery
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Find something that feels like you.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
            Explore the collection and discover the details that
            make all the difference.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-colors hover:bg-gray-200"
          >
            Shop all products
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}