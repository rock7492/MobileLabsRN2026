export const productImages = {
  cpu_amd: require("../assets/products_images/cpu_amd.jpg"),
  cpu_intel: require("../assets/products_images/cpu_intel.jpg"),
  gpu_intel: require("../assets/products_images/gpu_intel.jpg"),
  gpu_nvidia: require("../assets/products_images/gpu_nvidia.webp"),
  gpu_amd: require("../assets/products_images/gpu_amd.jpg"),
  motherboard_amd: require("../assets/products_images/motherboard_amd.webp"),
  motherboard_intel: require("../assets/products_images/motherboard_intel.webp"),
  ram: require("../assets/products_images/ram.jpg"),
  ssd: require("../assets/products_images/ssd.jpg"),
  hdd: require("../assets/products_images/hdd.jpg"),
  psu: require("../assets/products_images/psu.jpg"),
  cooler: require("../assets/products_images/cooler.jpg"),
  case: require("../assets/products_images/case.jpg"),
};

export const productImageOptions = [
  {
    key: "cpu_amd",
    label: "Процесор AMD",
    source: productImages.cpu_amd,
  },
  {
    key: "cpu_intel",
    label: "Процесор Intel",
    source: productImages.cpu_intel,
  },
  {
    key: "gpu_intel",
    label: "Відеокарта Intel",
    source: productImages.gpu_intel,
  },
  {
    key: "gpu_nvidia",
    label: "Відеокарта Nvidia",
    source: productImages.gpu_nvidia,
  },
  {
    key: "gpu_amd",
    label: "Відеокарта AMD",
    source: productImages.gpu_amd,
  },
  {
    key: "motherboard_amd",
    label: "Материнська плата AMD",
    source: productImages.motherboard_amd,
  },
  {
    key: "motherboard_intel",
    label: "Материнська плата Intel",
    source: productImages.motherboard_intel,
  },
  {
    key: "ram",
    label: "Оперативна пам'ять",
    source: productImages.ram,
  },
  {
    key: "ssd",
    label: "SSD накопичувач",
    source: productImages.ssd,
  },
  {
    key: "psu",
    label: "Блок живлення",
    source: productImages.psu,
  },
  {
    key: "cooler",
    label: "Кулер",
    source: productImages.cooler,
  },
  {
    key: "case",
    label: "Корпус",
    source: productImages.case,
  },
];

export function getProductImageSource(imageKey) {
  return productImages[imageKey] ?? productImages.cpu;
}
