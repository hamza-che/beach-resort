import React from "react";
import Title from "./Title";
import { v4 as uuidv4 } from "uuid";
import ServicesData from "../ServicesData";

const Services = () => {
  return (
    <section className="services">
      <Title title="services" />
      <div className="services-center">
        {ServicesData.map(service => {
          const { icon, info, title } = service;
          return (
            <article key={uuidv4()} className="service">
              <span>{icon}</span>
              <h6>{title}</h6>
              <p>{info}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
