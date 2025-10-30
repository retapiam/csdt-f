class APUService {
  constructor() {
    this.apus = [];
  }

  getAll() {
    return this.apus;
  }

  setAll(apus) {
    this.apus = Array.isArray(apus) ? [...apus] : [];
  }

  add(apu) {
    if (apu) {
      this.apus.push(apu);
    }
    return apu;
  }

  count() {
    return this.apus.length;
  }
}

const apuService = new APUService();
export default apuService;


