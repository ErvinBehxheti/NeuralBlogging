"use client";

import { useServiceWorker } from "./useServiceWorker";

const ServiceWorkerWrapper = () => {
  useServiceWorker();
  return null;
};

export default ServiceWorkerWrapper;
