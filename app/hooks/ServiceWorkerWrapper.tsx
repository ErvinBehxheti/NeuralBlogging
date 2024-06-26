"use client";
import { useServiceWorker } from "../hooks/useServiceWorker";

const ServiceWorkerWrapper = () => {
  useServiceWorker();
  return null;
};

export default ServiceWorkerWrapper;
